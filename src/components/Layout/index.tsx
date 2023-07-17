import Navigation from "@live-component/Navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children, hiddenNavigation, props }: any) {
  let rightColumnClasses = "";
  if (hiddenNavigation) {
    rightColumnClasses += "w-full";
  } else {
    rightColumnClasses += "mx-4 md:mx-0 md:w-9/12";
  }
  return (
    <main className="md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0">
      {!hiddenNavigation && (
        <div className="fixed md:static w-full bottom-0 md:w-3/12 -mb-5 z-30">
          <Navigation props={props} />
        </div>
      )}
      <div className={rightColumnClasses}>{children}</div>
    </main>
  );
}
