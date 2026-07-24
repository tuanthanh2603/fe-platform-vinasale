"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Form, Input, InputNumber, Modal, Select, Switch, message } from "antd";
import {
	warehouseService,
	type WarehouseTransaction,
	type WarehouseTransactionPayload,
} from "@/lib/services/FNB/FNB3/warehouse.service";
import { Boxes, CircleDot, Edit3, Plus, Search, Trash2, Warehouse } from "lucide-react";

interface TransactionFormValues {
	code: string;
	type: "IMPORT" | "EXPORT" | "ADJUST";
	itemName: string;
	quantity: number;
	unit: string;
	note: string;
	status: boolean;
}

const TYPE_OPTIONS = [
	{ label: "Nhập kho", value: "IMPORT" },
	{ label: "Xuất kho", value: "EXPORT" },
	{ label: "Điều chỉnh", value: "ADJUST" },
];

const UNIT_OPTIONS = [
	{ label: "kg", value: "kg" },
	{ label: "gram", value: "gram" },
	{ label: "lit", value: "lit" },
	{ label: "ml", value: "ml" },
	{ label: "hộp", value: "hộp" },
	{ label: "gói", value: "gói" },
];

const TYPE_LABEL_MAP: Record<string, string> = {
	IMPORT: "Nhập kho",
	EXPORT: "Xuất kho",
	ADJUST: "Điều chỉnh",
};

