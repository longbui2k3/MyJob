import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { MdInfo, MdOutlineLocalPhone } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { useSelector } from "react-redux";

export default function PersonalInformation() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="personal_information">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <MdOutlineLocalPhone size={13} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Phone number"
          value={state?.phone || ""}
          border={"0px"}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <TfiEmail size={13} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Email"
          value={state?.email || ""}
          border={"0px"}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CiLocationOn size={13} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Location"
          value={state?.location || ""}
          border={"0px"}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <MdInfo size={13} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Information"
          value={state?.information || ""}
          border={"0px"}
        />
      </InputGroup>
    </div>
  );
}
