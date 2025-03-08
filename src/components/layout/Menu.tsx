import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreateBotModal from "../create-bot/CreateBotModal";
import Image from "next/image";
import LogoImage from "@/assets/icons/logo.png";
import { getCookie } from "cookies-next";
import { TOKEN } from "@/helpers/constants";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const token = getCookie(TOKEN);
  const pathname = usePathname();
  const router = useRouter();
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

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='lg:hidden fixed top-3 left-4 z-50 p-2 rounded-lg'
      >
        {!isMenuOpen && (
          <MenuIcon
            sx={{ color: "#6A5ACD", fontSize: "24px", display: "flex", alignItems: "center" }}
          />
        )}
      </button>

      <div
        ref={menuRef}
        className={`fixed left-0 top-0 h-full w-64 bg-gray-50 border-r border-gray-100 
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:block z-40`}
      >
        <div className='flex items-center gap-2 mb-2 px-4 w-full p-4 h-[64px]'>
          <Image src={LogoImage} alt='Logo' width={40} height={40} className='rounded-lg' />
          <span className='text-24-32 text-neutral font-semibold pt-1'>Zenee AI</span>
        </div>
        <div className='flex justify-center pb-3 px-4'>
          <button
            className='bg-primary w-full text-white px-4 py-2 rounded-lg font-semibold text-14-20'
            onClick={() => setOpen(true)}
          >
            Tạo Bot
          </button>
        </div>
        <div className='space-y-2'>
          {menuItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className='font-semibold text-[16px]'>{item.title}</span>
              </Link>
            );
          })}
        </div>
        <div className='fixed bottom-0 right-0'>
          <CreateBotModal open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
};

export default Menu;
