"use client";
import APIAdmin from "@live-api/Admin/admin.api";
import { ErrorAlert } from "@live-component/Alert/AlertError";
import { SuccessAlert } from "@live-component/Alert/AlertSuccess";
import { EditIcon } from "@live-config/images";
import React, { FormEvent, Fragment, useState } from "react";
import { GetAllUser } from "src/interface/user-management";
interface GetUserProps {
  formData: GetAllUser;
  onUpdateSuccess: () => void;
}
const ModalUserManagement = ({ formData, onUpdateSuccess }: GetUserProps) => {
  const initialState = {
    id: formData.id,
    gender: formData.gender || "",
    fullname: formData.fullname || "",
    images: formData.images || "",
    cover: formData.cover || "",
    address: formData.address || "",
    username: formData.username || "",
  };
  const [form, setForm] = useState<GetAllUser>(initialState);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      username: form.username,
      fullname: form.fullname,
      address: form.address,
      gender: form.gender,
      images: form.images,
    };
    try {
      const res = await APIAdmin.UpdateUser(form?.id, body);
      console.log(res);
      SuccessAlert("Complete", "Update Complete");
      setShowModal(false);
      onUpdateSuccess();
    } catch (error) {
      ErrorAlert("Failed", "Update Failed");
      console.log(error);
    }
  };
  console.log(form);
  return (
    <Fragment>
      <button onClick={handleOpenModal}>
        <EditIcon />
      </button>

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
              <form className="w-full max-w-lg" onSubmit={handleSaveChanges}>
                <div className="flex flex-wrap -mx-3 ">
                  <div className="w-full md:w-1/2 px-3 ">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="fullname"
                    >
                      Fullname
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Jane"
                      value={form.fullname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Doe"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-2">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="address"
                  >
                    Addres
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Albuquerque"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="gender"
                      name="gender"
                      onChange={handleChange}
                    >
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="cancel-button" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button className="save-button" type="submit">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalUserManagement;
