"use client";

import React, { useState } from "react";
import login from "@/lib/auth/login";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function LoginForm() {
  const router = useRouter();
  const handleLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const results = await login(data);
      if (results.success) {
        router.push("/home");
      }
    } catch (error: any) {
      Swal.fire("Error", error.message, "warning");
      console.log(error.message);
    }
  };
  return (
    <form
      action=""
      onSubmit={handleLoginForm}
      className="flex flex-col gap-y-3 w-[320px]"
    >
      <input
        type="email"
        placeholder="email"
        name="email"
        required
        autoCapitalize="email"
        className="p-3 rounded-md focus:ring-amber-600 focus:ring-inset ring-inset ring-1 border-0 "
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        autoComplete="current-password"
        className="p-3 rounded-md focus:ring-amber-600 focus:ring-inset border-0"
      />
      <button className="bg-[#5596EC] p-3 rounded-md font-bold">Login</button>
      <p>
        Don&apos;t have an account?{" "}
        <span>
          <a href="/register" className="underline font-semibold hover:text-blue-700">
            Sign Up
          </a>
        </span>
      </p>
    </form>
  );
}

export default LoginForm;
