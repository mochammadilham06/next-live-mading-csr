"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../page";
import Card from "@live-component/Card";
import { EditIcon, EyeIcon } from "@live-config/images";
import { ValidationContent } from "src/interface/validation";
import APIAdmin from "@live-api/Admin/admin.api";
import TheadContent from "./thead";
import ModalSeeDetail from "@live-component/ModalCMS";
import { SkeletonCard } from "@live-component/Skeleton";
import ModalValidation from "@live-component/ModalCMS/validation";

const ContentValidation = () => {
  const [content, setContent] = useState<ValidationContent[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await APIAdmin.GetAllContent();
      setContent(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        Dashboard/Content Validation
      </h3>
      <Card>
        <p className="text-sm text-slate-900">{content?.length} Record Found</p>
        {/* component */}
        {loading ? (
          <div className="mt-5">
            <SkeletonCard isImage={false} />
          </div>
        ) : (
          <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <TheadContent />
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {content?.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4">{item?.post_user.fullname}</td>
                    <td className="px-6 py-4">{item?.post_user?.username}</td>
                    <td className="px-6 py-4">{item?.content}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {item?.validation ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                            Validate
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                            Not Validate
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <ModalSeeDetail formData={item} />
                        <ModalValidation
                          formData={item}
                          onUpdateSuccess={handleUpdateSuccess}
                        />
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

export default ContentValidation;
