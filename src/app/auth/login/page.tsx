"use client";
import Card from "@live-component/Card";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { Auth, ResponseUsersAuth } from "src/interface/user";
import APIAuth from "@live-api/Client/auth.api";
import { Jwt } from "jsonwebtoken";
import { ErrorAlert } from "@live-component/Alert/AlertError";
import { useRouter } from "next/navigation";
import { SuccessAlert } from "@live-component/Alert/AlertSuccess";
import { setCookie } from "cookies-next";
import { LoadingSpinner } from "@live-config/images";

const LoginPage = () => {
  const initialData = {
    username: "",
    password: "",
  };
  const router = useRouter();
  const [form, setForm] = useState<Auth>(initialData);
  const [dataUser, setData] = useState<ResponseUsersAuth[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await APIAuth.Login(form);
      setData(data);

      if (data.length === 0) {
        return ErrorAlert("Gagal", "Gagal Melakukan Login");
      }

      const userRoles = data[0].roles;
      const userId = data[0].id;
      setCookie("user_id", userId);
      if (userRoles === "user") {
        SuccessAlert(
          "Login Berhasil",
          "Anda Akan diarahkan ke halaman terkait"
        ).then(() => {
          router.push("/home");
        });
      } else {
        SuccessAlert(
          "Login Berhasil",
          "Anda Akan diarahkan ke halaman terkait"
        ).then(() => {
          router.push("/cms/dashboard");
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      ErrorAlert("Gagal", "Gagal Melakukan Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center">
      <div className="mx-auto max-w-md grow">
        <Card ClassNames="rounded-xl">
          <h1 className="text-center font-bold my-5 text-2xl">LOGIN</h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-slate-500"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-slate-500"
                id="password"
                name="password"
                type="password"
                placeholder="***********"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-700 flex justify-center text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "Sign in"}
              </button>
              <h5 className="my-3 text-center">
                Dont have an account?
                <Link
                  href={"/auth/register"}
                  className="text-blue-500 font-bold"
                >
                  Register
                </Link>
              </h5>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
