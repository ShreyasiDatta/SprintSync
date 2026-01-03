import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">AI Project Manager</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;