export default function FNB3KhoPage() {
	const { storeId } = useParams<{ storeId: string }>();
	const [form] = Form.useForm<TransactionFormValues>();

	const [keyword, setKeyword] = useState("");
	const [transactions, setTransactions] = useState<WarehouseTransaction[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const filteredTransactions = useMemo(() => {
		const q = keyword.trim().toLowerCase();
		if (!q) return transactions;
		return transactions.filter((item) => {
			return (
				item.code.toLowerCase().includes(q) ||
				item.itemName.toLowerCase().includes(q) ||
				item.type.toLowerCase().includes(q)
			);
		});
	}, [keyword, transactions]);

	const totalTransactions = transactions.length;
	const importCount = transactions.filter((item) => item.type === "IMPORT").length;
	const exportCount = transactions.filter((item) => item.type === "EXPORT").length;

	async function fetchTransactions(showError = false) {
		if (!storeId) return;
		setIsLoading(true);
		try {
			const result = await warehouseService.fetchTransactionsAPI(storeId);
			setTransactions(result);
		} catch (error) {
			if (showError) {
				message.error(
					error instanceof Error ? error.message : "Không thể tải giao dịch kho."
				);
			}
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		void fetchTransactions();
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
			type: "IMPORT",
			itemName: "",
			quantity: 0,
			unit: UNIT_OPTIONS[0].value,
			note: "",
			status: true,
		});
		setIsModalOpen(true);
	}

	function openEditModal(item: WarehouseTransaction) {
		setEditingId(item.id);
		form.setFieldsValue({
			code: item.code,
			type: item.type,
			itemName: item.itemName,
			quantity: item.quantity,
			unit: item.unit,
			note: item.note || "",
			status: item.status === "DONE",
		});
		setIsModalOpen(true);
	}

	function deleteTransaction(item: WarehouseTransaction) {
		Modal.confirm({
			title: "Xóa giao dịch",
			content: `Bạn có chắc muốn xóa giao dịch ${item.code}?`,
			okText: "Xóa",
			cancelText: "Hủy",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await warehouseService.deleteTransactionAPI(storeId, item.id);
					await fetchTransactions(true);
					message.success("Xóa giao dịch thành công");
				} catch (error) {
					message.error(
						error instanceof Error ? error.message : "Không thể xóa giao dịch."
					);
				}
			},
		});
	}

	async function handleSubmit() {
		try {
			const values = await form.validateFields();
			const payload: WarehouseTransactionPayload = {
				code: values.code.trim(),
				type: values.type,
				itemName: values.itemName.trim(),
				quantity: Number(values.quantity ?? 0),
				unit: values.unit,
				note: values.note.trim(),
				status: values.status ? "DONE" : "DRAFT",
			};

			if (editingId !== null) {
				await warehouseService.updateTransactionAPI(storeId, editingId, payload);
			} else {
				await warehouseService.createTransactionAPI(storeId, payload);
			}

			await fetchTransactions(true);
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
					<div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
						<Warehouse size={20} />
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-900">Kho</h1>
						<p className="text-sm text-gray-400">Quản lý nhập, xuất và điều chỉnh kho</p>
					</div>
				</div>

				<Button
					type="primary"
					onClick={openCreateModal}
					icon={<Plus size={16} />}
					className="h-10! rounded-xl!"
					disabled={isLoading}
				>
					Tạo giao dịch
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
						<Boxes size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
					<p className="text-xs font-medium text-gray-700">Tổng giao dịch</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
						<CircleDot size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{importCount}</p>
					<p className="text-xs font-medium text-gray-700">Phiếu nhập</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
						<CircleDot size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{exportCount}</p>
					<p className="text-xs font-medium text-gray-700">Phiếu xuất</p>
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
						placeholder="Tìm theo mã giao dịch, nguyên liệu hoặc loại..."
						className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
					/>
				</div>
			</div>

			<div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
							<tr>
								<th className="px-4 py-3 text-left font-semibold">Mã giao dịch</th>
								<th className="px-4 py-3 text-left font-semibold">Loại</th>
								<th className="px-4 py-3 text-left font-semibold">Nguyên liệu</th>
								<th className="px-4 py-3 text-left font-semibold">Số lượng</th>
								<th className="px-4 py-3 text-left font-semibold">Trạng thái</th>
								<th className="px-4 py-3 text-left font-semibold">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredTransactions.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-4 py-8 text-center text-gray-500">
										Không có giao dịch phù hợp.
									</td>
								</tr>
							) : (
								filteredTransactions.map((item) => (
									<tr
										key={item.id}
										className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
									>
										<td className="px-4 py-3 font-medium text-gray-900">{item.code}</td>
										<td className="px-4 py-3 text-gray-700">{TYPE_LABEL_MAP[item.type]}</td>
										<td className="px-4 py-3 text-gray-900">{item.itemName}</td>
										<td className="px-4 py-3 text-gray-700">
											{item.quantity} {item.unit}
										</td>
										<td className="px-4 py-3">
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
													item.status === "DONE"
														? "bg-emerald-50 text-emerald-700"
														: "bg-amber-50 text-amber-700"
												}`}
											>
												{item.status === "DONE" ? "Hoàn tất" : "Nháp"}
											</span>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center gap-2">
												<Button
													size="small"
													icon={<Edit3 size={14} />}
													onClick={() => openEditModal(item)}
												>
													Sửa
												</Button>
												<Button
													danger
													size="small"
													icon={<Trash2 size={14} />}
													onClick={() => deleteTransaction(item)}
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
				title={editingId !== null ? "Chỉnh sửa giao dịch kho" : "Tạo giao dịch kho"}
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
						label="Mã giao dịch"
						rules={[
							{ required: true, message: "Vui lòng nhập mã giao dịch" },
							{ max: 20, message: "Mã không vượt quá 20 ký tự" },
						]}
					>
						<Input placeholder="VD: NK001" disabled={editingId !== null} />
					</Form.Item>

					<Form.Item
						name="type"
						label="Loại giao dịch"
						rules={[{ required: true, message: "Vui lòng chọn loại giao dịch" }]}
					>
						<Select placeholder="Chọn loại" options={TYPE_OPTIONS} />
					</Form.Item>

					<Form.Item
						name="itemName"
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

					<Form.Item name="note" label="Ghi chú">
						<Input.TextArea rows={3} placeholder="Nhập ghi chú" />
					</Form.Item>

					<Form.Item name="status" label="Trạng thái" valuePropName="checked">
						<Switch checkedChildren="Hoàn tất" unCheckedChildren="Nháp" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
