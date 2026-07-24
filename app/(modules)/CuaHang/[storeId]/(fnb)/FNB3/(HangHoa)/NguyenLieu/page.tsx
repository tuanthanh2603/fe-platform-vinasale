"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Form, Input, InputNumber, Modal, Select, Switch, message } from "antd";
import {
	ingredientService,
	type Ingredient,
	type IngredientPayload,
} from "@/lib/services/FNB/FNB3/ingredient.service";
import {
	Beaker,
	CircleDot,
	Edit3,
	Package,
	Plus,
	Search,
	Trash2,
	TriangleAlert,
} from "lucide-react";

interface IngredientFormValues {
	code: string;
	name: string;
	unit: string;
	category: string;
	currentStock: number;
	minimumStock: number;
	status: boolean;
}

const CATEGORY_OPTIONS = [
	{ label: "Cà phê", value: "Cà phê" },
	{ label: "Trà", value: "Trà" },
	{ label: "Sữa", value: "Sữa" },
	{ label: "Topping", value: "Topping" },
	{ label: "Siro", value: "Siro" },
	{ label: "Khác", value: "Khác" },
];

const UNIT_OPTIONS = [
	{ label: "kg", value: "kg" },
	{ label: "gram", value: "gram" },
	{ label: "lit", value: "lit" },
	{ label: "ml", value: "ml" },
	{ label: "gói", value: "gói" },
	{ label: "hộp", value: "hộp" },
];

