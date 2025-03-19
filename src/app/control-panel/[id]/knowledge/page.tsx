import React from "react";
import LayoutDetail from "@/components/layout/LayoutDetail";
// import Logo from "@/assets/images/logo.png";
import Layout from "@/components/layout/Layout";
import withAuth from "@/components/auth/auth";
const KnowledgePage = () => {
  return (
    <Layout>
      <div className='flex flex-col p-6'> </div>
    </Layout>
  );
};

export default withAuth(KnowledgePage);
