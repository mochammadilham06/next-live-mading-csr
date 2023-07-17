import React, { Fragment } from "react";
import Avatar from "@live-component/Avatar";
import Card from "@live-component/Card";
import { DummyProfile, ProfileImage } from "@live-config/images";
import Link from "next/link";
import "./contentCard.css";
import ToggleButton from "@live-component/Toggle";
import CommentCard from "@live-component/Comments";
import { Post } from "src/interface/user";
import Image from "next/image";
import Avatar2 from "@live-component/Avatar/avatar2";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
const ContentCardDetail = ({ data }: any) => {
  const params = useSearchParams();
  const USER_ID = params.get("id");
  const PARAMS_ID = getCookie("user_id");
  console.log(data?.users_posts?.map((val: any) => val.content));
  return (
    <Fragment>
      {data?.users_posts?.length !== 0 ? (
        data?.users_posts?.map((items: Post) => (
          <Card key={items?.id}>
            <div className="flex gap-3">
              <Link href={"#"} className="hover:cursor-pointer">
                <Avatar2
                  imageUrl={data?.images ? data?.images : DummyProfile}
                  alt={"User"}
                />
              </Link>
              <div className="flex justify-between grow">
                <div>
                  <p>
                    <Link href={"#"} className="font-bold hover:underline">
                      {data?.fullname}{" "}
                    </Link>{" "}
                    Shared a{" "}
                    <Link
                      href={"#"}
                      className="text-socialBlue font-semibold hover:underline"
                    >
                      Content
                    </Link>
                  </p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
                {USER_ID === PARAMS_ID ? (
                  <ToggleButton items={items} mode="detail" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="content-wrapper space-y-3">
              <p className="text-sm my-3">{items.content}</p>
              {items?.image ? (
                <div
                  className="rounded-md overflow-hidden bg-slate-200"
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "56.25%",
                  }}
                >
                  <Image
                    alt="haha"
                    className="object-cover object-center absolute h-full w-full"
                    src={items?.image}
                    fill
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mt-5">
              <CommentCard
                comments={items?.post_comments}
                userData={data}
                postid={items?.id}
              />
            </div>
          </Card>
        ))
      ) : (
        <Card>
          <h1 className="text-center font-bold text-2xl">
            You Dont have a content :(
          </h1>
        </Card>
      )}
    </Fragment>
  );
};

export default ContentCardDetail;
