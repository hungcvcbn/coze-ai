"use client";

import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiAlert: {
      variants: [
        {
          props: { severity: "md-warning" as any },
          style: {
            backgroundColor: "#FFF8E1",
            color: "#F57C00",
            "& .MuiAlert-icon": {
              color: "#FFB74D",
            },
          },
        },
      ],
    },
  },
});
