"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { profile } = useAppSelector(state => state.common);

  return (
    <div className='max-w-[500px] mx-auto text-neutral p-6 mt-12 bg-white border border-gray-200 rounded-lg shadow'>
      <div className='flex flex-col items-center mb-6'>
        <Avatar
          src={profile?.avatar}
          alt={`${profile?.firstName} ${profile?.lastName}`}
          sx={{ width: 100, height: 100 }}
        />

        <h1 className='text-2xl font-bold'>
          {profile?.lastName} - {profile?.firstName}
        </h1>
        <span className='text-gray-500'>{profile?.username}</span>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='space-y-4'>
          <div>
            <h2 className='text-16-24 font-sans font-bold'>Basic Information</h2>
            <div className='mt-2 space-y-2'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Last Name:</span>
                <span>{profile.lastName}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>First Name:</span>
                <span>{profile.firstName}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Email:</span>
                <span>{profile.email}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Phone:</span>
                <span>{profile.phone}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>ID:</span>
                <span>{profile.id}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Gender:</span>
                <span>{profile.sex === "FEMALE" ? "Female" : "Male"}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Date of birth:</span>
                <span>{dayjs(profile?.dateOfBirth).format("DD/MM/YYYY")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
