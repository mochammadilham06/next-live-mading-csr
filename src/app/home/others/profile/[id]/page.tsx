"use client";
import { useEffect, useState } from "react";
import Avatar from "@live-component/Avatar";
import Card from "@live-component/Card";
import Layout from "@live-component/Layout";
import {
  DummyProfile,
  ImageIcon,
  PostIcon,
  ProfileImage,
} from "@live-config/images";
import React from "react";
import GalleryCard from "@live-component/Gallery";
import ContentCardDetail from "@live-component/ContentDetail";
import APIContent from "@live-api/Client/content.api";
import { useSearchParams } from "next/navigation";
import { UserIdResponse } from "src/interface/user";
import Spinner from "@live-component/Spinner";
import Avatar2 from "@live-component/Avatar/avatar2";

const OtherProfile = () => {
  const [data, setData] = useState<UserIdResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const USER_ID = params.get("id");

  const ACTIVE_TABS =
    "bg-socialBlue text-white rounded-md shadow-md shadow-gray-300 font-bold transition-all duration-300";
  const INACTIVE_TABS = "transition-all duration-300";

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const tabs = [
    {
      label: "Post",
      path: "",
      icon: <PostIcon />,
      component: data?.users_posts ? <ContentCardDetail data={data} /> : null,
    },
    {
      label: "Gambar",
      path: "gallery",
      icon: <ImageIcon />,
      component: data?.users_posts ? (
        <GalleryCard data={data.users_posts} />
      ) : null,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const getContentById = async (USER_ID: string | null) => {
    setLoading(true);
    try {
      const response = await APIContent.getContentById(USER_ID);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (USER_ID) {
      getContentById(USER_ID);
    }
  }, [USER_ID]);

  useEffect(() => {
    if (data && data.users_posts) {
      setActiveTab((prevTab) => ({
        ...prevTab,
        component: <ContentCardDetail data={data} />,
      }));
    }
  }, [data]);

  return (
    <Layout>
      <div className="relative overflow-hidden rounded-md">
        {loading ? (
          <Spinner />
        ) : (
          <Card isPadding={false}>
            <div className="h-36 overflow-hidden flex justify-center items-center">
              <img
                src="https://media.istockphoto.com/id/622954584/id/foto/singapore-skyscrapers-kawasan-keuangan-raffles-place.jpg?s=1024x1024&w=is&k=20&c=t7lRA_uSJee3ZKgVr2xLU42HBtKCUcxnMG8oB8bLC7Q="
                alt="images"
              />
            </div>
            <div className="absolute top-20 left-4">
              <Avatar2
                imageUrl={data?.images ? data?.images : DummyProfile}
                isSize="2xl"
                alt="picture"
              />
            </div>

            <div className="p-4">
              <div className="ml-36">
                <h1 className="text-xl font-bold">{data?.fullname}</h1>
                <div className="text-gray-500 leading-4">{data?.address}</div>
              </div>
              <div className="mt-10 flex gap-1 space-x-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.path}
                    onClick={() => handleTabClick(tab)}
                    className={`flex gap-1 items-center px-4 py-2 ${
                      activeTab.label === tab.label
                        ? ACTIVE_TABS
                        : INACTIVE_TABS
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}
        {/* Render content berdasarkan tab aktif */}
        <div>{activeTab.component}</div>
      </div>
    </Layout>
  );
};

export default OtherProfile;
