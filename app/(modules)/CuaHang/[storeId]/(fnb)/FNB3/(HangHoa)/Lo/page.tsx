"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Switch, message } from "antd";
import dayjs from "dayjs";
import { batchService, type Batch, type BatchPayload } from "@/lib/services/FNB/FNB3/batch.service";
import { CalendarClock, CircleDot, Edit3, PackageSearch, Plus, Search, Trash2 } from "lucide-react";

interface BatchFormValues {
	code: string;
	ingredientName: string;
	quantity: number;
	unit: string;
	manufactureDate: dayjs.Dayjs;
	expiryDate: dayjs.Dayjs;
	status: boolean;
}

const UNIT_OPTIONS = [
	{ label: "kg", value: "kg" },
	{ label: "gram", value: "gram" },
	{ label: "lit", value: "lit" },
	{ label: "ml", value: "ml" },
	{ label: "hộp", value: "hộp" },
	{ label: "gói", value: "gói" },
];

export default function FNB3LoPage() {
	const { storeId } = useParams<{ storeId: string }>();
	const [form] = Form.useForm<BatchFormValues>();

	const [keyword, setKeyword] = useState("");
	const [batches, setBatches] = useState<Batch[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const filteredBatches = useMemo(() => {
		const q = keyword.trim().toLowerCase();
		if (!q) return batches;
		return batches.filter((batch) => {
			return (
				batch.code.toLowerCase().includes(q) ||
				batch.ingredientName.toLowerCase().includes(q)
			);
		});
	}, [keyword, batches]);

	const totalBatches = batches.length;
	const activeBatches = batches.filter((item) => item.status === "ACTIVE").length;
	const expiredBatches = totalBatches - activeBatches;

	async function fetchBatches(showError = false) {
		if (!storeId) return;
		setIsLoading(true);
		try {
			const result = await batchService.fetchBatchesAPI(storeId);
			setBatches(result);
		} catch (error) {
			if (showError) {
				message.error(error instanceof Error ? error.message : "Không thể tải danh sách lô.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		void fetchBatches();
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
			ingredientName: "",
			quantity: 0,
			unit: UNIT_OPTIONS[0].value,
			manufactureDate: dayjs(),
			expiryDate: dayjs(),
			status: true,
		});
		setIsModalOpen(true);
	}

	function openEditModal(batch: Batch) {
		setEditingId(batch.id);
		form.setFieldsValue({
			code: batch.code,
			ingredientName: batch.ingredientName,
			quantity: batch.quantity,
			unit: batch.unit,
			manufactureDate: batch.manufactureDate ? dayjs(batch.manufactureDate) : dayjs(),
			expiryDate: batch.expiryDate ? dayjs(batch.expiryDate) : dayjs(),
			status: batch.status === "ACTIVE",
		});
		setIsModalOpen(true);
	}

	function deleteBatch(batch: Batch) {
		Modal.confirm({
			title: "Xóa lô",
			content: `Bạn có chắc muốn xóa lô ${batch.code}?`,
			okText: "Xóa",
			cancelText: "Hủy",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await batchService.deleteBatchAPI(storeId, batch.id);
					await fetchBatches(true);
					message.success("Xóa lô thành công");
				} catch (error) {
					message.error(error instanceof Error ? error.message : "Không thể xóa lô.");
				}
			},
		});
	}

	async function handleSubmit() {
		try {
			const values = await form.validateFields();
			const payload: BatchPayload = {
				code: values.code.trim(),
				ingredientName: values.ingredientName.trim(),
				quantity: Number(values.quantity ?? 0),
				unit: values.unit,
				manufactureDate: values.manufactureDate.format("YYYY-MM-DD"),
				expiryDate: values.expiryDate.format("YYYY-MM-DD"),
				status: values.status ? "ACTIVE" : "EXPIRED",
			};

			if (editingId !== null) {
				await batchService.updateBatchAPI(storeId, editingId, payload);
			} else {
				await batchService.createBatchAPI(storeId, payload);
			}

			await fetchBatches(true);
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
					<div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
						<PackageSearch size={20} />
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-900">Lô hàng</h1>
						<p className="text-sm text-gray-400">Quản lý lô hàng và hạn sử dụng</p>
					</div>
				</div>

				<Button
					type="primary"
					onClick={openCreateModal}
					icon={<Plus size={16} />}
					className="h-10! rounded-xl!"
					disabled={isLoading}
				>
					Thêm lô hàng
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
						<CalendarClock size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{totalBatches}</p>
					<p className="text-xs font-medium text-gray-700">Tổng lô hàng</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
						<CircleDot size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{activeBatches}</p>
					<p className="text-xs font-medium text-gray-700">Còn hiệu lực</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
						<CircleDot size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{expiredBatches}</p>
					<p className="text-xs font-medium text-gray-700">Hết hạn</p>
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
						placeholder="Tìm theo mã lô hoặc nguyên liệu..."
						className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
					/>
				</div>
			</div>

			<div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
							<tr>
								<th className="px-4 py-3 text-left font-semibold">Mã lô</th>
								<th className="px-4 py-3 text-left font-semibold">Nguyên liệu</th>
								<th className="px-4 py-3 text-left font-semibold">Số lượng</th>
								<th className="px-4 py-3 text-left font-semibold">NSX</th>
								<th className="px-4 py-3 text-left font-semibold">HSD</th>
								<th className="px-4 py-3 text-left font-semibold">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredBatches.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-4 py-8 text-center text-gray-500">
										Không có lô hàng phù hợp.
									</td>
								</tr>
							) : (
								filteredBatches.map((batch) => (
									<tr
										key={batch.id}
										className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
									>
										<td className="px-4 py-3 font-medium text-gray-900">{batch.code}</td>
										<td className="px-4 py-3 text-gray-900">{batch.ingredientName}</td>
										<td className="px-4 py-3 text-gray-700">
											{batch.quantity} {batch.unit}
										</td>
										<td className="px-4 py-3 text-gray-700">{batch.manufactureDate || "-"}</td>
										<td className="px-4 py-3 text-gray-700">{batch.expiryDate || "-"}</td>
										<td className="px-4 py-3">
											<div className="flex items-center gap-2">
												<Button
													size="small"
													icon={<Edit3 size={14} />}
													onClick={() => openEditModal(batch)}
												>
													Sửa
												</Button>
												<Button
													danger
													size="small"
													icon={<Trash2 size={14} />}
													onClick={() => deleteBatch(batch)}
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
				title={editingId !== null ? "Chỉnh sửa lô hàng" : "Thêm lô hàng"}
				open={isModalOpen}
				onCancel={closeModal}
				onOk={handleSubmit}
				okText={editingId !== null ? "Lưu thay đổi" : "Thêm mới"}
				cancelText="Hủy"
				destroyOnHidden
			>
				<Form form={form} layout="vertical" requiredMark={false}>
					<Form.Item
						name="code"
						label="Mã lô"
						rules={[
							{ required: true, message: "Vui lòng nhập mã lô" },
							{ max: 20, message: "Mã không vượt quá 20 ký tự" },
						]}
					>
						<Input placeholder="VD: LO001" disabled={editingId !== null} />
					</Form.Item>

					<Form.Item
						name="ingredientName"
						label="Tên nguyên liệu"
						rules={[{ required: true, message: "Vui lòng nhập tên nguyên liệu" }]}
					>
						<Input placeholder="Nhập tên nguyên liệu" />
					</Form.Item>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<Form.Item
							name="quantity"
							label="Số lượng"
							rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
						>
							<InputNumber min={0} className="w-full" />
						</Form.Item>

						<Form.Item
							name="unit"
							label="Đơn vị"
							rules={[{ required: true, message: "Vui lòng chọn đơn vị" }]}
						>
							<Select placeholder="Chọn đơn vị" options={UNIT_OPTIONS} />
						</Form.Item>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<Form.Item
							name="manufactureDate"
							label="Ngày sản xuất"
							rules={[{ required: true, message: "Vui lòng chọn ngày sản xuất" }]}
						>
							<DatePicker className="w-full" format="YYYY-MM-DD" />
						</Form.Item>

						<Form.Item
							name="expiryDate"
							label="Hạn sử dụng"
							rules={[{ required: true, message: "Vui lòng chọn hạn sử dụng" }]}
						>
							<DatePicker className="w-full" format="YYYY-MM-DD" />
						</Form.Item>
					</div>

					<Form.Item name="status" label="Trạng thái" valuePropName="checked">
						<Switch checkedChildren="Còn hạn" unCheckedChildren="Hết hạn" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
