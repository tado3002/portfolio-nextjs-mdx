"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Login gagal");
    }
  }

  return (
    <div className="bg-secondary backdrop-blur-xl w-[40vw] mx-auto my-8 flex flex-col gap-16 rounded-xl p-8 md:my-16 md:grid-cols-2 md:gap-8 lg:gap-12">
      <div className="text-center text-neutral text-3xl font-bold">
        Login <span className="text-mint">Admin</span>
      </div>
      <form onSubmit={handleLogin}>
        <div className="mb-4 flex w-full flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address here"
            className="bg-secondary border-border focus:ring-mint text-neutral w-full rounded-lg border p-[10px] placeholder:font-thin focus:ring-2 focus:outline-none"
          />
        </div>
        <div className="mb-4 flex w-full flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-secondary border-border focus:ring-mint text-neutral w-full rounded-lg border p-[10px] placeholder:font-thin focus:ring-2 focus:outline-none"
          />
        </div>
        <button
          className="bg-mint my-2 hover:bg-mint/60 disabled:bg-mint/40 text-secondary w-full cursor-pointer rounded-lg px-[10px] py-2 transition-colors duration-300"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
