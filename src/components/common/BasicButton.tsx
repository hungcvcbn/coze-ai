import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "xxl";
export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonColor = "primary" | "red" | "black" | "white";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  clases?: string;
  loading?: boolean;
  href?: string;
  target?: string;
  isRadius100?: boolean;
}

const BasicButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading,
      size = "md",
      variant = "contained",
      color = "primary",
      startIcon,
      endIcon,
      clases,
      href,
      target,
      isRadius100,
      ...props
    },
    ref
  ) => {
    const renderClassBySize = () => {
      switch (size) {
        case "sm":
          // height: 32px
          return `h-[32px] ${variant !== "text" && "px-[14px]"} text-14-18 font-semibold ${
            isRadius100 ? "rounded-[100px]" : "rounded-[8px]"
          }`;
        case "md":
          // height: 40px
          return `h-[40px] ${variant !== "text" && "px-[16px]"} text-14-18 font-semibold ${
            isRadius100 ? "rounded-[100px]" : "rounded-[8px]"
          }`;
        case "lg":
          // height: 44px
          return `h-[44px] ${variant !== "text" && "px-[16px]"} text-16-20 font-semibold ${
            isRadius100 ? "rounded-[100px]" : "rounded-[12px]"
          }`;
        case "xl":
          // height: 48px
          return `h-[48px] ${variant !== "text" && "px-[24px]"} text-16-20 font-semibold ${
            isRadius100 ? "rounded-[100px]" : "rounded-[12px]"
          }`;
        case "xxl":
          // height: 64px
          return `h-[64px] ${variant !== "text" && "px-[28px]"} text-20-24 font-semibold ${
            isRadius100 ? "rounded-[100px]" : "rounded-[16px]"
          }`;
        default:
          return "";
      }
    };

    const renderClassByVariantAndColor = () => {
      switch (color) {
        case "red":
          if (variant === "contained") {
            return "text-white bg-red-700 hover:bg-red-800";
          }
          if (variant === "outlined") {
            return `bg-none text-red-700 border border-red hover:bg-red-100`;
          }
          if (variant === "text") {
            return `bg-none text-red-700 hover:bg-red-100`;
          }
          return "";
        case "white":
          if (variant === "contained") {
            return `bg-white text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300`;
          }
          if (variant === "outlined") {
            return `bg-none text-neutral-900 border border-neutral-700`;
          }
          if (variant === "text") {
            return `bg-none text-neutral-700 hover:bg-neutral-200 hover:text-neutral-700`;
          }
          return "";
        // default color = black
        default:
          if (variant === "contained") {
            return `bg-primary text-white hover:bg-primary`;
          }
          if (variant === "outlined") {
            return `bg-none text-neutral border border-neutral-300 hover:bg-neutral-200`;
          }
          if (variant === "text") {
            return `bg-none text-neutral hover:bg-neutral-200`;
          }
          return "";
      }
    };
    const colorLoading =
      (variant === "outlined" && color === "black") ||
      (variant === "contained" && color === "white")
        ? "#000000"
        : "#FFFFFF";

    const renderButton = () => (
      <button
        ref={ref}
        className={clsx(
          renderClassBySize(),
          renderClassByVariantAndColor(),
          "flex items-center justify-center",
          "whitespace-nowrap",
          clases,
          {
            ["cursor-not-allowed opacity-50"]: props.disabled || loading,
            "shadow-basic": variant !== "text",
          }
        )}
        {...props}
      >
        {startIcon}
        <span
          className={clsx(
            { "ml-[8px]": !!startIcon, "mr-[8px]": !!endIcon },
            "flex items-center font-semibold"
          )}
        >
          {props.children}
        </span>
        {endIcon}
        {loading && (
          <>
            &nbsp;&nbsp;&nbsp;
            <CircularProgress size={size === "sm" ? 12 : 16} style={{ color: colorLoading }} />
          </>
        )}
      </button>
    );

    if (href && !props.disabled) {
      if (target === "_blank") {
        return (
          <a href={href} rel={"noreferrer"} target={"_blank"} className={clases}>
            {renderButton()}
          </a>
        );
      }
      return (
        <Link href={href} className={clases}>
          {renderButton()}
        </Link>
      );
    }
    return renderButton();
  }
);

export default BasicButton;
