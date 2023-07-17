import ContentCard from "@live-component/ContentCard";
import FormCard from "@live-component/FormCard";
import Layout from "@live-component/Layout";
import CONST from "@live-util/constant";
import React from "react";
import { cookies } from "next/headers";
const HomePage = async () => {
  const cookieStore = cookies();
  const USERID = cookieStore.get("user_id");
  const { data: userData } = await getUserInfo(USERID?.value);
  return (
    <Layout props={userData}>
      <FormCard userData={userData} />
      <ContentCard userData={userData} />
    </Layout>
  );
};

export default HomePage;
async function getUserInfo(UserId: any) {
  const res = await fetch(
    `https://works-project.hasura.app/api/rest/user/${UserId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": `0SwWGQ0TgVvMh2qJRz940Z5QePsofSfk1TJjLT1sX0I5pk71WO8O5Sdn0ANlgSvk`,
      },
    }
  );
  return res.json();
}
