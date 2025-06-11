import { Button, Form, Input, Card, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authStore/userSlice";
import { loginaxios } from "../../services/AxiosService";
interface LoginUser {
  email: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token: string | null = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }
  const onFinish = async (values: LoginUser) => {
    const res: any = await loginaxios(
      "http://localhost:3000/auth/login",
      values
    );
    

    if (res?.status === 201) {
      localStorage.setItem("token", res?.data.token);
      dispatch(setUser(res?.data));
      navigate("/");
    } else {
      if (res?.response) {
        message.error(
          res?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else {
        message.error("Network error. Please check your internet connection.");
      }
    }
  };
  return (
    <div className="center-container">
      <Card className="login-card">
        <Form
          name="login_form"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input
              autoComplete="off"
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              autoComplete="off"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="login-btn-content">
            <Button
              className="login-btn"
              type="primary"
              htmlType="submit"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
