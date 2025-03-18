"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

const HomePage = () => {
  const { profile } = useAppSelector(state => state.common);
  if (profile) {
    return redirect("/control-panel");
  }
  return redirect("/login");
};

export default HomePage;
