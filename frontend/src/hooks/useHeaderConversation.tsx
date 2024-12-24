import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";
import { distanceBetweenTwoDates } from "../utils";

export default function useHeaderConversation(conversation: any) {
  const { userId } = useAuthContext();
  const [state, setState] = useState("");
  const { onlineUsers } = useSocketContext();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [avatar1, setAvatar1] = useState("");
  const [avatar2, setAvatar2] = useState("");
  useEffect(() => {
    if (!conversation) return;
    const selectedParticipants = conversation.participants.filter(
      (participant) => participant._id !== userId
    );
    let name: string = "";
    if (conversation.participants.length === 2) {
      name = selectedParticipants[0].profile.fullName;
      if (onlineUsers.includes(selectedParticipants[0]._id)) {
        setState("🟢 Online");
      } else
        setState(
          selectedParticipants[0].latestOnlineAt
            ? `Active ${distanceBetweenTwoDates(
                new Date(Date.now()),
                new Date(selectedParticipants[0].latestOnlineAt)
              )}`
            : " "
        );
      setAvatar1(selectedParticipants[0].profile.avatar);
      setUsername(selectedParticipants[0].username);
    } else if (conversation.participants.length === 3) {
      name =
        selectedParticipants[0].profile.fullName +
        ", " +
        selectedParticipants[1].profile.fullName;
      setAvatar1(selectedParticipants[0].profile.avatar);
      setAvatar2(selectedParticipants[1].profile.avatar);
    } else {
      name =
        selectedParticipants[0].profile.fullName +
        ", " +
        selectedParticipants[1].profile.fullName +
        ` and ${selectedParticipants.length - 2} more `;
      setAvatar1(selectedParticipants[0].profile.avatar);
      setAvatar2(selectedParticipants[1].profile.avatar);
    }
    setName(name);
  }, [onlineUsers]);

  return { state, name, username, avatar1, avatar2 };
}
