import { useEffect, useState } from "react";
import {
  useConversation,
  useConversations,
  useOpenConversation,
  useOpenConversationInformation,
  useOpenNavigateMoreMessage,
} from "../../zustand";
import { GetAllConversationsAPI } from "../../apis";
import {
  ConversationInformation,
  Conversations,
  FormCreateConversation,
  NavigateMoreMessage,
} from "../../components/messages";

export default function PageMessage({ children }) {
  const { isOpenConversation } = useOpenConversation();
  const { isOpenConversationInformation } = useOpenConversationInformation();
  const { conversation } = useConversation();
  const { setConversations } = useConversations();
  const [isLoading, setIsLoading] = useState(true);
  const {
    isOpenNavigateMoreMessage,
    setIsOpenNavigateMoreMessage,
    top,
    left,
    selectedMessage,
    isRight,
  } = useOpenNavigateMoreMessage();
  useEffect(() => {
    function handleClickOutside(event) {
      const messageMore = document.getElementById(
        `messageMore_${selectedMessage?._id}`
      );
      const navigateMoreMessage = document.getElementById(
        "navigate__more__message"
      );
      if (
        navigateMoreMessage &&
        !navigateMoreMessage.contains(event.target) &&
        messageMore &&
        !messageMore.contains(event.target)
      ) {
        setIsOpenNavigateMoreMessage(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedMessage, setIsOpenNavigateMoreMessage]);

  useEffect(() => {
    window.addEventListener("wheel", () => setIsOpenNavigateMoreMessage(false));
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await GetAllConversationsAPI();
      if (data.status === 200) {
        setConversations(data.metadata.conversations);
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) return "";
  return (
    <div
      className="bg-gray-50 flex h-screen relative"
      style={{ height: "calc(100vh - 120px)" }}
    >
      {isOpenConversation ? <FormCreateConversation /> : ""}
      {/* <!-- Main Content --> */}
      <div className="flex-grow flex flex-col overflow-hidden h-full">
        {/* <!-- Messages Container --> */}
        <div className="flex flex-1 h-full">
          <Conversations />
          {children}
        </div>
      </div>
      {isOpenConversationInformation ? (
        <ConversationInformation conversation={conversation} />
      ) : (
        ""
      )}
      <NavigateMoreMessage
        className={`absolute ${
          !isOpenNavigateMoreMessage ? "hidden" : ""
        } w-[200px] bg-white rounded-lg`}
        style={{
          top: `${Math.floor(top - 200)}px`,
          left: `${Math.floor(left) - (isRight ? 200 - 32 : 0)}px`,
        }}
        message={selectedMessage}
      />
    </div>
  );
}
