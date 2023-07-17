"use client";
import APIContent from "@live-api/Client/content.api";
import { ErrorAlert } from "@live-component/Alert/AlertError";
import { SuccessAlert } from "@live-component/Alert/AlertSuccess";
import { storage } from "@live-config/firebase";
import { DeleteIcon, MoreIcon, UpdateIcon } from "@live-config/images";
import { getCookie } from "cookies-next";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
interface ModeToggle {
  mode?: "detail" | "normal";
  items?: any;
  onSuccess?: any;
}
const ToggleButton = ({ items, mode, onSuccess }: ModeToggle) => {
  console.log(items);
  const PARAMS_ID = getCookie("user_id");
  const initialData = {
    user_id: mode === "normal" ? items?.post_user.id : PARAMS_ID,
    image: mode === "normal" ? items?.image : items?.image,
    content: mode === "normal" ? items?.content : items?.content,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [uploading, setUploading] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await APIContent.deleteContent(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          onSuccess();
          return res;
        } catch (error) {
          ErrorAlert("Error", "Failed to Delete data");
        }
      }
    });
  };
  const handleUpdate = (data: any) => {
    setShowModal(true);
    console.log(data);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      const res = await APIContent.updateContent(items?.id, formData);
      console.log(res);
      SuccessAlert("Complete", "Update Complete");
      setFormData(initialData);
      setShowModal(false);
      onSuccess();
    } catch (error) {
      ErrorAlert("Failed", "Update Failed");
      console.log(error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: any) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    const storageRef = ref(
      storage,
      `user-${items?.post_user.id}/post/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    uploadTask.on("state_changed", async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setFormData((prevState) => ({
          ...prevState,
          image: downloadURL,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    });
  };
  // console.log(formData);
  return (
    <>
      <div
        className={`popover ${isOpen ? "active" : ""}`}
        onClick={togglePopover}
      >
        <button className="popover-trigger">
          <MoreIcon />
        </button>
        <div className="relative" ref={popoverRef}>
          {isOpen && (
            <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52 z-50">
              <button
                onClick={() => handleUpdate(items)}
                className="flex w-full gap-3 py-2 my-2 hover:bg-socialBlue hover:bg-opacity-70 hover:text-white px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
              >
                <UpdateIcon />
                Update
              </button>
              <button
                onClick={() => handleDelete(items?.id)}
                className="flex w-full gap-3 py-2 my-2 hover:bg-socialBlue hover:bg-opacity-70 hover:text-white px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
              >
                <DeleteIcon />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="font-bold">Update Content</h2>
              <button className="close-button" onClick={handleCloseModal}>
                X
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <label htmlFor="content" className="font-medium">
                    Content :
                  </label>
                  <textarea
                    className="w-full p-3 h-20"
                    name="content"
                    id="content"
                    value={formData?.content}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <input
                    className="hidden"
                    type="file"
                    id="images"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label
                    className="w-full h-32 flex items-center justify-center border  rounded-md cursor-pointer"
                    htmlFor="images"
                  >
                    {formData?.image ? (
                      <img
                        src={formData?.image}
                        alt="Preview"
                        className="h-full"
                      />
                    ) : (
                      <span className="text-gray-500">Pilih Gambar</span>
                    )}
                  </label>
                </div>
                {/* <div>
                  {uploading ? (
                    <SkeletonCard isImage={true} />
                  ) : (
                    formData.image && (
                      <div className="w-1/2">
                        <img
                          src={items?.image}
                          alt="Image"
                          className="w-full h-full object-contain rounded-md"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </div>
                    )
                  )}
                </div> */}
                {/* <div className="my-3">
                  <label
                    htmlFor="image-upload"
                    className="flex gap-1 font-medium cursor-pointer"
                  >
                    <span className="text-green-600">
                      <ImageIcon />
                    </span>
                    {items?.image ? "Change Picture" : "Add Picture"}
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div> */}
              </form>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToggleButton;
