import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@hooks/useAuth";

const RequireAuth = () => {
    // const { userId, webAccessToken } = useAuth();
    const userId = localStorage.getItem("userId");
    const location = useLocation();

    // 유저의 현재 페이지를 기억하고 로그인 페이지로 이동
    return userId ? (
        <Outlet />
    ) : (
        // <Navigate to="/login/callback" state={{ from: location }} replace />

        window.location.assign(
            `https://github.com/login/oauth/authorize?client_id=` +
                "64f8af2227721d1a29ea"
        )
    );
};

export default RequireAuth;
