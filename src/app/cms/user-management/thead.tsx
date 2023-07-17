import React from "react";

const THeadUserManagement = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
          No
        </th>

        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
          Full Name
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
          Gender
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
          Address
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
          Username
        </th>
        <th
          scope="col"
          className="px-6 py-4 font-medium text-gray-900 text-center"
        >
          Action
        </th>
      </tr>
    </thead>
  );
};

export default THeadUserManagement;
