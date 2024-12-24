import { FaRegEdit } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { distanceBetweenTwoDates } from "../../utils";
import { useSocketContext } from "../../context";
import { Avatar } from "@chakra-ui/react";
import { useConversations, useOpenConversation } from "../../zustand";
import { getRoute, MESSAGE_DETAIL_KEY } from "../../helpers/constants";

export default function Conversations() {
  const param = useParams();
  const { user } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const navigate = useNavigate();
  const { setIsOpenConversation } = useOpenConversation();
  const { conversations } = useConversations();
  function openForm() {
    setIsOpenConversation(true);
  }

  function checkSomeParticipantsIsOnline(conversation: any) {
    for (let i = 0; i < conversation.participants.length; i++) {
      if (onlineUsers.includes(conversation.participants[i]._id)) {
        return true;
      }
    }
    return false;
  }
  return (
    <>
      {/* <!-- Conversations List --> */}
      {
        <div className="flex flex-col w-[396px] h-full bg-white border-r border-gray-200 pt-7">
          <div className="flex justify-between ps-6">
            <div className="flex py-2">
              <h2 className="font-bold text-[20px]">
                {user && typeof user !== "string" ? user?.username : ""}
              </h2>
              <GoChevronDown className="ms-1 my-auto" />
            </div>
            <button className="flex me-8 my-auto px-2 py-2" onClick={openForm}>
              <FaRegEdit className="w-[24px] h-[24px]" />
            </button>
          </div>
          <div className="pt-5 flex flex-col flex-grow">
            <div className="flex justify-between ps-6">
              <div className="text-[16px] font-bold mb-4">Messages</div>
              <div className="text-[15px] font-medium mb-4 text-[#65676b] my-auto me-[20px]">
                Requests
              </div>
            </div>
            <div className="overflow-y-scroll flex-grow">
              {conversations?.map((conversation: any) => {
                return (
                  <div
                    className={`flex items-center space-x-4 ${
                      param.id === conversation._id
                        ? "bg-[rgb(239,239,239)]"
                        : ""
                    } hover:bg-[rgb(239,239,239)] ps-6 py-[6px] cursor-pointer`}
                    onClick={function (e) {
                      e.preventDefault();
                      navigate(
                        getRoute(MESSAGE_DETAIL_KEY, {
                          param: {
                            id: conversation._id,
                          },
                        }).path
                      );
                    }}
                  >
                    <div className="relative w-14 h-14">
                      {conversation.participants.length >= 3 ? (
                        <div className="absolute top-3 left-2">
                          <Avatar
                            src={conversation.participants[0]?.profile.avatar}
                            className={`rounded-full z-10 ${
                              conversation.participants.length >= 2
                                ? "w-11 h-11"
                                : "w-14 h-14"
                            }`}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="absolute top-1 -left-2">
                        <Avatar
                          src={conversation.participants[1]?.profile.avatar}
                          className={`z-[2] w-11 h-11 rounded-full ${
                            conversation.participants.length >= 2
                              ? ""
                              : "ml-[10px]"
                          } `}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-[14px]">
                        {conversation.participants[0]?.profile.fullName +
                          (conversation.participants[1]?.profile.fullName
                            ? `, ${conversation.participants[1]?.profile.fullName}`
                            : "")}
                      </h4>
                      <p className="mt-[3px] text-gray-500 text-[13px]">
                        {checkSomeParticipantsIsOnline(conversation)
                          ? "🟢 Online"
                          : conversation.participants[0].latestOnlineAt
                          ? `Active ${distanceBetweenTwoDates(
                              new Date(Date.now()),
                              new Date(
                                conversation.participants[0].latestOnlineAt
                              )
                            )}`
                          : " "}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    </>
  );
}
