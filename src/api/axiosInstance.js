// src/api/axiosInstance.js
import axios from "axios";

// 🔹 인증 제외할 공용 API 경로 (정렬 기준으로 분리)
const PUBLIC_PATHS = ["/user/login", "/user/register", "/user/findid", "/user/check-email", "/user/check-id"];

// 🔹 Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "/api", // vite.config.js의 프록시와 연동됨
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 세션 인증 사용하는 경우 활성화 (선택)
});

// 🔹 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("📤 요청 URL:", config.url);

    // 🔸 토큰 제외 대상이 아니라면 Authorization 헤더 추가
    const isPublic = PUBLIC_PATHS.some((path) => config.url.startsWith(path));

    if (!isPublic) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("🔐 토큰 포함됨:", token);
      }
    } else {
      console.log("⚠️ 인증 제외 API → 토큰 미포함");
    }

    return config;
  },
  (error) => {
    console.error("❌ 요청 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

// 🔹 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ 응답 데이터:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ 응답 에러:", error);

    // 🔸 401 Unauthorized → 로그인 만료 시 자동 로그아웃
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
