"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  MailOutlined,
  LockOutlined,
  LinkOutlined
} from "@ant-design/icons";

import type { CreateStoreRequest } from "@/types/common/store/store.interface";

import { BUSINESS_SECTOR_OPTIONS } from "@/constants/common/auth/register.constant";

import { storeService } from "@/lib/services/common/store/store.service";
import { authService } from "@/lib/services/common/auth/auth.service";
import { toastError, toastSuccess, toastWarning } from "@/lib/utils/toast";
import { RegisterStep1Form, RegisterStep2Form } from "@/types/common/auth/auth.interface";

export default function RegisterPage() {
  const router = useRouter();

  /* ─── State ─── */
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [storeName, setStoreName] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const [createStoreLoading, setCreateStoreLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  /* ─── Cleanup refs ─── */
  const storeIdRef = useRef(storeId);
  const registerCompletedRef = useRef(false);

  useEffect(() => {
    storeIdRef.current = storeId;
  }, [storeId]);

  useEffect(() => {
    return () => {
      if (!registerCompletedRef.current && storeIdRef.current) {
        storeService.deleteStore(storeIdRef.current).catch((err) => {
          console.error("Cleanup deleteStore failed:", err);
        });
      }
    };
  }, []);

  /* ─── Resend cooldown timer ─── */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  /* ═══════════════════ STEP 1: TẠO CỬA HÀNG ═══════════════════ */

  const handleCreateStore = async (values: RegisterStep1Form) => {
    try {
      setCreateStoreLoading(true);

      const request: CreateStoreRequest = {
        owner: values.owner,
        storeName: values.storeName,
        businessSector: values.businessSector,
        storeNameSystem: values.storeNameSystem,
      };

      const res = await storeService.createStore(request);

      if (res.success) {
        toastSuccess("Tạo cửa hàng thành công.");
        setStoreId(res.data.storeId);     // BE trả: storeId
        setStoreName(res.data.storeName);  // BE trả: storeName
        setStep(2);
      } else if (res.code === 409) {
        message.warning("Tên cửa hàng trên hệ thống đã tồn tại.");
      } else {
        message.error("Tạo cửa hàng thất bại.");
      }
    } catch (error) {
      console.error("handleCreateStore:", error);
      toastError("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setCreateStoreLoading(false);
    }
  };

  /* ═══════════════════ STEP 2: ĐĂNG KÝ EMAIL ═══════════════════ */

  const handleRegisterEmail = async (values: RegisterStep2Form) => {
    if (!storeId) {
      toastError("Cửa hàng không tồn tại.");
      return;
    }

    try {
      setRegisterLoading(true);

      const res = await authService.registerEmail({
        email: values.email,
        password: values.password,
        storeId,
      });

      if (res.success) {
        toastSuccess("OTP đã được gửi tới email.");
        setAccountId(res.data.accountId);  // BE trả: accountId
        setEmail(res.data.email);          // BE trả: email
        setResendCooldown(60);
        setStep(3);
      } else if (res.code === 409) {
        message.warning("Email đã được sử dụng. Vui lòng dùng email khác.");
      } else {
        message.error("Đăng ký thất bại.");
      }
    } catch (error) {
      console.error("handleRegisterEmail:", error);
      message.error("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setRegisterLoading(false);
    }
  };

  /* ═══════════════════ STEP 3: XÁC THỰC OTP ═══════════════════ */

  const handleVerifyOtp = async (values: { otp: string }) => {
    if (!accountId || !storeId) {
      message.error("Thiếu thông tin xác thực.");
      return;
    }

    try {
      setVerifyLoading(true);

      const res = await authService.verifyOtp({
        email,
        otp: values.otp,
        accountId,
        storeId,
      });

      if (res.success) {
        registerCompletedRef.current = true;
        toastSuccess("Đăng ký thành công. Bạn có thể đăng nhập ngay.");
        router.push("/login");
      } else if (res.code === 422) {
        message.warning("OTP không hợp lệ hoặc đã hết hạn.");
      } else {
        message.error("Xác thực OTP thất bại.");
      }
    } catch (error) {
      console.error("handleVerifyOtp:", error);
      message.error("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setVerifyLoading(false);
    }
  };

  /* ═══════════════════ GỬI LẠI OTP ═══════════════════ */

  const handleResendOtp = async () => {
    if (!email || !accountId) return;

    try {
      setResendLoading(true);

      const res = await authService.resendOtp({ email, accountId });

      if (res.success) {
        message.success("OTP mới đã được gửi tới email.");
        setResendCooldown(60);
      } else {
        message.warning("Gửi lại OTP thất bại.");
      }
    } catch (error) {
      console.error("handleResendOtp:", error);
      message.error("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setResendLoading(false);
    }
  };

  /* ═══════════════════ QUAY LẠI ═══════════════════ */

  const goToStep1 = async () => {
    if (!storeId) {
      setStep(1);
      return;
    }

    try {
      setCreateStoreLoading(true);

      const res = await storeService.deleteStore(storeId);

      if (res.success) {
        setStoreId(null);
        setStoreName("");
        setAccountId(null);
        setEmail("");
        setStep(1);
      } else {
        message.warning("Không thể quay lại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("goToStep1:", error);
      message.error("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setCreateStoreLoading(false);
    }
  };

  const goToStep2 = () => setStep(2);

  /* ═══════════════════ RENDER ═══════════════════ */

  return (
    <div className="space-y-4">
      {/* STEP 1 */}
      {step === 1 && (
        <>
          <Form<RegisterStep1Form>
            layout="vertical"
            requiredMark={false}
            onFinish={handleCreateStore}
            className="space-y-2"
          >
            <Form.Item
              label="Họ và tên"
              name="owner"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Nhập họ tên của bạn"
              />
            </Form.Item>

            <Form.Item
              label="Tên cửa hàng"
              name="storeName"
              rules={[{ required: true, message: "Vui lòng nhập tên cửa hàng" }]}
            >
              <Input
                size="large"
                prefix={<ShopOutlined />}
                placeholder="Nhập tên cửa hàng"
              />
            </Form.Item>

            <Form.Item
              label="Tên cửa hàng trên hệ thống"
              name="storeNameSystem"
              rules={[{ required: true, message: "Vui lòng nhập tên cửa hàng trên hệ thống" }]}
            >
              <Input
                size="large"
                prefix={<LinkOutlined />}
                placeholder="Nhập tên cửa hàng tham gia hệ thống"
              />
            </Form.Item>

            <Form.Item
              label="Ngành kinh doanh"
              name="businessSector"
              rules={[{ required: true, message: "Vui lòng chọn ngành kinh doanh" }]}
            >
              <Select
                size="large"
                placeholder="Chọn ngành kinh doanh"
                options={BUSINESS_SECTOR_OPTIONS}
              />
            </Form.Item>

            <Button
              htmlType="submit"
              size="large"
              loading={createStoreLoading}
              className="w-full !bg-gray-900 !text-white hover:!bg-gray-800"
            >
              Tạo cửa hàng
            </Button>
          </Form>

          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-medium text-gray-900 underline">
              Đăng nhập
            </Link>
          </p>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h2 className="text-lg font-semibold">{storeName}</h2>

          <Form<RegisterStep2Form>
            layout="vertical"
            requiredMark={false}
            onFinish={handleRegisterEmail}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Vui lòng nhập email hợp lệ" },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="Nhập địa chỉ email"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
              />
            </Form.Item>

            <Button
              htmlType="submit"
              size="large"
              loading={registerLoading}
              className="w-full !bg-gray-900 !text-white hover:!bg-gray-800"
            >
              Đăng ký
            </Button>
          </Form>

          <Button type="link" onClick={goToStep1} loading={createStoreLoading}>
            ← Quay lại bước 1
          </Button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h2 className="text-lg font-semibold">Xác thực email</h2>

          <p className="text-sm text-gray-500">
            Mã OTP đã gửi tới <b>{email}</b>
          </p>

          <Form onFinish={handleVerifyOtp} layout="vertical">
            <Form.Item
              label="OTP"
              name="otp"
              rules={[
                { required: true, message: "Vui lòng nhập mã OTP" },
                { len: 6, message: "Mã OTP gồm 6 ký tự" },
              ]}
            >
              <Input.OTP length={6} size="large" />
            </Form.Item>

            <Button
              htmlType="submit"
              size="large"
              loading={verifyLoading}
              className="w-full !bg-gray-900 !text-white hover:!bg-gray-800"
            >
              Xác nhận OTP
            </Button>
          </Form>

          <div className="flex items-center justify-between">
            <Button type="link" onClick={goToStep2} className="!px-0">
              ← Quay lại
            </Button>

            <Button
              type="link"
              onClick={handleResendOtp}
              loading={resendLoading}
              disabled={resendCooldown > 0}
              className="!px-0"
            >
              {resendCooldown > 0 ? `Gửi lại OTP (${resendCooldown}s)` : "Gửi lại OTP"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}