export default function FNB3NguyenLieuPage() {
	const { storeId } = useParams<{ storeId: string }>();
	const [form] = Form.useForm<IngredientFormValues>();

	const [keyword, setKeyword] = useState("");
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const isEditing = editingId !== null;

	const filteredIngredients = useMemo(() => {
		const q = keyword.trim().toLowerCase();
		if (!q) return ingredients;
		return ingredients.filter((ingredient) => {
			return (
				ingredient.code.toLowerCase().includes(q) ||
				ingredient.name.toLowerCase().includes(q) ||
				ingredient.category.toLowerCase().includes(q) ||
				ingredient.unit.toLowerCase().includes(q)
			);
		});
	}, [keyword, ingredients]);

	const totalIngredients = ingredients.length;
	const activeIngredients = ingredients.filter((item) => item.status === "ACTIVE").length;
	const lowStockIngredients = ingredients.filter(
		(item) => item.currentStock <= item.minimumStock
	).length;

	async function fetchIngredients(showError = false) {
		if (!storeId) return;
		setIsLoading(true);
		try {
			const result = await ingredientService.fetchIngredientsAPI(storeId);
			setIngredients(result);
		} catch (error) {
			if (showError) {
				message.error(
					error instanceof Error ? error.message : "Không thể tải danh sách nguyên liệu."
				);
			}
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		void fetchIngredients();
	}, [storeId]);

	function closeModal() {
		setIsModalOpen(false);
		setEditingId(null);
		form.resetFields();
	}

	function openCreateModal() {
		setEditingId(null);
		form.setFieldsValue({
			code: "",
			name: "",
			unit: UNIT_OPTIONS[0].value,
			category: CATEGORY_OPTIONS[0].value,
			currentStock: 0,
			minimumStock: 0,
			status: true,
		});
		setIsModalOpen(true);
	}

	function openEditModal(ingredient: Ingredient) {
		setEditingId(ingredient.id);
		form.setFieldsValue({
			code: ingredient.code,
			name: ingredient.name,
			unit: ingredient.unit,
			category: ingredient.category,
			currentStock: ingredient.currentStock,
			minimumStock: ingredient.minimumStock,
			status: ingredient.status === "ACTIVE",
		});
		setIsModalOpen(true);
	}

	function deleteIngredient(ingredient: Ingredient) {
		Modal.confirm({
			title: "Xóa nguyên liệu",
			content: `Bạn có chắc muốn xóa ${ingredient.name} (${ingredient.code})?`,
			okText: "Xóa",
			cancelText: "Hủy",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await ingredientService.deleteIngredientAPI(storeId, ingredient.id);
					await fetchIngredients(true);
					message.success("Xóa nguyên liệu thành công");
				} catch (error) {
					message.error(
						error instanceof Error ? error.message : "Không thể xóa nguyên liệu."
					);
				}
			},
		});
	}

	async function handleSubmit() {
		try {
			const values = await form.validateFields();
			const payload: IngredientPayload = {
				code: values.code.trim(),
				name: values.name.trim(),
				unit: values.unit,
				category: values.category,
				currentStock: Number(values.currentStock ?? 0),
				minimumStock: Number(values.minimumStock ?? 0),
				status: values.status ? "ACTIVE" : "INACTIVE",
			};

			if (editingId !== null) {
				await ingredientService.updateIngredientAPI(storeId, editingId, payload);
			} else {
				await ingredientService.createIngredientAPI(storeId, payload);
			}

			await fetchIngredients(true);
			message.success(editingId !== null ? "Cập nhật thành công" : "Thêm mới thành công");
			closeModal();
		} catch (error) {
			if (error instanceof Error && error.message) {
				message.error(error.message);
			}
		}
	}

	return (
		<div className="p-6 sm:p-8 max-w-6xl mx-auto">
			<div className="flex flex-wrap items-center justify-between gap-3 mb-6">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
						<Beaker size={20} />
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-900">Nguyên liệu</h1>
						<p className="text-sm text-gray-400">Quản lý danh mục nguyên liệu</p>
					</div>
				</div>

				<Button
					type="primary"
					onClick={openCreateModal}
					icon={<Plus size={16} />}
					className="h-10! rounded-xl!"
					disabled={isLoading}
				>
					Thêm nguyên liệu
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
						<Package size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{totalIngredients}</p>
					<p className="text-xs font-medium text-gray-700">Tổng nguyên liệu</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
						<CircleDot size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{activeIngredients}</p>
					<p className="text-xs font-medium text-gray-700">Đang sử dụng</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
						<TriangleAlert size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{lowStockIngredients}</p>
					<p className="text-xs font-medium text-gray-700">Sắp hết hàng</p>
				</div>
			</div>

			<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-4">
				<div className="relative">
					<Search
						size={16}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
					/>
					<input
						type="text"
						value={keyword}
						onChange={(event) => setKeyword(event.target.value)}
						placeholder="Tìm theo mã, tên, danh mục, đơn vị..."
						className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
					/>
				</div>
			</div>

			<div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
							<tr>
								<th className="px-4 py-3 text-left font-semibold">Mã</th>
								<th className="px-4 py-3 text-left font-semibold">Tên nguyên liệu</th>
								<th className="px-4 py-3 text-left font-semibold">Danh mục</th>
								<th className="px-4 py-3 text-left font-semibold">Tồn kho</th>
								<th className="px-4 py-3 text-left font-semibold">Trạng thái</th>
								<th className="px-4 py-3 text-left font-semibold">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredIngredients.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-4 py-8 text-center text-gray-500">
										Không có nguyên liệu phù hợp.
									</td>
								</tr>
							) : (
								filteredIngredients.map((ingredient) => (
									<tr
										key={ingredient.id}
										className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
									>
										<td className="px-4 py-3 font-medium text-gray-900">{ingredient.code}</td>
										<td className="px-4 py-3 text-gray-900">{ingredient.name}</td>
										<td className="px-4 py-3 text-gray-700">{ingredient.category}</td>
										<td className="px-4 py-3 text-gray-700">
											<div className="flex flex-col">
												<span>
													{ingredient.currentStock} {ingredient.unit}
												</span>
												<span className="text-xs text-gray-500">
													Tối thiểu: {ingredient.minimumStock} {ingredient.unit}
												</span>
											</div>
										</td>
										<td className="px-4 py-3">
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
													ingredient.status === "ACTIVE"
														? "bg-emerald-50 text-emerald-700"
														: "bg-rose-50 text-rose-700"
												}`}
											>
												{ingredient.status === "ACTIVE" ? "Đang dùng" : "Tạm ngưng"}
											</span>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center gap-2">
												<Button
													size="small"
													icon={<Edit3 size={14} />}
													onClick={() => openEditModal(ingredient)}
												>
													Sửa
												</Button>
												<Button
													danger
													size="small"
													icon={<Trash2 size={14} />}
													onClick={() => deleteIngredient(ingredient)}
												>
													Xóa
												</Button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			<Modal
				title={isEditing ? "Chỉnh sửa nguyên liệu" : "Thêm nguyên liệu"}
				open={isModalOpen}
				onCancel={closeModal}
				onOk={handleSubmit}
				okText={isEditing ? "Lưu thay đổi" : "Thêm mới"}
				cancelText="Hủy"
				destroyOnHidden
			>
				<Form form={form} layout="vertical" requiredMark={false}>
					<Form.Item
						name="code"
						label="Mã nguyên liệu"
						rules={[
							{ required: true, message: "Vui lòng nhập mã nguyên liệu" },
							{ max: 20, message: "Mã không vượt quá 20 ký tự" },
						]}
					>
						<Input placeholder="VD: NL001" disabled={isEditing} />
					</Form.Item>

					<Form.Item
						name="name"
						label="Tên nguyên liệu"
						rules={[{ required: true, message: "Vui lòng nhập tên nguyên liệu" }]}
					>
						<Input placeholder="Nhập tên nguyên liệu" />
					</Form.Item>

					<Form.Item
						name="category"
						label="Danh mục"
						rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
					>
						<Select placeholder="Chọn danh mục" options={CATEGORY_OPTIONS} />
					</Form.Item>

					<Form.Item
						name="unit"
						label="Đơn vị"
						rules={[{ required: true, message: "Vui lòng chọn đơn vị" }]}
					>
						<Select placeholder="Chọn đơn vị" options={UNIT_OPTIONS} />
					</Form.Item>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<Form.Item
							name="currentStock"
							label="Tồn kho hiện tại"
							rules={[{ required: true, message: "Vui lòng nhập tồn kho" }]}
						>
							<InputNumber min={0} className="w-full" />
						</Form.Item>

						<Form.Item
							name="minimumStock"
							label="Tồn kho tối thiểu"
							rules={[{ required: true, message: "Vui lòng nhập tồn kho tối thiểu" }]}
						>
							<InputNumber min={0} className="w-full" />
						</Form.Item>
					</div>

					<Form.Item name="status" label="Trạng thái" valuePropName="checked">
						<Switch checkedChildren="Đang dùng" unCheckedChildren="Tạm ngưng" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
