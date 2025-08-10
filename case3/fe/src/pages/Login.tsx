import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/login`,
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data?.message)
        navigate("/dashboard")
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-svh">
      <div className="w-full max-w-sm mx-auto p-6 border rounded hover:border-yellow-400">
        <p className="text-2xl font-semibold mb-6">Login Dulu King</p>
        <form onSubmit={handleLogin}>
          <Label htmlFor="username" className="mb-2 block">
            Username
          </Label>
          <Input
            id="username"
            placeholder="Username"
            className="mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label htmlFor="password" className="mb-2 block">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Check Repo
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
