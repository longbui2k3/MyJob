import { ButtonOutline, ButtonSolid } from "../buttons";
import { SearchInput_1 } from "../inputs";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center w-full h-[80px] px-[240px]">
        <div className="flex justify-between">
          <div className="flex space-x-8">
            <a href="/">
              <Logo />
            </a>
            <SearchInput_1 />
          </div>
          <div className="flex space-x-2">
            <a href="/signin">
              <ButtonOutline children={"Sign In"} />
            </a>
            <ButtonSolid children={"Post A Job"} />
          </div>
        </div>
      </div>
    </>
  );
}
