import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerNewUser } from "../auth/authUtils";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi password tidak sama!");
      return;
    }

    const result = registerNewUser({
      username: formData.username,
      password: formData.password,
    });

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Registrasi berhasil!");
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: "url('bgregister.jpg')" }}
    >
      <div className="bg-gray-900/85 p-10 rounded-2xl h-auto w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="logo" className="h-11 mb-5" />
          <h1 className="text-white text-3xl font-bold">Daftar</h1>
          <h2 className="text-white text-base font-normal mb-5">
            Selamat datang!
          </h2>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-white text-lg font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-900/85 border border-gray-600 rounded-3xl px-3 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-white text-lg font-medium mb-1"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Masukkan kata sandi"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/85 border border-gray-600 rounded-3xl px-3 py-3 text-white focus:outline-none focus:border-blue-500 pr-12"
                />
                <span
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 pr-1 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-gray-400 text-xl"
                  />
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="block text-white text-lg font-medium mb-1"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Masukkan kata sandi"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-900/85 border border-gray-600 rounded-3xl px-3 py-3 text-white focus:outline-none focus:border-blue-500 pr-12"
                />
                <span
                  type="button"
                  onClick={toggleConfirmPassword}
                  className="absolute right-3 pr-1 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="text-gray-400 text-xl"
                  />
                </span>
              </div>
            </div>

            <div className="flex justify-center mb-5">
              <Link to="/login" className="text-gray-300 hover:text-white">
                Sudah punya akun? <b>Masuk</b>
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-3xl transition-colors mb-3"
            >
              Daftar
            </button>

            <p className="text-center text-gray-400 mb-3">Atau</p>

            <button
              type="button"
              className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-white font-medium py-3 px-4 rounded-3xl flex items-center justify-center gap-2 transition-colors"
            >
              <img src="googleicon.png" alt="Google Logo" className="w-5 h-5" />
              Daftar dengan Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
