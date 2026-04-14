"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Form, Input, Modal, Select, Switch, message } from "antd";
import {
	supplierService,
	type Supplier,
	type SupplierGroup,
	type SupplierPayload,
} from "@/lib/services/FNB/FNB3/supplier.service";
import {
	Building2,
	CircleDot,
	Edit3,
	Mail,
	Package,
	List,
	Phone,
	Plus,
	Search,
	Trash2,
	Truck,
	UserRound,
} from "lucide-react";

interface SupplierFormValues {
	code: string;
	name: string;
	contact: string;
	phone: string;
	email: string;
	groupId: number;
	status: boolean;
}

interface GroupWithCount {
	id: number;
	name: string;
	count: number;
}

interface SyncSupplierDataOptions {
	fetchSuppliers?: boolean;
	fetchGroups?: boolean;
	showError?: boolean;
}

export default function FNB3NhaCungCapPage() {
	const { storeId } = useParams<{ storeId: string }>();
	const [form] = Form.useForm<SupplierFormValues>();

	const [keyword, setKeyword] = useState("");
	const [suppliers, setSuppliers] = useState<Supplier[]>([]);
	const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
	const [editingSupplierId, setEditingSupplierId] = useState<number | null>(null);

	const [groups, setGroups] = useState<SupplierGroup[]>([]);
	const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
	const [groupKeyword, setGroupKeyword] = useState("");
	const [groupInput, setGroupInput] = useState("");
	const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
	const [isSyncing, setIsSyncing] = useState(false);

	const isEditing = Boolean(editingSupplierId);
	const isEditingGroup = editingGroupId !== null;

	function normalizeText(value: string | null | undefined) {
		return typeof value === "string" ? value.trim().toLowerCase() : "";
	}

	function resolveSupplierGroupName(supplier: Supplier) {
		if (typeof supplier.group === "string" && supplier.group.trim()) {
			return supplier.group;
		}
		if (typeof supplier.groupId === "number") {
			return groups.find((group) => group.id === supplier.groupId)?.name ?? "";
		}
		return "";
	}

	function resolveSupplierGroupId(supplier: Supplier) {
		if (typeof supplier.groupId === "number") {
			return supplier.groupId;
		}
		const matchedGroupByName = groups.find(
			(group) => normalizeText(group.name) === normalizeText(supplier.group)
		);
		return matchedGroupByName?.id ?? groups[0]?.id;
	}

	const filteredSuppliers = useMemo(() => {
		const q = keyword.trim().toLowerCase();
		if (!q) return suppliers;

		return suppliers.filter((supplier) => {
			const supplierGroupName = resolveSupplierGroupName(supplier).toLowerCase();
			return (
				supplier.code.toLowerCase().includes(q) ||
				supplier.name.toLowerCase().includes(q) ||
				supplier.contact.toLowerCase().includes(q) ||
				supplier.phone.toLowerCase().includes(q) ||
				supplier.email.toLowerCase().includes(q) ||
				supplierGroupName.includes(q)
			);
		});
	}, [keyword, suppliers, groups]);

	const totalSuppliers = suppliers.length;
	const activeSuppliers = suppliers.filter((s) => s.status === "ACTIVE").length;
	const inactiveSuppliers = totalSuppliers - activeSuppliers;
	const filteredGroups = useMemo(() => {
		const q = groupKeyword.trim().toLowerCase();
		if (!q) return groups;
		return groups.filter((group) => group.name.toLowerCase().includes(q));
	}, [groupKeyword, groups]);
	const groupsWithCount = useMemo<GroupWithCount[]>(
		() =>
			filteredGroups.map((group) => ({
				id: group.id,
				name: group.name,
				count:
					typeof group.supplierCount === "number"
						? group.supplierCount
						: suppliers.filter(
								(supplier) =>
									normalizeText(resolveSupplierGroupName(supplier)) === normalizeText(group.name)
						  ).length,
			})),
		[filteredGroups, suppliers, groups]
	);

	async function syncSupplierData(options: SyncSupplierDataOptions = {}) {
		if (!storeId) return;

		const {
			fetchSuppliers = true,
			fetchGroups = true,
			showError = false,
		} = options;

		if (!fetchSuppliers && !fetchGroups) return;

		setIsSyncing(true);
		try {
			const [supplierResult, groupResult] = await Promise.allSettled([
				fetchSuppliers
					? supplierService.fetchSuppliersAPI(storeId)
					: Promise.resolve<Supplier[] | null>(null),
				fetchGroups
					? supplierService.fetchGroupsAPI(storeId)
					: Promise.resolve<SupplierGroup[] | null>(null),
			]);

			if (fetchSuppliers && supplierResult.status === "fulfilled" && supplierResult.value) {
				setSuppliers(supplierResult.value);
			} else if (fetchSuppliers && showError && supplierResult.status === "rejected") {
				message.error(
					supplierResult.reason instanceof Error
						? supplierResult.reason.message
						: "Không thể tải danh sách nhà cung cấp."
				);
			}

			if (fetchGroups && groupResult.status === "fulfilled" && groupResult.value) {
				setGroups(groupResult.value);
			} else if (fetchGroups && showError && groupResult.status === "rejected") {
				message.error(
					groupResult.reason instanceof Error
						? groupResult.reason.message
						: "Không thể tải danh sách nhóm hàng."
				);
			}

			if (
				showError &&
				((fetchSuppliers && supplierResult.status === "rejected") ||
					(fetchGroups && groupResult.status === "rejected"))
			) {
				message.error("Không thể đồng bộ dữ liệu từ hệ thống.");
			}
		} finally {
			setIsSyncing(false);
		}
	}

	useEffect(() => {
		void syncSupplierData({ fetchSuppliers: true, fetchGroups: true });
	}, [storeId]);

	function resetSupplierFormState() {
		setEditingSupplierId(null);
		form.resetFields();
	}

	function closeSupplierModal() {
		setIsSupplierModalOpen(false);
		resetSupplierFormState();
	}

	function openCreateModal() {
		setEditingSupplierId(null);
		form.setFieldsValue({
			code: "",
			name: "",
			contact: "",
			phone: "",
			email: "",
			groupId: groups[0]?.id,
			status: true,
		});
		setIsSupplierModalOpen(true);
	}

	function openEditModal(supplier: Supplier) {
		const resolvedGroupId = resolveSupplierGroupId(supplier);

		setEditingSupplierId(supplier.id);
		form.setFieldsValue({
			code: supplier.code,
			name: supplier.name,
			contact: supplier.contact,
			phone: supplier.phone,
			email: supplier.email,
			groupId: resolvedGroupId,
			status: supplier.status === "ACTIVE",
		});
		setIsSupplierModalOpen(true);
	}

	function openGroupModal() {
		setIsGroupModalOpen(true);
		if (groups.length === 0) {
			void syncSupplierData({ fetchGroups: true, fetchSuppliers: false, showError: true });
		}
	}

	function closeGroupModal() {
		setIsGroupModalOpen(false);
		setGroupKeyword("");
		setGroupInput("");
		setEditingGroupId(null);
	}

	function startCreateGroup() {
		setEditingGroupId(null);
		setGroupInput("");
	}

	function startEditGroup(group: GroupWithCount) {
		setEditingGroupId(group.id);
		setGroupInput(group.name);
	}

	async function saveGroup() {
		const normalized = groupInput.trim();
		if (!normalized) {
			message.warning("Vui lòng nhập tên nhóm hàng.");
			return;
		}

		try {
			if (editingGroupId !== null) {
				await supplierService.updateGroupAPI(storeId, normalized, editingGroupId);
				message.success("Cập nhật nhóm hàng thành công");
			} else {
				await supplierService.createGroupAPI(storeId, normalized);
				message.success("Thêm nhóm hàng thành công");
			}

			await syncSupplierData({ fetchSuppliers: true, fetchGroups: true, showError: true });

			setGroupInput("");
			setEditingGroupId(null);
		} catch (error) {
			message.error(error instanceof Error ? error.message : "Không thể lưu nhóm hàng.");
		}
	}

	function deleteGroup(groupId: number, groupName: string) {
		Modal.confirm({
			title: "Xóa nhóm hàng",
			content: `Bạn có chắc muốn xóa nhóm hàng \"${groupName}\"?`,
			okText: "Xóa",
			cancelText: "Hủy",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await supplierService.deleteGroupAPI(storeId, groupId);
					await syncSupplierData({
						fetchSuppliers: true,
						fetchGroups: true,
						showError: true,
					});
					if (editingGroupId === groupId) {
						setEditingGroupId(null);
						setGroupInput("");
					}
					message.success("Xóa nhóm hàng thành công");
				} catch (error) {
					message.warning(
						error instanceof Error ? error.message : "Không thể xóa nhóm hàng."
					);
				}
			},
		});
	}

	function deleteSupplier(supplier: Supplier) {
		Modal.confirm({
			title: "Xóa nhà cung cấp",
			content: `Bạn có chắc muốn xóa ${supplier.name} (${supplier.code})?`,
			okText: "Xóa",
			cancelText: "Hủy",
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await supplierService.deleteSupplierAPI(storeId, supplier.id);
					await syncSupplierData({
						fetchSuppliers: true,
						fetchGroups: false,
						showError: true,
					});
					message.success("Xóa nhà cung cấp thành công");

					if (editingSupplierId === supplier.id) {
						closeSupplierModal();
					}
				} catch (error) {
					message.error(
						error instanceof Error ? error.message : "Không thể xóa nhà cung cấp."
					);
				}
			},
		});
	}

	async function handleSubmit() {
		try {
			const values = await form.validateFields();
			const nextSupplier: SupplierPayload = {
				code: values.code.trim(),
				name: values.name.trim(),
				contact: values.contact.trim(),
				phone: values.phone.trim(),
				email: values.email.trim(),
				groupId: values.groupId,
				status: values.status ? "ACTIVE" : "INACTIVE",
			};

			if (editingSupplierId) {
				await supplierService.updateSupplierAPI(storeId, editingSupplierId, nextSupplier);
			} else {
				await supplierService.createSupplierAPI(storeId, nextSupplier);
			}

			await syncSupplierData({
				fetchSuppliers: true,
				fetchGroups: false,
				showError: true,
			});

			message.success(
				editingSupplierId
					? "Cập nhật nhà cung cấp thành công"
					: "Thêm nhà cung cấp thành công"
			);
			closeSupplierModal();
		} catch (error) {
			if (error instanceof Error && error.message) {
				message.error(error.message);
			}
			// Validation errors are shown by Ant Design Form.
		}
	}

	return (
		<div className="p-6 sm:p-8 max-w-6xl mx-auto">
			<div className="flex flex-wrap items-center justify-between gap-3 mb-6">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
						<Truck size={20} />
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-900">Nhà cung cấp</h1>
						<p className="text-sm text-gray-400">Quản lý đối tác cung ứng hàng hóa</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Button
						onClick={openGroupModal}
						icon={<List size={16} />}
						className="h-10! rounded-xl!"
						disabled={isSyncing}
					>
						Danh sách nhóm hàng
					</Button>
					<Button
						type="primary"
						onClick={openCreateModal}
						icon={<Plus size={16} />}
						className="h-10! rounded-xl!"
						disabled={isSyncing}
					>
						Thêm nhà cung cấp
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
						<Building2 size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
					<p className="text-xs font-medium text-gray-700">Tổng nhà cung cấp</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
						<CircleDot size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{activeSuppliers}</p>
					<p className="text-xs font-medium text-gray-700">Đang hợp tác</p>
				</div>

				<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
					<div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
						<Package size={18} />
					</div>
					<p className="text-2xl font-bold text-gray-900">{inactiveSuppliers}</p>
					<p className="text-xs font-medium text-gray-700">Tạm ngưng</p>
				</div>
			</div>

			<div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-4">
				<label
					htmlFor="supplier-search"
					className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 block"
				>
					Tìm kiếm
				</label>
				<div className="relative">
					<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
					<input
						id="supplier-search"
						type="text"
						value={keyword}
						onChange={(event) => setKeyword(event.target.value)}
						placeholder="Tìm theo mã, tên, người liên hệ, số điện thoại..."
						className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
					/>
				</div>
			</div>

			<div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
							<tr>
								<th className="px-4 py-3 text-left font-semibold">Mã NCC</th>
								<th className="px-4 py-3 text-left font-semibold">Tên nhà cung cấp</th>
								<th className="px-4 py-3 text-left font-semibold">Liên hệ</th>
								<th className="px-4 py-3 text-left font-semibold">Nhóm hàng</th>
								<th className="px-4 py-3 text-left font-semibold">Trạng thái</th>
								<th className="px-4 py-3 text-left font-semibold">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							{filteredSuppliers.length === 0 ? (
								<tr>
									<td colSpan={6} className="px-4 py-8 text-center text-gray-500">
										Không tìm thấy nhà cung cấp phù hợp.
									</td>
								</tr>
							) : (
								filteredSuppliers.map((supplier) => (
									<tr
										key={supplier.id}
										className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60"
									>
										<td className="px-4 py-3 font-medium text-gray-900">{supplier.code}</td>
										<td className="px-4 py-3">
											<p className="font-medium text-gray-900">{supplier.name}</p>
											<p className="text-xs text-gray-500 mt-0.5">{supplier.email}</p>
										</td>
										<td className="px-4 py-3">
											<div className="flex flex-col gap-1 text-xs text-gray-600">
												<span className="inline-flex items-center gap-1.5">
													<UserRound size={13} className="text-gray-400" />
													{supplier.contact}
												</span>
												<span className="inline-flex items-center gap-1.5">
													<Phone size={13} className="text-gray-400" />
													{supplier.phone}
												</span>
												<span className="inline-flex items-center gap-1.5">
													<Mail size={13} className="text-gray-400" />
													{supplier.email}
												</span>
											</div>
										</td>
										<td className="px-4 py-3 text-gray-700">
											{resolveSupplierGroupName(supplier) || "-"}
										</td>
										<td className="px-4 py-3">
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
													supplier.status === "ACTIVE"
														? "bg-emerald-50 text-emerald-700"
														: "bg-rose-50 text-rose-700"
												}`}
											>
												{supplier.status === "ACTIVE" ? "Đang hợp tác" : "Tạm ngưng"}
											</span>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center gap-2">
												<Button
													type="default"
													size="small"
													onClick={() => openEditModal(supplier)}
													icon={<Edit3 size={14} />}
												>
													Chỉnh sửa
												</Button>
												<Button
													danger
													type="default"
													size="small"
													onClick={() => deleteSupplier(supplier)}
													icon={<Trash2 size={14} />}
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
				title={isEditing ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp"}
				open={isSupplierModalOpen}
				onCancel={closeSupplierModal}
				onOk={handleSubmit}
				okText={isEditing ? "Lưu thay đổi" : "Thêm mới"}
				cancelText="Hủy"
				destroyOnHidden
			>
				<Form form={form} layout="vertical" requiredMark={false}>
					<Form.Item
						name="code"
						label="Mã nhà cung cấp"
						rules={[
							{ required: true, message: "Vui lòng nhập mã nhà cung cấp" },
							{ max: 20, message: "Mã không vượt quá 20 ký tự" },
						]}
					>
						<Input placeholder="VD: NCC005" disabled={isEditing} />
					</Form.Item>

					<Form.Item
						name="name"
						label="Tên nhà cung cấp"
						rules={[{ required: true, message: "Vui lòng nhập tên nhà cung cấp" }]}
					>
						<Input placeholder="Nhập tên nhà cung cấp" />
					</Form.Item>

					<Form.Item
						name="contact"
						label="Người liên hệ"
						rules={[{ required: true, message: "Vui lòng nhập người liên hệ" }]}
					>
						<Input placeholder="Nhập họ tên người liên hệ" />
					</Form.Item>

					<Form.Item
						name="phone"
						label="Số điện thoại"
						rules={[
							{ required: true, message: "Vui lòng nhập số điện thoại" },
							{ pattern: /^[0-9+\s-]{8,15}$/, message: "Số điện thoại không hợp lệ" },
						]}
					>
						<Input placeholder="Nhập số điện thoại" />
					</Form.Item>

					<Form.Item
						name="email"
						label="Email"
						rules={[
							{ required: true, message: "Vui lòng nhập email" },
							{ type: "email", message: "Email không hợp lệ" },
						]}
					>
						<Input placeholder="Nhập email" />
					</Form.Item>

					<Form.Item
						name="groupId"
						label="Nhóm hàng"
						rules={[{ required: true, message: "Vui lòng chọn nhóm hàng" }]}
					>
						<Select
							placeholder="Chọn nhóm hàng"
							options={groups.map((group) => ({ label: group.name, value: group.id }))}
						/>
					</Form.Item>

					<Form.Item name="status" label="Trạng thái" valuePropName="checked">
						<Switch checkedChildren="Đang hợp tác" unCheckedChildren="Tạm ngưng" />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Danh sách nhóm hàng"
				open={isGroupModalOpen}
				onCancel={closeGroupModal}
				footer={[
					<Button key="close" onClick={closeGroupModal}>
						Đóng
					</Button>,
				]}
				width={720}
				destroyOnHidden
			>
				<div className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
						<Input
							value={groupInput}
							onChange={(event) => setGroupInput(event.target.value)}
							placeholder="Nhập tên nhóm hàng"
						/>
						<div className="flex items-center gap-2">
							<Button type="primary" onClick={saveGroup}>
								{isEditingGroup ? "Lưu nhóm" : "Thêm nhóm"}
							</Button>
							{isEditingGroup && (
								<Button onClick={startCreateGroup}>Hủy sửa</Button>
							)}
						</div>
					</div>

					<div className="relative">
						<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							value={groupKeyword}
							onChange={(event) => setGroupKeyword(event.target.value)}
							placeholder="Tìm nhóm hàng..."
							className="w-full h-10 pl-10 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
						/>
					</div>

					<div className="border border-gray-100 rounded-xl overflow-hidden">
						<table className="min-w-full text-sm">
							<thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
								<tr>
									<th className="px-4 py-2.5 text-left font-semibold">Tên nhóm hàng</th>
									<th className="px-4 py-2.5 text-left font-semibold">Số NCC</th>
									<th className="px-4 py-2.5 text-left font-semibold">Thao tác</th>
								</tr>
							</thead>
							<tbody>
								{filteredGroups.length === 0 ? (
									<tr>
										<td colSpan={3} className="px-4 py-8 text-center text-gray-500">
											Không tìm thấy nhóm hàng.
										</td>
									</tr>
								) : (
									groupsWithCount.map((groupItem) => {
										return (
											<tr key={groupItem.id} className="border-b border-gray-100 last:border-0">
												<td className="px-4 py-2.5 text-gray-800">{groupItem.name}</td>
												<td className="px-4 py-2.5 text-gray-600">{groupItem.count}</td>
												<td className="px-4 py-2.5">
													<div className="flex items-center gap-2">
														<Button
															size="small"
															icon={<Edit3 size={14} />}
															onClick={() => startEditGroup(groupItem)}
														>
															Sửa
														</Button>
														<Button
															danger
															size="small"
															icon={<Trash2 size={14} />}
															onClick={() => deleteGroup(groupItem.id, groupItem.name)}
														>
															Xóa
														</Button>
													</div>
												</td>
											</tr>
										);
									})
								)}
							</tbody>
						</table>
					</div>
				</div>
			</Modal>
		</div>
	);
}
