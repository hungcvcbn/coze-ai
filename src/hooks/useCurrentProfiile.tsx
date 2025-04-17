import { useAppSelector } from "@/redux/hooks";
import { selectAccountProfile } from "@/redux/slices/common";

const useCurrentProfile = () => {
  const profile = useAppSelector(selectAccountProfile);
  return {
    currentProfile: profile,
  };
};

export default useCurrentProfile;
