"use client";

import Link from "next/link";
import { Form, Input, Button, Select, Alert } from "antd";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import { useProvinces } from "@/hooks/useProvinces";

type RegisterValues = {
  fullName: string;
  storeName: string;
  provinceCode: string;
  agree?: boolean;
};

export default function RegisterPage() {
  const { provinces, isLoading, error } = useProvinces();

  const onFinish = (values: RegisterValues) => {
    console.log("register:", values);
  };

  const provinceOptions = provinces.map((province) => ({
    value: province.code,
    label: province.name,
  }));

  return (
    <div className="space-y-4">
      <Form<RegisterValues>
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        className="space-y-2"
      >
        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">Họ và tên</span>
          }
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên" },
            { min: 3, message: "Tối thiểu 3 ký tự" },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Nhập họ tên của bạn"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-sm font-medium text-gray-700">Tên cửa hàng</span>}
          name="storeName"
          rules={[
            { required: true, message: "Vui lòng nhập tên cửa hàng" },
            { min: 3, message: "Tên cửa hàng tối thiểu 3 ký tự" },
          ]}
        >
          <Input
            size="large"
            prefix={<ShopOutlined className="text-gray-400" />}
            placeholder="Nhập tên cửa hàng của bạn"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-sm font-medium text-gray-700">Khu vực</span>
          }
          name="provinceCode"
          rules={[
            { required: true, message: "Vui lòng chọn tỉnh/thành" },
          ]}
        >
          <Select
            size="large"
            loading={isLoading}
            showSearch
            optionFilterProp="label"
            placeholder="Chọn tỉnh/thành"
            options={provinceOptions}
          />
        </Form.Item>

        {error ? (
          <Alert
            type="warning"
            showIcon
            message="Không tải được danh sách khu vực"
            description={error}
          />
        ) : null}

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Bạn cần đồng ý điều khoản")),
            },
          ]}
        >
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            Tôi đồng ý với{" "}
            <Link href="/terms" className="text-gray-900 underline">
              Điều khoản
            </Link>{" "}
            &{" "}
            <Link href="/privacy" className="text-gray-900 underline">
              Chính sách
            </Link>
          </label>
        </Form.Item>

        <Button
          htmlType="submit"
          size="large"
          className="mt-2 w-full bg-gray-900! text-white! hover:bg-gray-800!"
        >
          Đăng ký
        </Button>
      </Form>

      <p className="text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <Link href="/login" className="font-medium text-gray-900 underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}