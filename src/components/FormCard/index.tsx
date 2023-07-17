"use client";
import Card from "@live-component/Card";
import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";
import "./post.css";
import Avatar from "@live-component/Avatar";
import { DummyProfile, ImageIcon } from "@live-config/images";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@live-config/firebase";
import { SkeletonCard } from "@live-component/Skeleton";
import APIContent from "@live-api/Client/content.api";
import { SuccessAlert } from "@live-component/Alert/AlertSuccess";
const FormCard = ({ userData }: any) => {
  const initialData = {
    user_id: userData?.id,
    image: "",
    content: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [uploading, setUploading] = useState(false);

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

    //  if (!file) return;
    //  const allowedTypes = ["image/png", "image/jpeg"];
    //  const allowedSize = 100 * 1024; // 100 KB

    // Validate file type
    //  if (!allowedTypes.includes(file.type)) {
    //    alert("Tipe file yang diperbolehkan hanya PNG dan JPG.");
    //    return;
    //  }

    //  // Validate file size
    //  if (file.size > allowedSize) {
    //    alert("Ukuran file melebihi batas maksimal 100 KB.");
    //    return;
    //  }

    const storageRef = ref(storage, `user-${userData?.id}/post/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    uploadTask.on("state_changed", async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // if (form.images.length !== 0) {
        //   const previousImageRef = ref(storage, `files/${form.images}`);
        //   await deleteObject(previousImageRef);
        // }
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await APIContent.postContent(formData);
      SuccessAlert(
        "Success Create Content",
        "Content is under validation admin, just wait until validation is complete"
      );
      setFormData(initialData);
    } catch (error) {
      console.log(error);
    }
    // setFormData(initialData);
  };
  return (
    <Fragment>
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-1">
            <Avatar
              imageUrl={userData?.images ? userData?.images : DummyProfile}
              alt={"User"}
              isSize="md"
              className="shrink-0"
            />
            <div className="flex flex-col w-full gap-3">
              <textarea
                className="grow p-3 h-20"
                placeholder={`Whats on your mind, ${userData?.fullname}?`}
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
              {uploading ? (
                <SkeletonCard isImage={true} />
              ) : (
                formData.image && (
                  <div className="w-1/2 max-h-40">
                    <img
                      src={formData.image}
                      alt="Image"
                      className="w-full h-full object-contain rounded-md"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex gap-5 items-center mt-3 ml-10">
            <div>
              <label
                htmlFor="image-upload"
                className="flex gap-1 font-medium cursor-pointer"
              >
                <span className="text-green-600">
                  <ImageIcon />
                </span>
                Foto
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div className="grow text-right">
              <button
                type="submit"
                className="bg-socialBlue text-white px-6 py-1 rounded-md"
              >
                Share
              </button>
            </div>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default FormCard;
