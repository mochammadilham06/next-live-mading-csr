import React from "react";
import AdminLayout from "../page";
import Card from "@live-component/Card";
import { UserCountIcon, ValidatekIcon, XMarkIcon } from "@live-config/images";

const Dashboard = async () => {
  const { data: userData } = await getDataUser();
  const { data: contentData } = await getContentUser();
  const countValidations = (validationStatus: boolean) => {
    return contentData.filter(
      (item: any) => item.validation === validationStatus
    ).length;
  };
  return (
    <AdminLayout>
      <h3 className="text-xl font-bold text-gray-400 my-5">Dashboard</h3>
      <Card>
        <div className="flex gap-5 flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
            <UserCountIcon />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                Users Count
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 text-lg">
              {userData?.length} User active
            </p>
          </div>
          <div className="w-full lg:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
            <ValidatekIcon />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                Validate Content
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 text-lg">
              {countValidations(true)} Validated Contents
            </p>
          </div>
          <div className="w-full lg:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
            <XMarkIcon />
            <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                Not Validate Content
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-500 text-lg">
              {countValidations(false)} Not Valdated Contents
            </p>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default Dashboard;

async function getContentUser() {
  try {
    const res = await fetch(`https://works-project.hasura.app/api/rest/post`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": `0SwWGQ0TgVvMh2qJRz940Z5QePsofSfk1TJjLT1sX0I5pk71WO8O5Sdn0ANlgSvk`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
async function getDataUser() {
  try {
    const res = await fetch(
      `https://works-project.hasura.app/api/rest/cms/user`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": `0SwWGQ0TgVvMh2qJRz940Z5QePsofSfk1TJjLT1sX0I5pk71WO8O5Sdn0ANlgSvk`,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
