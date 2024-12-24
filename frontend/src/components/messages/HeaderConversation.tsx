import { ImInfo } from "react-icons/im";
import { RiVideoOnLine } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";
import { FaCircleInfo } from "react-icons/fa6";
import { IconType } from "react-icons";
import { useHeaderConversation } from "../../hooks";
import { useOpenConversationInformation } from "../../zustand";
import { Avatar } from "@chakra-ui/react";
function Button(body: { Icon: IconType; onClick: (e) => void }) {
  return (
    <button className="w-12 h-12 my-auto px-2 py-2" onClick={body.onClick}>
      <body.Icon className="w-6 h-6 mx-auto" />
    </button>
  );
}
export default function HeaderConversation(body: { conversation: any }) {
  const { state, name, avatar1, avatar2 } = useHeaderConversation(
    body.conversation
  );
  const { setIsOpenConversationInformation, isOpenConversationInformation } =
    useOpenConversationInformation();
  return (
    <div className="top-0 px-4">
      <div
        className={`flex justify-between border-b border-gray-200 ${
          body.conversation?.participants.length >= 3 ? "py-2" : "py-4"
        }`}
      >
        <div className="relative flex">
          <div>
            <Avatar
              src={avatar1}
              className={`w-12 h-12 rounded-full z-10 ${
                body.conversation?.participants.length >= 3 ? "mt-3 ml-3" : ""
              }`}
            />
          </div>
          {body.conversation?.participants.length >= 3 ? (
            <div className="absolute -left-1">
              <Avatar src={avatar2} className={`w-12 h-12 rounded-full z-2`} />
            </div>
          ) : (
            ""
          )}

          <div className="ms-[15px] my-auto">
            <div className="text-[16px] font-bold">{name}</div>
            <p className="text-[13px] text-gray-500">{state}</p>
          </div>
        </div>

        <div className="flex">
          <Button Icon={TbPhoneCall} onClick={() => {}} />
          <Button Icon={RiVideoOnLine} onClick={() => {}} />
          {!isOpenConversationInformation ? (
            <Button
              Icon={ImInfo}
              onClick={() => {
                setIsOpenConversationInformation(
                  !isOpenConversationInformation
                );
              }}
            />
          ) : (
            <Button
              Icon={FaCircleInfo}
              onClick={() => {
                setIsOpenConversationInformation(
                  !isOpenConversationInformation
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
