import { useSelector } from "react-redux";

export default function PersonalInformation() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="personal_information" className="flex flex-col gap-1">
      {/* <InputIcon
        Icon={MdOutlineLocalPhone}
        placeholder="Phone number"
        value={state?.phone}
      />
      <InputIcon Icon={TfiEmail} placeholder="Email" value={state?.email} />
      <InputIcon
        Icon={CiLocationOn}
        placeholder="Location"
        value={state?.location}
      />
      <InputIcon
        Icon={MdInfo}
        placeholder="Information"
        value={state?.information}
      /> */}
    </div>
  );
}
