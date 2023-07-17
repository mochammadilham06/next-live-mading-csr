"use client";
import APIAdmin from "@live-api/Admin/admin.api";
import { ErrorAlert } from "@live-component/Alert/AlertError";
import { SuccessAlert } from "@live-component/Alert/AlertSuccess";
import { ArrowDownIcon, EditIcon } from "@live-config/images";
import React, { FormEvent, Fragment, useState } from "react";
const ModalValidation = ({ formData, onUpdateSuccess }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [validation, setValidation] = useState<boolean>(formData?.validation);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value === "true";
    setValidation(selectedValue);
  };
  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await APIAdmin.UpdateValidation(formData?.id, validation);
      console.log(res);
      SuccessAlert("Complete", "Update Complete");
      setShowModal(false);
      onUpdateSuccess();
    } catch (error) {
      ErrorAlert("Failed", "Update Failed");
      console.log(error);
    }
  };
  return (
    <Fragment>
      <button onClick={handleOpenModal}>
        <EditIcon />
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="font-bold text-2xl">Update Validasi Content</h2>
              <button className="close-button" onClick={handleCloseModal}>
                X
              </button>
            </div>
            <div className="modal-body ">
              <form className="space-y-2" onSubmit={handleSaveChanges}>
                <div>
                  <h3 className="mb-5 font-medium text-lg">Ubah Status</h3>
                  <div className="flex w-full">
                    <div className=" relative inline-flex self-center">
                      <ArrowDownIcon />
                      <select
                        value={validation.toString()}
                        onChange={handleChange}
                        className="text-base font-bold rounded border-2 border-blue-700 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                      >
                        <option value="true">Show Content</option>
                        <option value="false">Dont Show</option>
                        {/* <option value="true" disabled={validation}>
                          Show Content
                        </option>
                        <option value="false" disabled={!validation}>
                          Dont Show
                        </option> */}
                      </select>
                    </div>
                  </div>
                </div>
                <button className="save-button" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalValidation;
