"use client";
import Card from "@live-component/Card";
import { HomeIcon, LogoutIcon, UserIcon } from "@live-config/images";
import STYLES from "@live-util/active_constant";
import React, { Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import Swal from "sweetalert2";
const Navigation = ({ props }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    return Swal.fire({
      title: "Want to Logout?",
      text: "You will redirect to Login Page",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCookie("user_id");
        Swal.fire("Logout Complete", "Redirect to Login page", "success").then(
          () => {
            router.push("/auth/login");
          }
        );
      }
    });
  };
  return (
    <Fragment>
      <Card isPadding={false}>
        <div className="px-4 py-2 flex justify-between md:block shadow-md shadow-gray-500 md:shadow-none">
          <h2 className="text-gray-400 mb-3 hidden md:block">Navigation</h2>
          <Link
            href="/home"
            className={`${
              pathname === "/home" ? STYLES.ACTIVE : STYLES.NOT_ACTIVE
            }`}
          >
            <HomeIcon />
            <span className="hidden md:block">Home</span>
          </Link>
          <Link
            href={{
              pathname: `/home/profile/${props?.fullname}`,
              query: { id: props?.id },
            }}
            className={`${
              pathname.startsWith("/home/profile/")
                ? STYLES.ACTIVE
                : STYLES.NOT_ACTIVE
            }`}
          >
            <UserIcon />

            <span className="hidden md:block">Info</span>
          </Link>

          <div
            className={`${STYLES.NOT_ACTIVE} cursor-pointer`}
            onClick={handleLogout}
          >
            <LogoutIcon />
            <span className="hidden md:block">Logout</span>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default Navigation;
