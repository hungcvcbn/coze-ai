"use client";

import Agent from "@/components/agent-ai/Agent";
import Layout from "@/components/layout/Layout";
import withAuth from "@/components/auth/auth";

const DashboardPage = () => {
  return (
    <Layout>
      <Agent />
    </Layout>
  );
};

export default withAuth(DashboardPage);
