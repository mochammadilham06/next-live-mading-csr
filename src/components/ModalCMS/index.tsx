"use client";
import { EyeIcon } from "@live-config/images";
import React, { Fragment, useState } from "react";
const ModalSeeDetail = ({ formData }: any) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <Fragment>
      <button onClick={handleOpenModal}>
        <EyeIcon />
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
                  />
                </div>
                <div className="">
                  {formData?.image ? (
                    <div className="w-1/2 mx-auto">
                      <img
                        src={formData?.image}
                        alt="Image"
                        className="w-full h-full object-contain rounded-md"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                  ) : (
                    <span className="text-gray-500">Tidak ada gambar</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalSeeDetail;
