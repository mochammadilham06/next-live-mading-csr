import { FC, Fragment } from "react";
type SkeletonType = {
  isImage?: boolean;
};

export const SkeletonCard: FC<SkeletonType> = ({ isImage }) => {
  return (
    <Fragment>
      {isImage ? (
        <div className="flex w-full flex-1 flex-col">
          <div className="w-1/2 animate-pulse flex-row items-center justify-center rounded-xl border p-6 ">
            <div className="flex flex-col space-y-2 items-center">
              <svg
                className="w-24 h-24 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col">
          <div className="w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-md border p-6 ">
            <div className="flex flex-col space-y-2">
              <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
              <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
