import { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useConversation, useMessages, usePage } from "../../zustand";
import { FindMessagesByConversationAPI, GetConversationAPI } from "../../apis";
import { concatTwoMessagesWithDay } from "../../utils";
import HeaderConversation from "./HeaderConversation";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

export default function Conversation() {
  const { id } = useParams();
  const { conversation, setConversation } = useConversation();
  const [isLoading, setIsLoading] = useState(true);
  const { messages, setMessages } = useMessages();
  const [hasMore, setHasMore] = useState(true);
  const { setPage } = usePage();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!id) return;
      const [dataConversation, dataMessages] = await Promise.all([
        GetConversationAPI(id),
        FindMessagesByConversationAPI({ conversation: id, page: 1 }),
      ]);
      if (dataConversation.isSuccess) {
        setConversation(dataConversation.metadata.conversation);
      }
      if (dataMessages.isSuccess) {
        if (dataMessages.metadata.messages.length) {
          setMessages(
            concatTwoMessagesWithDay([], dataMessages.metadata.messages)
          );
        } else {
          setHasMore(false);
        }
      }
      setIsLoading(false);
    })();
  }, [setConversation, id]);
  useEffect(() => {
    setMessages([]);
    setPage(1);
  }, [id]);

  const conversationRef = createRef<any>();

  return (
    <div className="flex flex-col w-full">
      {!isLoading ? (
        <>
          <div
            id="conversation"
            className="relative flex-grow flex flex-col overflow-y-hidden h-full w-full"
            ref={conversationRef}
          >
            <HeaderConversation conversation={conversation} />
            <div
              id="scroll__messages"
              className="flex flex-col-reverse w-full flex-grow overflow-y-auto"
            >
              <Messages
                conversation={conversation}
                messages={messages}
                setMessages={setMessages}
                id={id}
                hasMore={hasMore}
                setHasMore={setHasMore}
              />
            </div>
          </div>
          <MessageInput messages={messages} setMessages={setMessages} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
