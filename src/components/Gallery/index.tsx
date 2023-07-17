import Card from "@live-component/Card";
import { Buildings } from "@live-config/images";
import Image from "next/image";
import React, { FC, Fragment } from "react";
import { Post } from "src/interface/user";

const GalleryCard = ({ data }: any) => {
  return (
    <Card>
      {data.length !== 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {data?.map((item: Post) => (
            <Fragment key={item.id}>
              {item?.image ? (
                <div
                  key={item.id}
                  className="rounded-md overflow-hidden flex items-center h-48 shadow-md"
                >
                  {/* <img
              src={item.image}
              alt="photos"
              className="object-cover object-center w-full h-full"
            /> */}

                  <Image
                    src={item.image}
                    priority={true}
                    alt=""
                    width={500}
                    height={300}
                  />
                </div>
              ) : undefined}
            </Fragment>
          ))}
        </div>
      ) : (
        <h1 className="text-center font-bold text-2xl">
          You Dont have a content :(
        </h1>
      )}
    </Card>
  );
};

export default GalleryCard;
