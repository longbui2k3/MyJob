import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/global";

interface CoverProps {
  children?: string | JSX.Element;
}

export default function Cover({ children }: CoverProps) {
  return (
    <div className="w-full">
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
}
