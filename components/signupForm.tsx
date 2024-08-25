"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import signUp from "@/lib/auth/signUp";
import { useRouter } from "next/navigation";

// Define the type for error messages
type SignUpErrors = {
  email?: string;
  password?: string;
  description?: string;
  phone?: string;
  nume?: string;
  prenume?: string;
  general?: string;
};

export function SignUpForm() {
  const router = useRouter();

  const displayErrors = async (errors: SignUpErrors) => {
    const errorMessages = Object.values(errors);

    for (const message of errorMessages) {
      if (message) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await signUp(formData);

      if (!response.success) {
        if (response.errors) {
          await displayErrors(response.errors);
        }
      } else {
        alert(response.success);
        console.log(response.message);
        router.push("/home");
      }
    } catch (error: any) {
      console.log(error.message);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-[320px]">
      <div className="flex flex-col gap-3">
        <input
          id="nume"
          name="nume"
          placeholder="Name"
          required
          className="p-3 rouned-md"
        />
      </div>

      <div className="flex flex-col gap-3">
        <input
          id="prenume"
          name="prenume"
          placeholder="Prenume"
          required
          className="p-3 rouned-md"
        />
      </div>

      <div className="flex flex-col gap-3">
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          required
          className="p-3 rouned-md"
        />
      </div>
      <div className="flex flex-col gap-3">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          className="p-3 rouned-md"
        />
      </div>
      <div className="flex flex-col gap-3">
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="phone"
          maxLength={10}
          required
          className="p-3 rouned-md"
        />
      </div>
      <div className="flex flex-col gap-3">
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Description"
          required
          className="p-3 rouned-md"
        />
      </div>
      <button type="submit" className="bg-[#5596EC] p-3 rounded-md font-bold">
        Sign Up
      </button>
      <p>
        Have an account?
        <span>
          <a
            href="/login"
            className="underline font-semibold hover:text-blue-700"
          >
            Login
          </a>
        </span>
      </p>
    </form>
  );
}
