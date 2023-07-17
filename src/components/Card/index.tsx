import { ReactElement } from "react";

type CardProps = {
  children: ReactElement;
  ClassNames: string;
  isPadding?: boolean;
};
export default function Card({ children, ClassNames, isPadding = true }: any) {
  return (
    <div
      className={`bg-white shadow-md rounded-md shadow-grey-300 mb-4 ${ClassNames} ${
        isPadding ? "p-4" : ""
      }`}
    >
      {children}
    </div>
  );
}
