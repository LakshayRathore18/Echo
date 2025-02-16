import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await axiosInstance.get("/message/users");
      set({ users: data });
    } catch (err) {
      console.error("Error in getUsers:", err);
      toast.error("Error in fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const { data } = await axiosInstance.get(`/message/${userId}`);
      set({ messages: data });
    } catch (err) {
      toast.error("Error in fetching messages");
      console.log(err.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    try {
      const { selectedUser, messages } = get();
      const { data } = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, data] });
      return data;
    } catch (err) {
      toast.error("Error in sending message");
      console.log(err.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    // get socket from auth store
    const socket = useAuthStore.getState().socket;

    // listen for new messages and add them to the messages array
    socket.on("newMessage", (newMessage) => {

      // if the message is not for the selected user, return
      if(newMessage.senderId != selectedUser._id) return;

      // add the message to the messages array
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    // socket.off() is used to remove the listener for new messages
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
