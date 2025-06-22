import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../auth/authUtils";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginUser(formData);
    if (result.success) {
      alert("Login berhasil!");
      navigate(result.role === "admin" ? "/admin" : "/home");
    } else {
      alert(result.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: "url('/bglogin.jpg')" }}
    >
      <div className="bg-gray-900/85 p-10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="logo" className="h-11 mb-5" />
          <h1 className="text-white text-3xl font-bold mb-2">Masuk</h1>
          <h2 className="text-white text-base font-normal mb-5">
            Selamat datang kembali!
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-5">
              <label className="block text-white text-lg font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/85 border border-gray-600 rounded-3xl px-3 py-3 text-white"
              />
            </div>
            <div className="mb-5">
              <label className="block text-white text-lg font-medium mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Masukkan kata sandi"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/85 border border-gray-600 rounded-3xl px-3 py-3 text-white pr-12"
                />
                <span
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-gray-400 text-xl"
                  />
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-5 text-white">
              <Link to="/register" className="text-gray-300 hover:text-white">
                Belum punya akun? <b>Daftar</b>
              </Link>
              <p className="text-gray-300 hover:text-white">Lupa kata sandi?</p>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-3xl mb-3"
            >
              Masuk
            </button>
            <p className="text-center text-gray-400 mb-3">Atau</p>
            <button
              type="button"
              className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white font-medium py-3 px-4 rounded-3xl flex items-center justify-center gap-2"
            >
              <img
                src="/googleicon.png"
                alt="Google Logo"
                className="w-5 h-5"
              />
              Masuk dengan Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
