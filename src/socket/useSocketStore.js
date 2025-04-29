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
    set((state) => {
      const exists = state.chatMessages.some((m) => m.id === message.id);
      if (exists) return state;

      return {
        chatMessages: [...state.chatMessages, message],
      };
    }),

  setChatMessages: (messages) => set({ chatMessages: messages }),

  replaceTempMessage: (tempId, patch) =>
    set((state) => {
      const updated = state.chatMessages.map((m) =>
        m.tempId === tempId ? { ...m, ...patch, isTemporary: false } : m
      );
      const found = updated.some((m) => m.tempId === tempId);
      return {
        chatMessages: found ? updated : [...updated, { ...patch }],
      };
    }),

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
