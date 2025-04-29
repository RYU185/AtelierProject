import { create } from "zustand";

export const useSocketStore = create((set) => ({
  isSocketConnected: false,
  notifications: [],
  inquiries: [],
  chatMessages: [],
  sendMessage: () => {},

  setSocketConnected: (status) => set({ isSocketConnected: status }),
  setSendMessage: (fn) => set({ sendMessage: fn }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  addInquiry: (inquiry) =>
    set((state) => ({
      inquiries: [...state.inquiries, inquiry],
    })),

  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),

  setChatMessages: (messages) => set({ chatMessages: messages }),

  replaceTempMessage: (tempId, message) => {
    console.log("tempId 교체 시도:", tempId);
    set((state) => {
      const updatedMessages = state.chatMessages.map((msg) =>
        msg.tempId === tempId ? { ...msg, ...message, isTemporary: false } : msg
      );
      console.log("updatedMessages:", updatedMessages);
      return { chatMessages: updatedMessages };
    });
  },

  clearAll: () =>
    set({
      isSocketConnected: false,
      notifications: [],
      inquiries: [],
      chatMessages: [],
      sendMessage: () => {},
    }),
}));

export default useSocketStore;
