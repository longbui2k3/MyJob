import { useNavigate } from "react-router-dom";
import { useHeaderConversation } from "../../hooks";
import { Avatar } from "@chakra-ui/react";

export default function HeaderMessages({ conversation }) {
  const navigate = useNavigate();
  const { name, username, avatar1, avatar2 } =
    useHeaderConversation(conversation);
  return (
    <div className="p-4 mb-7">
      <div className="flex flex-col items-center">
        <div
          className={`mt-3 relative z-4 w-[80px] ${
            conversation.participants.length >= 3 ? "h-[110px]" : "h-[90px]"
          }`}
        >
          <div
            className={`${
              conversation.participants.length >= 3
                ? "absolute top-3 left-6 mt-4 ml-4"
                : ""
            }`}
          >
            <Avatar
              src={avatar1}
              size={"lg"}
              className={`w-[120px] h-[120px] rounded-full mb-4 z-[4] `}
            />
          </div>
          {avatar2 ? (
            <div className="absolute -top-3 -left-5">
              <Avatar
                size="lg"
                src={avatar2}
                className={`w-[120px] h-[120px] rounded-full z-[2]`}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <h4 className="text-[22px] font-semibold">{name}</h4>
        <p className="text-gray-500 text-[14px]">
          {username !== "" ? username + " . " : ""} My Job
        </p>
      </div>
    </div>
  );
}
