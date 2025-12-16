"use client";
import { Gamepad2, Lock, Mail, AlertCircle, Shield } from "lucide-react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      document.cookie = `__session=${token}; path=/; max-age=3600;`;

      router.push("/admin/dashboard");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential") {
        setError("Email atau password salah!");
      } else if (err.code === "auth/user-not-found") {
        setError("Akun admin tidak ditemukan!");
      } else if (err.code === "auth/wrong-password") {
        setError("Password salah!");
      } else {
        setError("Gagal login. Coba lagi.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bkg2.jpeg')" }}
      ></div>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md z-10">
        <div
          className="rounded-2xl shadow-2xl p-8 border-2"
          style={{
            backgroundColor: "rgba(26, 26, 26, 0.95)",
            borderColor: "#FFA64D",
          }}
        >
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg relative"
              style={{ backgroundColor: "#FFA64D" }}
            >
              <Shield className="w-10 h-10 text-black absolute" />
              <Gamepad2 className="w-6 h-6 text-black absolute bottom-2 right-2" />
            </div>
            <h1
              className="text-3xl font-extrabold mb-2"
              style={{ color: "#FFD7A1" }}
            >
              4RJCUS Admin
            </h1>
            <p className="text-gray-400 text-sm">
              Panel Kontrol Rental Playstation
            </p>
          </div>

          <div
            className="mb-6 p-3 rounded-lg text-center border"
            style={{
              backgroundColor: "rgba(255, 166, 77, 0.1)",
              borderColor: "#FFA64D",
            }}
          >
            <p
              className="text-sm font-semibold flex items-center justify-center gap-2"
              style={{ color: "#FFD7A1" }}
            >
              <Shield className="w-4 h-4" />
              Area Khusus Administrator
            </p>
          </div>

          {error && (
            <div
              className="mb-6 p-4 rounded-lg flex items-start gap-3 border"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderColor: "#EF4444",
              }}
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: "#FFD7A1" }}
              >
                Email Admin
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: "#FFA64D" }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin(e)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all duration-200 text-white"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 166, 77, 0.3)",
                  }}
                  placeholder="admin@4rjcus.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: "#FFD7A1" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: "#FFA64D" }}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin(e)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all duration-200 text-white"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 166, 77, 0.3)",
                  }}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-black"
              style={{
                backgroundColor: "#FFA64D",
                boxShadow: "0 4px 14px 0 rgba(255, 166, 77, 0.4)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </div>

          <div className="mt-8 mb-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-sm text-gray-500">atau</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <div className="text-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <Gamepad2 className="w-4 h-4" />
              Kembali ke Halaman Utama
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Area ini hanya untuk administrator 4RJCUS
          </p>
        </div>
      </div>
    </div>
  );
}
