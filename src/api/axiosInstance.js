// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // ✅ 수정 완료
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("📡 요청 URL:", config.url);
    console.log("📤 메서드:", config.method);
    console.log("📦 데이터:", config.data);
    console.log("🧾 헤더:", config.headers);

    return config;
  },
  (error) => {
    console.error("❌ 요청 인터셉터 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ 응답 데이터:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ 응답 에러:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken"); // ✅ 여기 이름도 일치
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
