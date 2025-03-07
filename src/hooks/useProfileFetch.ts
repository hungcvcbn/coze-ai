import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setFirstLoading, setProfile } from "@/redux/slices/common";
import { getProfile } from "@/helpers/api/system";
import { TOKEN } from "@/helpers/constants";
import { getCookie } from "cookies-next";

export const useProfileFetch = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res?.data) {
        dispatch(setProfile(res.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setFirstLoading(false));
    }
  };

  useEffect(() => {
    const token = getCookie(TOKEN);
    if (token) {
      fetchProfile();
    } else {
      dispatch(setFirstLoading(false));
      router.push("/login");
    }
  }, []);

  return { fetchProfile };
}; 