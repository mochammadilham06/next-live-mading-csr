"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "../page";
import Card from "@live-component/Card";
import { EditIcon, TrashIcon } from "@live-config/images";
import THeadUserManagement from "./thead";
import APIAdmin from "@live-api/Admin/admin.api";
import { GetAllUser } from "src/interface/user-management";
import { SkeletonCard } from "@live-component/Skeleton";
import Swal from "sweetalert2";
import { ErrorAlert } from "@live-component/Alert/AlertError";
import { SuccessAlert } from "@live-component/Alert/AlertSuccess";
import ModalUserManagement from "@live-component/ModalCMS/user-management";

const UserManagement = () => {
  const [content, setContent] = useState<GetAllUser[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await APIAdmin.GetAllUsers();
      setContent(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#79827b",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await APIAdmin.DeleteUser(id);
          SuccessAlert("Deleted!", "Your file has been deleted.");
          handleUpdateSuccess();
          return res;
        } catch (error) {
          ErrorAlert("Error", "Failed to Delete data");
        }
      }
    });
  };
  const handleUpdateSuccess = () => {
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <AdminLayout>
      <h3 className="text-xl font-bold text-gray-400 my-5">
        Dashboard/Users Management
      </h3>
      <Card>
        <p className="text-sm text-slate-900">{content?.length} Record Found</p>
        {loading ? (
          <SkeletonCard isImage={false} />
        ) : (
          <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <THeadUserManagement />
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {content?.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4">{item?.fullname}</td>
                    <td className="px-6 py-4">{item?.gender}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                          {item?.address}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item?.username}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <ModalUserManagement
                          formData={item}
                          onUpdateSuccess={handleUpdateSuccess}
                        />
                        <button onClick={() => handleDelete(item.id)}>
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
};

export default UserManagement;
