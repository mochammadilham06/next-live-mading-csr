"use client";
import React, { useState } from "react";
import Link from "next/link";
import Card from "@live-component/Card";
import APIAuth from "@live-api/Client/auth.api";
import { SuccessAlert } from "@live-component/Alert/AlertSuccess";
import { ErrorAlert } from "@live-component/Alert/AlertError";
import { useRouter } from "next/navigation";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    gender: "",
    address: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await APIAuth.Register(formData);
      SuccessAlert("Success", "Registration Successful").then(() => {
        router.push("/auth/login");
      });
    } catch (error) {
      ErrorAlert("Error", "Failed to register");
    }
  };
  console.log(formData);
  return (
    <div className="flex h-screen items-center">
      <div className="mx-auto max-w-md grow">
        <Card ClassNames="rounded-xl">
          <h1 className="text-center font-bold my-5 text-2xl">REGISTER</h1>
          <form className="space-y-3" onSubmit={handleSubmit}>
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
                required
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Fullname
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-slate-500"
                id="fullname"
                required
                type="text"
                name="fullname"
                placeholder="Fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Gender
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-slate-500"
                id="address"
                required
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
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
                required
                type="password"
                name="password"
                placeholder="***********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
              <h5 className="my-3 text-center">
                Already have an account?{" "}
                <Link href={"/auth/login"} className="text-blue-500 font-bold">
                  Login
                </Link>
              </h5>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
