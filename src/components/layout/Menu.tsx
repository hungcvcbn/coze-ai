import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";
import { getCookie, deleteCookie } from "cookies-next";
import { REFRESH_TOKEN, TOKEN } from "@/helpers/constants";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CreateBotModal from "../create-bot/CreateBotModal";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import UserImage from "@/assets/icons/avatar_admin.png";
import Popover from "@mui/material/Popover";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@/helpers/api/system";
import { setProfile, setToast } from "@/redux/slices/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isEmpty } from "@/helpers/utils/common";
import BasicButton from "../common/BasicButton";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(state => state.common);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const token = getCookie(TOKEN);
  const pathname = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = [
    {
      title: "Bảng điều khiển",
      path: "/control-panel",
      icon: <DashboardIcon />,
    },
    {
      title: "Bot Store",
      path: "/bot-store",
      icon: <StorefrontIcon />,
    },
  ];

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setToast({ type: "success", message: "Đăng xuất thành công", show: true }));
      deleteCookie(TOKEN);
      deleteCookie(REFRESH_TOKEN);
      deleteCookie("uuid");
      setProfile({});
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='md:hidden fixed top-3 left-4 z-50 p-2 rounded-lg'
      >
        {!isMenuOpen ? (
          <MenuIcon
            sx={{ color: "#39B5E0", fontSize: "24px", display: "flex", alignItems: "center" }}
          />
        ) : (
          <CloseIcon
            sx={{ color: "#39B5E0", fontSize: "24px", display: "flex", alignItems: "center" }}
          />
        )}
      </button>

      <div
        ref={menuRef}
        className={`fixed left-0 top-0 h-full w-64 bg-white text-black border-r border-gray-200
        transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:block z-40`}
      >
        <div className='flex flex-col h-full'>
          <div className='flex justify-center items-center gap-2 px-4 w-full p-4 h-[60px]'>
            <Image src={LogoImage} alt='Logo' width={40} height={40} className='rounded-lg' />
            <span className='text-24-32 text-neutral font-semibold pt-1'>Zenee AI</span>
          </div>

          <div className='p-3'>
            <button
              className='bg-primary hover:bg-primary-300 w-full text-white px-4 py-2 rounded-lg font-medium text-14-20'
              onClick={() => setOpen(true)}
            >
              Tạo Bot
            </button>
          </div>

          <div className='space-y-1 p-2'>
            {menuItems.map(item => {
              const isActive = pathname?.startsWith(item.path) ?? false;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-primary-50 text-primary" : "hover:bg-gray-100"
                  }`}
                >
                  <span className={isActive ? "text-primary" : "text-gray-400"}>{item.icon}</span>
                  <span
                    className={`font-medium font-sans text-16-24 ${isActive ? "text-primary" : ""}`}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
          {!isEmpty(profile) ? (
            <div className='mt-auto border-t border-gray-200 p-2'>
              <div
                className='flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg'
                onClick={handleProfileClick}
              >
                <div className='w-8 h-8 bg-gray-700 rounded-full overflow-hidden flex-shrink-0'>
                  <img
                    src={profile?.avatar || UserImage}
                    alt='User'
                    width={32}
                    height={32}
                    className='rounded-full'
                  />
                </div>
                <div className='overflow-hidden'>
                  <p className='text-14-20 font-medium truncate'>{profile?.username}</p>
                  <p className='text-12-16 text-gray-500 truncate'>{profile?.email}</p>
                </div>
              </div>

              <Popover
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "10px",
                  },
                }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 px-4 py-2 text-danger hover:bg-gray-100 rounded-lg w-full'
                >
                  <LogoutIcon fontSize='small' />
                  <span className='text-14-20 font-sans font-medium'>Đăng xuất</span>
                </button>
              </Popover>
            </div>
          ) : (
            <Link href={"/login"}>
              <BasicButton size='md' variant='contained' color='primary'>
                <div className='flex items-center gap-2 font-semibold'>Đăng nhập</div>
              </BasicButton>
            </Link>
          )}
        </div>

        <div className='fixed bottom-0 right-0'>
          <CreateBotModal open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
};

export default Menu;
