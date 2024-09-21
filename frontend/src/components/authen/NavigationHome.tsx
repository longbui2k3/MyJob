import { Logo } from "../global";

interface NavigationProps {
  isCenter?: boolean;
}

export default function NavigationHome({ isCenter = false }: NavigationProps) {
  return (
    <div
      className={`absolute flex flex-col justify-center h-[80px] ${
        isCenter ? "w-full" : "w-[100vh]"
      }`}
    >
      <div
        className={`w-full flex ${isCenter ? "justify-center" : "ml-[220px]"}`}
      >
        <a href="/">
          <Logo />
        </a>
      </div>
    </div>
  );
}
