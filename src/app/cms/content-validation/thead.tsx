import React from "react";

const TheadContent = () => {
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
          Username
        </th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
          Content
        </th>

        <th scope="col" className="px-6 py-4 font-medium text-gray-900">
          Validation
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

export default TheadContent;
