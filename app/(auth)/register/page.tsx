"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

import {
  DTO_RQ_RegisterStep1Form,
  DTO_RQ_RegisterStep2Form,
} from "@/types/common/auth/register.interface";

import { REGISTER_BUSINESS_SECTOR_OPTIONS } from "@/constants/common/auth/register.constant";

import { storeService } from "@/lib/services/common/store/store.service";
import { API_GetProvinces } from "@/lib/services/common/location/province.service";
import { DTO_RQ_CreateStore } from "@/types/common/store/store.interface";
import { ProvinceName } from "@/types/common/location/province.interface";
import { authService } from "@/lib/services/common/auth/auth.service";
import { toastError, toastSuccess, toastWarning } from "@/lib/utils/toast";

export default function RegisterPage() {
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [storeName, setStoreName] = useState<string>("");

  const [provinces, setProvinces] = useState<ProvinceName[]>([]);
  const [provincesLoading, setProvincesLoading] = useState(false);

  const [createStoreLoading, setCreateStoreLoading] = useState(false);
  const [createAccountLoading, setCreateAccountLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [email, setEmail] = useState<string>("");

  /* ================= REF FOR CLEANUP ================= */

  const stepRef = useRef(step);
  const storeIdRef = useRef(storeId);
  const registerCompletedRef = useRef(false);

  useEffect(() => {
    stepRef.current = step;
    storeIdRef.current = storeId;
  }, [step, storeId]);

  useEffect(() => {
    return () => {
      if (!registerCompletedRef.current && storeIdRef.current) {
        storeService.deleteStore(storeIdRef.current);
      }
    };
  }, []);

  /* ================= FETCH PROVINCES ================= */

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setProvincesLoading(true);

        const res = await API_GetProvinces();

        if (res.success) {
          setProvinces(res.data);
        } else {
          toastWarning("Không tải được danh sách tỉnh/thành.");
        }
      } catch (error) {
        toastError("Lỗi hệ thống. Vui lòng thử lại sau.");
      } finally {
        setProvincesLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const provinceOptions = provinces.map((province) => ({
    value: String(province.code),
    label: province.name,
  }));

  /* ================= STEP 1 ================= */

  const handleStep1Submit = async (values: DTO_RQ_RegisterStep1Form) => {
    try {
      setCreateStoreLoading(true);

      const requestData: DTO_RQ_CreateStore = {
        owner: values.owner,
        store_name: values.storeName,
        province_id: values.provinceCode,
        business_sector: values.businessSector,
      };

      const res = await storeService.createStore(requestData);

      if (res.success) {
        toastSuccess("Tạo cửa hàng thành công.");

        setStoreId(res.data.publicId);
        setStoreName(res.data.storeName);
        setStep(2);
      } else if (res.code == 409) {
        toastWarning("Cửa hàng đã tồn tại trong hệ thống.");
      } else {
        toastWarning("Tạo cửa hàng thất bại.");
      }
    } catch (error) {
      toastError("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setCreateStoreLoading(false);
    }
  };

  /* ================= STEP 2 ================= */

  const handleStep2Submit = async (values: DTO_RQ_RegisterStep2Form) => {
    if (!storeId) {
      toastError("Cửa hàng không tồn tại.");
      return;
    }

    try {
      setCreateAccountLoading(true);

      const res = await authService.API_RegisterEmail({
        email: values.email,
        password: values.password,
        storeId,
      });

      if (res.success) {
        toastSuccess("OTP đã được gửi tới email");

        setEmail(res.data.email);
        setAccountId(res.data.account_id);
        setStep(3);
      } else {
        toastError("Tạo tài khoản thất bại.");
      }
    } catch (error) {
      toastError("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setCreateAccountLoading(false);
    }
  };

  /* ================= STEP 3 ================= */

  const handleVerifyOtp = async (values: { otp: string }) => {
    try {
      setOtpLoading(true);

      const res = await authService.API_VerifyOtp({
        email,
        otp: values.otp,
        id: accountId as string,
      });

      if (res.success) {
        toastSuccess(
          "Đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ."
        );

        router.push("/login");
      } else {
        toastWarning(
          "OTP không đúng. Vui lòng kiểm tra lại email và thử lại."
        );
      }
    } catch (error) {
      toastError("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setOtpLoading(false);
    }
  };

  /* ================= BACK TO STEP 1 ================= */

  const goToStep1 = async () => {
    if (!storeId) {
      setStep(1);
      return;
    }

    try {
      setCreateStoreLoading(true);

      const res = await storeService.deleteStore(storeId);

      if (res.success) {
        toastSuccess("Cửa hàng tạm thời đã bị xóa.");

        setStoreId(null);
        setStoreName("");
        setAccountId(null);
        setStep(1);
      } else {
        toastWarning("Không thể quay lại. Vui lòng thử lại.");
      }
    } catch (error) {
      toastError("Lỗi hệ thống. Vui lòng thử lại sau.");
    } finally {
      setCreateStoreLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <div className="space-y-4">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <Form<DTO_RQ_RegisterStep1Form>
              layout="vertical"
              requiredMark={false}
              onFinish={handleStep1Submit}
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
                rules={[
                  { required: true, message: "Vui lòng nhập tên cửa hàng" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<ShopOutlined />}
                  placeholder="Nhập tên cửa hàng"
                />
              </Form.Item>

              <Form.Item
                label="Khu vực"
                name="provinceCode"
                rules={[
                  { required: true, message: "Vui lòng chọn tỉnh/thành" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Chọn khu vực"
                  loading={provincesLoading}
                  options={provinceOptions}
                  showSearch
                />
              </Form.Item>

              <Form.Item
                label="Ngành kinh doanh"
                name="businessSector"
                rules={[
                  { required: true, message: "Vui lòng chọn ngành kinh doanh" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Chọn ngành kinh doanh"
                  options={REGISTER_BUSINESS_SECTOR_OPTIONS}
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

            <Form
              layout="vertical"
              requiredMark={false}
              onFinish={handleStep2Submit}
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

              <Button
                htmlType="submit"
                size="large"
                loading={createAccountLoading}
                className="w-full !bg-gray-900 !text-white hover:!bg-gray-800"
              >
                Đăng ký
              </Button>
            </Form>

            <Button type="link" onClick={goToStep1}>
              Quay lại bước 1
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
                rules={[{ required: true }, { len: 6 }]}
              >
                <Input.OTP length={6} size="large" />
              </Form.Item>

              <Button
                htmlType="submit"
                size="large"
                loading={otpLoading}
                className="w-full !bg-gray-900 !text-white hover:!bg-gray-800"
              >
                Xác nhận OTP
              </Button>
            </Form>
          </>
        )}
      </div>
    </>
  );
}