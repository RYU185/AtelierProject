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
      const messages = Array.isArray(state.chatMessages) ? state.chatMessages : [];
      const exists = messages.some((m) => m.id === message.id);
      if (exists) return state;

      return {
        chatMessages: [...messages, message],
      };
    }),

  setChatMessages: (messages) => set({ chatMessages: messages }),

  replaceTempMessage: (tempId, patch) =>
    set((state) => {
      const safePatch = { ...patch, tempId };
      const updated = state.chatMessages.map((m) =>
        m.tempId === tempId ? { ...m, ...safePatch, isTemporary: false } : m
      );
      const found = updated.some((m) => m.tempId === tempId);
      return {
        chatMessages: found ? updated : [...updated, { ...safePatch }],
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
