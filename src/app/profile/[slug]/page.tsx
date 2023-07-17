"use client";
import { useState } from "react";
import Avatar from "@live-component/Avatar";
import Card from "@live-component/Card";
import ContentCard from "@live-component/ContentCard";
import Layout from "@live-component/Layout";
import { ImageIcon, PostIcon, ProfileImage } from "@live-config/images";
import React from "react";
import GalleryCard from "@live-component/Gallery";

const Profile = () => {
  const ACTIVE_TABS =
    "bg-socialBlue text-white rounded-md shadow-md shadow-gray-300 font-bold transition-all duration-300";
  const INACTIVE_TABS = "transition-all duration-300";
  const tabs = [
    {
      label: "Post",
      path: "",
      icon: <PostIcon />,
      component: <ContentCard />,
    },
    {
      label: "Gambar",
      path: "gallery",
      icon: <ImageIcon />,
      component: <GalleryCard />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: any) => {
    console.log(tab);
    setActiveTab(tab);
  };

  return (
    <Layout>
      <div className="relative overflow-hidden rounded-md">
        <Card isPadding={false}>
          <div className="h-36 overflow-hidden flex justify-center items-center">
            <img
              src="https://media.istockphoto.com/id/622954584/id/foto/singapore-skyscrapers-kawasan-keuangan-raffles-place.jpg?s=1024x1024&w=is&k=20&c=t7lRA_uSJee3ZKgVr2xLU42HBtKCUcxnMG8oB8bLC7Q="
              alt="images"
            />
          </div>
          <div className="absolute top-20 left-4">
            <Avatar imageUrl={ProfileImage} isSize="2xl" alt="picture" />
          </div>

          <div className="p-4">
            <div className="ml-36">
              <h1 className="text-xl font-bold">Aghes Jhonson</h1>
              <div className="text-gray-500 leading-4">Cianjur, Jawa Barat</div>
            </div>
            <div className="mt-10 flex gap-1 space-x-3">
              {tabs.map((tab) => (
                <button
                  key={tab.path}
                  onClick={() => handleTabClick(tab)}
                  className={`flex gap-1 items-center px-4 py-2 ${
                    activeTab.label === tab.label ? ACTIVE_TABS : INACTIVE_TABS
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
        {/* Render content berdasarkan tab aktif */}
        <div>{activeTab.component}</div>
      </div>
    </Layout>
  );
};

export default Profile;
