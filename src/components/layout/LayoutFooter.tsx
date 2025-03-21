"use client";

import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ChatIcon from "@mui/icons-material/Chat"; // MUI doesn't have Discord icon, using Chat as alternative

const FooterLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative pt-12 pb-8 bg-gradient-to-br from-gray-50 via-primary-100 to-white border-t border-gray-200'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap text-left'>
          <div className='w-full lg:w-5/12 px-4 mb-8 lg:mb-0'>
            <div className='text-32-40 font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-700'>
              Zenix
            </div>
            <h5 className='text-14-20 mt-3 mb-4 text-gray-600'>
              Training the next generation of AI agents to empower your workflow.
            </h5>
            <div className='mt-6 flex space-x-2'>
              <a
                href='#'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200'
              >
                <TwitterIcon className='text-primary-700' fontSize='small' />
              </a>
              <a
                href='#'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200'
              >
                <GitHubIcon className='text-primary-700' fontSize='small' />
              </a>
              <a
                href='#'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200'
              >
                <LinkedInIcon className='text-primary-700' fontSize='small' />
              </a>
              <a
                href='#'
                className='w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200'
              >
                <ChatIcon className='text-primary-700' fontSize='small' />
              </a>
            </div>
          </div>
          <div className='w-full lg:w-7/12 px-4'>
            <div className='flex flex-wrap'>
              <div className='w-full sm:w-4/12 mb-8 sm:mb-0'>
                <span className='block text-gray-700 text-14-20 font-bold mb-4 uppercase tracking-wider'>
                  Products
                </span>
                <ul className='space-y-2'>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      AI Assistant
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      Agent Training
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      Custom Models
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      API Access
                    </a>
                  </li>
                </ul>
              </div>
              <div className='w-full sm:w-4/12 mb-8 sm:mb-0'>
                <span className='block text-gray-700 text-14-20 font-bold mb-4 uppercase tracking-wider'>
                  Resources
                </span>
                <ul className='space-y-2'>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      Tutorials
                    </a>
                  </li>
                </ul>
              </div>
              <div className='w-full sm:w-4/12'>
                <span className='block text-gray-700 text-14-20 font-bold mb-4 uppercase tracking-wider'>
                  Company
                </span>
                <ul className='space-y-2'>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='text-gray-600 hover:text-primary-700 font-medium text-14-20 transition-colors'
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-200 mt-10 pt-8'>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='w-full md:w-auto mb-4 md:mb-0'>
              <p className='text-14-20 font-medium text-gray-500'>
                &copy; {currentYear} Zenix. All rights reserved.
              </p>
            </div>
            <div className='w-full md:w-auto flex flex-wrap space-x-6'>
              <a href='#' className='text-14-20 font-medium text-gray-500 hover:text-primary-700'>
                Privacy Policy
              </a>
              <a href='#' className='text-14-20 font-medium text-gray-500 hover:text-primary-700'>
                Terms of Service
              </a>
              <a href='#' className='text-14-20 font-medium text-gray-500 hover:text-primary-700'>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
