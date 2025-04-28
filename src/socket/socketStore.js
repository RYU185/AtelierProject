import { create } from "zustand";

// 전역상태관리 zustand 사용
export const useSocketStore = create((set) => ({
  isSocketConnected: false,
  notifications: [],
  inquiries: [],
  chatMessages: [],

  setSocketConnected: (status) => set({ isSocketConnected: status }),

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

  clearAll: () =>
    set({
      isSocketConnected: false,
      notifications: [],
      inquiries: [],
      chatMessages: [],
    }),
}));

export default useSocketStore;
