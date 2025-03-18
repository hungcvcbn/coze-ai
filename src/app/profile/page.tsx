"use client";

import Layout from "@/components/layout/Layout";
import Profile from "@/components/profile/Profile";
import withAuth from "@/components/auth/auth";

const DashboardPage = () => {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
};

export default withAuth(DashboardPage);
