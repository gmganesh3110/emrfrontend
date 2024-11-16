import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { postaxios } from "../services/AxiosService";
import { message } from "antd";
import { setUser } from "../store/authStore/userSlice";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.user);
  const [hasFetchedProfile, setHasFetchedProfile] = useState(false);
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    if (!user?.token && !hasFetchedProfile) {
      getUserProfile();
    }
  }, [hasFetchedProfile]);

  const getUserProfile = async () => {
    try {
      setHasFetchedProfile(true);
      const res: any = await postaxios(
        "http://localhost:3000/auth/getuserprofile",
        {}
      );
      if (res.status === 201) {
        dispatch(setUser({ ...res.data, token }));
      } else {
        throw res;
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
