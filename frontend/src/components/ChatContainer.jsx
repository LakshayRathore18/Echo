import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageSkeleton from "../components/skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const { selectedUser, messages, isMessagesLoading, getMessages, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // fetch messages
  useEffect(() => { 
    if (selectedUser) {
      getMessages(selectedUser?._id);
    }

    // subscribe to messages
    subscribeToMessages();

    // unsubscribe from messages
    return () => unsubscribeFromMessages();

  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // scroll to the bottom of the chat
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // loading
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />

      {/* Main messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              // Align messages to right (chat-end) if sent by auth user, left (chat-start) if received
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            {/* Profile picture */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    // Show auth user's profile pic for sent messages, selected user's pic for received
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            {/* Timestamp display above message */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            {/* Message bubble containing image (if any) and text content */}
            <div className="chat-bubble flex flex-col">
              {/* Optional image attachment with responsive width */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {/* Text message content */}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
