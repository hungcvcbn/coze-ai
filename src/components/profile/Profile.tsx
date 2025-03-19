"use client";
import React, { useState } from "react";
import ProfileInfomation from "./ProfileInfomation";
import ChangePassword from "./ChangePassword";
import BasicButton from "../common/BasicButton";
import { IconUser, IconLock, IconTrash, IconArrowDown } from "../common/IconCommon";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";

type TabType = "profile" | "password" | "delete";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [selectOpen, setSelectOpen] = useState(false);

  const handleSelectChange = (e: SelectChangeEvent<TabType>) => {
    setActiveTab(e.target.value as TabType);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfomation />;
      case "password":
        return <ChangePassword />;
      case "delete":
        return (
          <div className='max-w-[600px]'>
            <div className='bg-red-50 p-4 rounded-lg border border-red-200 mb-4'>
              <h3 className='text-danger font-medium mb-2'>Warning</h3>
              <p className='text-danger'>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </p>
            </div>
            <BasicButton color='red' variant='contained'>
              Delete Account
            </BasicButton>
          </div>
        );
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='hidden md:block w-[250px] min-h-screen text-neutral bg-white border-r border-gray-200 pr-4'>
        <div className='space-y-2'>
          <div
            className={`flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer ${
              activeTab === "profile" ? "bg-gray-200" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <IconUser width={20} height={20} />
            <span className='text-16-24 font-semibold text-neutral'>Profile</span>
          </div>
          <div
            className={`flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer ${
              activeTab === "password" ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("password")}
          >
            <IconLock />
            <span className='text-16-24 font-semibold text-neutral'>Password</span>
          </div>
          <div
            className={`flex items-center gap-2 py-2 px-3 rounded-xl cursor-pointer mt-8 ${
              activeTab === "delete" ? "bg-red-100 text-red-500" : "text-red-500 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("delete")}
          >
            <IconTrash />
            <span className='text-16-24 font-semibold text-neutral'>Delete account</span>
          </div>
        </div>
      </div>

      <div className='md:hidden pb-4 text-neutral border-b border-gray-200'>
        <FormControl fullWidth>
          <Select
            value={activeTab}
            onChange={handleSelectChange}
            size='small'
            sx={{
              backgroundColor: "#F3F4F6",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F3F4F6",
              },
              "& .MuiSelect-select": {
                fontFamily: "'JetBrains Mono', monospace",
              },
            }}
            IconComponent={() => (
              <button
                style={{
                  transform: selectOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s ease-in-out",
                  cursor: "pointer",

                  paddingRight: "10px",
                }}
                onClick={e => {
                  e.stopPropagation();
                  setSelectOpen(!selectOpen);
                }}
              >
                <IconArrowDown width={16} height={16} />
              </button>
            )}
          >
            <MenuItem value='profile' className='text-16-24 font-sans font-medium text-neutral'>
              Profile
            </MenuItem>
            <MenuItem value='password' className='text-16-24 font-sans font-medium text-neutral'>
              Change Password
            </MenuItem>
            <MenuItem value='delete' className='text-16-24 font-sans font-medium text-neutral'>
              Delete Account
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='flex-1 md:px-6'>
        <div className='text-20-24 md:text-24-32 pt-4 font-semibold mb-6 text-neutral border-b border-gray-200 pb-4 w-full'>
          {activeTab === "profile" && "Profile"}
          {activeTab === "password" && "Change Password"}
          {activeTab === "delete" && "Delete Account"}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
