import { Button } from "@chakra-ui/react";
import { GrLinkNext } from "react-icons/gr";
import { LiaCheckDoubleSolid } from "react-icons/lia";

export default function CompletedCompany() {
  return (
    <div className="flex flex-col items-center space-y-4 pt-20">
      <div className="flex items-center justify-center size-32 bg-primary-50 rounded-full">
        <LiaCheckDoubleSolid size={40} color="var(--primary-500)" />
      </div>
      <h1 className="font-medium text-2xl">
        🎉 Congratulations, You profile is 100% complete!
      </h1>
      <p className="w-[50%] font-normal text-base text-gray-400 text-center">
        Donec hendrerit, ante mattis pellentesque eleifend, tortor urna
        malesuada ante, eget aliquam nulla augue hendrerit ligula. Nunc mauris
        arcu, mattis sed sem vitae.
      </p>
      <div>
        <Button
          textColor={"var(--primary-500)"}
          bg={"var(--primary-50)"}
          className="mr-3"
        >
          View Dashboard
        </Button>
        <Button
          textColor={"white"}
          bg={"var(--primary-500)"}
          rightIcon={<GrLinkNext />}
        >
          Post Job
        </Button>
      </div>
    </div>
  );
}
