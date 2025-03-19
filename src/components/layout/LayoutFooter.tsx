"use client";

import React from "react";

const FooterLayout = () => {
  return (
    <footer className='relative pt-8 pb-6 bg-gradient-to-r from-[#f3f3f3] to-[#d1d1cc]'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap text-left'>
          <div className='w-full lg:w-6/12 px-4 mb-8 lg:mb-0'>
            <h4 className='text-3xl font-semibold text-blueGray-700'>Let's keep in touch!</h4>
            <h5 className='text-[16px] mt-0 mb-2 text-blueGray-600'>
              Find me on any of these platforms, I respond 1-2 business days.
            </h5>
          </div>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='flex flex-wrap items-top mb-6'>
              <div className='w-full sm:w-6/12 lg:w-4/12 px-4 mb-8 sm:mb-0'>
                <span className='block uppercase text-blueGray-500 text-sm font-semibold mb-2'>
                  Useful Links
                </span>
                <ul className='list-unstyled'>
                  <li>
                    <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'>
                      Github
                    </a>
                  </li>
                  <li>
                    <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'>
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div className='w-full sm:w-6/12 lg:w-4/12 px-4'>
                <span className='block uppercase text-blueGray-500 text-sm font-semibold mb-2'>
                  Other Resources
                </span>
                <ul className='list-unstyled'>
                  <li>
                    <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'>
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'>
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className='my-6 border-blueGray-300' />
        <div className='flex flex-wrap items-center md:justify-between justify-center'>
          <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
            <div className='text-sm text-blueGray-500 font-semibold py-1'>
              Copyright © <span id='get-current-year'>2021</span>
              <a className='text-blueGray-500 hover:text-gray-800' target='_blank'>
                Notus JS by
              </a>
              <a className='text-blueGray-500 hover:text-blueGray-800'>Creative Tim</a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
