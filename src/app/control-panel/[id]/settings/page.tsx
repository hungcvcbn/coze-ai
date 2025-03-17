import React from "react";
import Layout from "@/components/layout/Layout";
import ControlSetting from "@/components/agent-detail/ControlSetting";

const SettingsPage = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center h-screen'>
        <ControlSetting />
      </div>
    </Layout>
  );
};

export default SettingsPage;
