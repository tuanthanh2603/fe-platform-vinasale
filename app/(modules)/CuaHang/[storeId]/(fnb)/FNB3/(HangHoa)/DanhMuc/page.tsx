"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Form, Input, Modal, Select, Switch, message } from "antd";
import {
	categoryService,
	type Category,
	type CategoryPayload,
	type CategoryType,
} from "@/lib/services/FNB/FNB3/category.service";
import { CircleDot, Edit3, LayoutList, List, Plus, Search, Trash2, UtensilsCrossed } from "lucide-react";

interface CategoryFormValues {
	id?: number;
	name: string;
	type: string;
	description: string;
	status: boolean;
}

export default function FNB3DanhMucPage() {
	const { storeId } = useParams<{ storeId: string }>();
	const [form] = Form.useForm<CategoryFormValues>();

	const [keyword, setKeyword] = useState("");
	const [categories, setCategories] = useState<Category[]>([]);
	const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
	const [typeInput, setTypeInput] = useState("");
	const [editingTypeId, setEditingTypeId] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const filteredCategories = useMemo(() => {
		const q = keyword.trim().toLowerCase();
		if (!q) return categories;
		return categories.filter((category) => {
			return (
				String(category.id).includes(q) ||
				category.name.toLowerCase().includes(q) ||
				category.type.toLowerCase().includes(q)
			);
		});
	}, [keyword, categories]);

	const totalCategories = categories.length;
	const activeCategories = categories.filter((item) => item.status === "ACTIVE").length;
	const inactiveCategories = totalCategories - activeCategories;
	const isEditingType = editingTypeId !== null;

	const categoryTypeOptions = useMemo(
		() => categoryTypes.map((typeItem) => ({ label: typeItem.name, value: typeItem.name })),
		[categoryTypes]
	);

	async function fetchCategoryTypes(showError = false) {
		if (!storeId) return;
		try {
			const result = await categoryService.fetchCategoryTypesAPI(storeId);
			setCategoryTypes(result);
		} catch (error) {
			if (showError) {
				message.error(
					error instanceof Error ? error.message : "Không thể tải loại danh mục."
				);
			}
		}
	}

	async function fetchCategories(showError = false) {
		if (!storeId) return;
		setIsLoading(true);
		try {
			const result = await categoryService.fetchCategoriesAPI(storeId);
			setCategories(result);
		} catch (error) {
			if (showError) {
				message.error(error instanceof Error ? error.message : "Không thể tải danh mục.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		void fetchCategories();
		void fetchCategoryTypes();
	}, [storeId]);

	function closeModal() {
		setIsModalOpen(false);
		setEditingId(null);
		form.resetFields();
	}

	function openCreateModal() {
		setEditingId(null);
		form.setFieldsValue({
			id: undefined,
			name: "",
			type: categoryTypes[0]?.name || "",
			description: "",
			status: true,
		});
		setIsModalOpen(true);
	}

	function openTypeModal() {
		setIsTypeModalOpen(true);
		setTypeInput("");
		setEditingTypeId(null);
		if (categoryTypes.length === 0) {
			void fetchCategoryTypes(true);
		}
	}

	function closeTypeModal() {
		setIsTypeModalOpen(false);
		setTypeInput("");
		setEditingTypeId(null);
	}

	function startEditType(typeItem: CategoryType) {
		setEditingTypeId(typeItem.id);
		setTypeInput(typeItem.name);
	}

	function startCreateType() {
		setEditingTypeId(null);
		setTypeInput("");
	}

	async function saveCategoryType() {
		const normalized = typeInput.trim();
		if (!normalized) {
			message.warning("Vui lòng nhập tên loại danh mục.");
			return;
		}

		try {
			if (editingTypeId !== null) {
				await categoryService.updateCategoryTypeAPI(storeId, editingTypeId, normalized);
				message.success("Cập nhật loại danh mục thành công");
			} else {
				await categoryService.createCategoryTypeAPI(storeId, normalized);
				message.success("Thêm loại danh mục thành công");
			}

			await fetchCategoryTypes(true);
			setTypeInput("");
			setEditingTypeId(null);
		} catch (error) {
			message.error(
				error instanceof Error ? error.message : "Không thể lưu loại danh mục."
			);
		}
	}

	function deleteCategoryType(typeItem: CategoryType) {
		Modal.confirm({
			title: "Xóa loại danh mục",
			content: `Bạn có chắc muốn xóa loại ${typeItem.name}?`,
			okText: "Xóa",
			cancelText: "Hủy",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await categoryService.deleteCategoryTypeAPI(storeId, typeItem.id);
					await fetchCategoryTypes(true);
					message.success("Xóa loại danh mục thành công");
					if (editingTypeId === typeItem.id) {
						setEditingTypeId(null);
						setTypeInput("");
					}
				} catch (error) {
					message.error(
						error instanceof Error
							? error.message
							: "Không thể xóa loại danh mục."
					);
				}
			},
		});
	}

	function openEditModal(category: Category) {
		setEditingId(category.id);
		form.setFieldsValue({
			id: category.id,
			name: category.name,
			type: category.type,
			description: category.description || "",
			status: category.status === "ACTIVE",
		});
		setIsModalOpen(true);
	}

	function deleteCategory(category: Category) {
		Modal.confirm({
			title: "Xóa danh mục",
			content: `Bạn có chắc muốn xóa ${category.name} (ID: ${category.id})?`,
			okText: "Xóa",
			cancelText: "Hủy",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await categoryService.deleteCategoryAPI(storeId, category.id);
					await fetchCategories(true);
					message.success("Xóa danh mục thành công");
				} catch (error) {
					message.error(error instanceof Error ? error.message : "Không thể xóa danh mục.");
				}
			},
		});
	}

	async function handleSubmit() {
		try {
			const values = await form.validateFields();
			const payload: CategoryPayload = {
				name: values.name.trim(),
				type: values.type,
				description: values.description.trim(),
				status: values.status ? "ACTIVE" : "INACTIVE",
			};

			if (editingId !== null) {
				await categoryService.updateCategoryAPI(storeId, editingId, payload);
			} else {
				await categoryService.createCategoryAPI(storeId, payload);
			}

			await fetchCategories(true);
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
					<div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
						<UtensilsCrossed size={20} />
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-900">Danh mục menu</h1>
						<p className="text-sm text-gray-400">Quản lý món, topping và combo</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Button
						onClick={openTypeModal}
						icon={<List size={16} />}
						className="h-10! rounded-xl!"
						disabled={isLoading}
					>
						Danh sách loại danh mục
					</Button>
					<Button
						type="primary"
						onClick={openCreateModal}
						icon={<Plus size={16} />}
						className="h-10! rounded-xl!"
						disabled={isLoading}
					>
						Thêm danh mục
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
						<LayoutList size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
					<p className="text-xs font-medium text-gray-700">Tổng danh mục</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
						<CircleDot size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{activeCategories}</p>
					<p className="text-xs font-medium text-gray-700">Đang sử dụng</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
						<CircleDot size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{inactiveCategories}</p>
					<p className="text-xs font-medium text-gray-700">Tạm ngưng</p>
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
						placeholder="Tìm theo ID, tên hoặc loại danh mục..."
						className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
					/>
				</div>
			</div>

			<div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
							<tr>
								<th className="px-4 py-3 text-left font-semibold">ID</th>
								<th className="px-4 py-3 text-left font-semibold">Tên danh mục</th>
								<th className="px-4 py-3 text-left font-semibold">Loại</th>
								<th className="px-4 py-3 text-left font-semibold">Trạng thái</th>
								<th className="px-4 py-3 text-left font-semibold">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredCategories.length === 0 ? (
								<tr>
									<td colSpan={5} className="px-4 py-8 text-center text-gray-500">
										Không có danh mục phù hợp.
									</td>
								</tr>
							) : (
								filteredCategories.map((category) => (
									<tr
										key={category.id}
										className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
									>
										<td className="px-4 py-3 font-medium text-gray-900">{category.id}</td>
										<td className="px-4 py-3 text-gray-900">{category.name}</td>
										<td className="px-4 py-3 text-gray-700">{category.type}</td>
										<td className="px-4 py-3">
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
													category.status === "ACTIVE"
														? "bg-emerald-50 text-emerald-700"
														: "bg-rose-50 text-rose-700"
												}`}
											>
												{category.status === "ACTIVE" ? "Đang dùng" : "Tạm ngưng"}
											</span>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center gap-2">
												<Button
													size="small"
													icon={<Edit3 size={14} />}
													onClick={() => openEditModal(category)}
												>
													Sửa
												</Button>
												<Button
													danger
													size="small"
													icon={<Trash2 size={14} />}
													onClick={() => deleteCategory(category)}
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
				title={editingId !== null ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
				open={isModalOpen}
				onCancel={closeModal}
				onOk={handleSubmit}
				okText={editingId !== null ? "Lưu thay đổi" : "Thêm mới"}
				cancelText="Hủy"
				destroyOnHidden
			>
				<Form form={form} layout="vertical" requiredMark={false}>
					{editingId !== null && (
						<Form.Item name="id" label="ID danh mục">
							<Input disabled />
						</Form.Item>
					)}

					<Form.Item
						name="name"
						label="Tên danh mục"
						rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
					>
						<Input placeholder="Nhập tên danh mục" />
					</Form.Item>

					<Form.Item
						name="type"
						label="Loại danh mục"
						rules={[{ required: true, message: "Vui lòng chọn loại danh mục" }]}
					>
						<Select placeholder="Chọn loại" options={categoryTypeOptions} />
					</Form.Item>

					<Form.Item name="description" label="Mô tả">
						<Input.TextArea rows={3} placeholder="Nhập mô tả" />
					</Form.Item>

					<Form.Item name="status" label="Trạng thái" valuePropName="checked">
						<Switch checkedChildren="Đang dùng" unCheckedChildren="Tạm ngưng" />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Danh sách loại danh mục"
				open={isTypeModalOpen}
				onCancel={closeTypeModal}
				footer={[
					<Button key="close" onClick={closeTypeModal}>
						Đóng
					</Button>,
				]}
				destroyOnHidden
			>
				<div className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
						<Input
							value={typeInput}
							onChange={(event) => setTypeInput(event.target.value)}
							placeholder="Nhập tên loại danh mục"
						/>
						<div className="flex items-center gap-2">
							<Button type="primary" onClick={saveCategoryType}>
								{isEditingType ? "Lưu loại" : "Thêm loại"}
							</Button>
							{isEditingType && <Button onClick={startCreateType}>Hủy sửa</Button>}
						</div>
					</div>

					<div className="border border-gray-100 rounded-xl overflow-hidden">
						<table className="min-w-full text-sm">
							<thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
								<tr>
									<th className="px-4 py-2.5 text-left font-semibold">Tên loại danh mục</th>
									<th className="px-4 py-2.5 text-left font-semibold">Thao tác</th>
								</tr>
							</thead>
							<tbody>
								{categoryTypes.length === 0 ? (
									<tr>
										<td colSpan={2} className="px-4 py-8 text-center text-gray-500">
											Chưa có loại danh mục.
										</td>
									</tr>
								) : (
									categoryTypes.map((typeItem) => (
										<tr key={typeItem.id} className="border-b border-gray-100 last:border-0">
											<td className="px-4 py-2.5 text-gray-800">{typeItem.name}</td>
											<td className="px-4 py-2.5">
												<div className="flex items-center gap-2">
													<Button
														size="small"
														icon={<Edit3 size={14} />}
														onClick={() => startEditType(typeItem)}
													>
														Sửa
													</Button>
													<Button
														danger
														size="small"
														icon={<Trash2 size={14} />}
														onClick={() => deleteCategoryType(typeItem)}
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
			</Modal>
		</div>
	);
}
