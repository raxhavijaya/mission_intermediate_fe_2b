import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies, saveMovies } from "../utils/movieUtils";
import moviesData from "../data/movies.json";

const Dashboard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    genre: "",
    duration: "",
    rating: "",
    agerating: "",
    poster: "",
    banner: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    }

    const storedMovies = getMovies();
    if (storedMovies.length === 0) {
      saveMovies(moviesData);
      setMovies(moviesData);
    } else {
      setMovies(storedMovies);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedMovies;
    if (form.id) {
      updatedMovies = movies.map((m) => (m.id === form.id ? form : m));
    } else {
      const newMovie = { ...form, id: Date.now() };
      updatedMovies = [...movies, newMovie];
    }
    setMovies(updatedMovies);
    saveMovies(updatedMovies);
    setForm({
      id: null,
      title: "",
      genre: "",
      duration: "",
      rating: "",
      agerating: "",
      poster: "",
      banner: "",
    });
  };

  const handleEdit = (movie) => setForm(movie);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus film ini?")) {
      const filtered = movies.filter((m) => m.id !== id);
      setMovies(filtered);
      saveMovies(filtered);
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Yakin ingin menghapus semua data film?")) {
      setMovies([]);
      saveMovies([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 to-black text-white">
      <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/10 rounded-3xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <img src="/logo.png" alt="logo" className="h-11" />
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/home")}
              className="bg-white/10 border border-gray-400 px-4 py-2 rounded-xl hover:bg-white/20"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="bg-white/10 border border-gray-400 px-4 py-2 rounded-xl hover:bg-white/20"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAll}
              className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-400"
            >
              Hapus Semua
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {["title", "genre", "duration", "rating", "agerating", "poster", "banner"].map(
            (field) => (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="bg-white/10 border border-gray-400 text-white placeholder-gray-300 px-4 py-2 rounded-xl focus:outline-none"
                required={field !== "poster"}
              />
            )
          )}
          <button
            type="submit"
            className="col-span-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition"
          >
            {form.id ? "Simpan Perubahan" : "Tambah Film"}
          </button>
        </form>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-md transition transform hover:scale-[1.02]"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-52 object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="bg-gray-200 text-black px-2 py-0.5 rounded">
                  {movie.agerating}
                </span>
                <span className="text-gray-300">{movie.duration}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300 flex items-center gap-1">
                  {movie.rating}
                  <img src="star.svg" alt="Star Icon" />
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{movie.genre}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(movie)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
