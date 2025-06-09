import { useNavigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logged in! 2");

    navigate("/dashboard");
  };

  return <LoginPage onLogin={handleLogin} />;
};

export default Login;
