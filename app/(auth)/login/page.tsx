"use client";

import Link from "next/link";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const onFinish = (values: LoginValues) => {
    console.log("login:", values);
  };

  return (
    <div className="space-y-4">
      <Form<LoginValues>
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        className="space-y-2"
      >
        <Form.Item
          label={<span className="text-sm font-medium text-gray-700">Email</span>}
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="you@example.com"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-sm font-medium text-gray-700">Mật khẩu</span>}
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="••••••••"
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            Ghi nhớ đăng nhập
          </label>

          <Link href="/forgot-password" className="text-sm text-gray-900 underline">
            Quên mật khẩu?
          </Link>
        </div>

        <Button
          htmlType="submit"
          size="large"
          className="mt-2 w-full !bg-gray-900 !text-white hover:!bg-gray-800"
        >
          Đăng nhập
        </Button>
      </Form>

      <p className="text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          rel="noopener noreferrer"
          className="font-medium text-gray-900 underline"
        >
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}