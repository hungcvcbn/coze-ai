"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  return function AuthenticatedComponent(props: P) {
    const { profile } = useAppSelector(state => state.common);
    const router = useRouter();

    useEffect(() => {
      if (!profile) {
        router.push("/login");
      }
    }, [profile, router]);

    if (!profile) {
      return null;
    }

    return <Component {...props} />;
  };
}
