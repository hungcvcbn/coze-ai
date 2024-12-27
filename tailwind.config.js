/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        lightBlack: '0px 4px 4px 0px rgba(0,0,0,0.25)',
        s1: '0px 6px 8px 0px #EFEFEF',
        s2: '0px 4px 12px 0px rgba(0, 0, 0, 0.18)',
        s3: '0px 2px 4px 0px rgba(0, 0, 0, 0.14)',
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        normal: '#333',
        border: '#CCCCCC',
        text: '#333333',

        // Primary color
        primary: '#6A5ACD',
        'primary-50': '#E6E6FA',
        'primary-100': '#D8BFD8',
        'primary-200': '#B0C4DE',
        'primary-400': '#7B68EE',
        'primary-500': '#483D8B',
        'primary-600': '#4B0082',
        'primary-700': '#3E2A91',

        // Bg color
        background: '#334155',
        'background-light': '#F9FAFB',
        'background-dark': '#2C2C2C',

        // Neutral color
        neutral: '#334155',
        'neutral-gray-1': '#C6C6C6',
        'neutral-gray-2': '##E5E7EB',

        // Success color
        success: '#15AA2C',
        'success-400': '#19CD35',
        'success-300': '#2AE547',
        'success-200': '#8DF19D',
        'success-100': '#C6F8CE',
        'success-50': '#E8F7EA',

        // Info color
        info: '#315BF1',
        'info-400': '#5A7CF4',
        'info-300': '#839DF7',
        'info-200': '#ADBDF9',
        'info-100': '#D6DEFC',
        'info-50': '#EBEFFE',

        // Warning color
        warning: '#FF6B00',
        'warning-400': '#FF8933',
        'warning-300': '#FFA666',
        'warning-200': '#FFC499',
        'warning-100': '#FFE1CC',
        'warning-50': '#FFF1E6',

        // Danger color
        danger: '#ED1F42',
        'danger-400': '#F14C68',
        'danger-300': '#F4798E',
        'danger-200': '#F8A5B3',
        'danger-100': '#FBD2D9',
        'danger-50': '#FEE9ED',
      },
    },
    fontFamily: {
      'inter-900': ['Inter Black'],
      'inter-800': ['Inter ExtraBold'],
      'inter-700': ['Inter Bold'],
      'inter-600': ['Inter SemiBold'],
      'inter-500': ['Inter Medium'],
      'inter-400': ['Inter Regular'],
      'inter-300': ['Inter Light'],
      'inter-200': ['Inter ExtraLight'],
      'inter-100': ['Inter Thin'],
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      '10-10': ['10px', '10px'],
      '10-12': ['10px', '12px'],
      '12-12': ['12px', '12px'],
      '12-14': ['12px', '14px'],
      '12-16': ['12px', '16px'],
      '12-18': ['12px', '18px'],
      '14-14': ['14px', '14px'],
      '14-16': ['14px', '16px'],
      '14-17': ['14px', '17px'],
      '14-18': ['14px', '18px'],
      '14-19': ['14px', '19px'],
      '14-20': ['14px', '20px'],
      '14-22': ['14px', '22px'],
      '16-16': ['16px', '16px'],
      '16-18': ['16px', '18px'],
      '16-20': ['16px', '20px'],
      '16-22': ['16px', '22px'],
      '16-24': ['16px', '24px'],
      '16-28': ['16px', '28px'],
      '18-24': ['18px', '24px'],
      '18-28': ['18px', '28px'],
      '18-32': ['18px', '32px'],
      '20-20': ['20px', '20px'],
      '20-24': ['20px', '24px'],
      '20-28': ['20px', '28px'],
      '20-32': ['20px', '32px'],
      '24-24': ['24px', '24px'],
      '24-29': ['24px', '29px'],
      '24-28': ['24px', '28px'],
      '24-30': ['24px', '30px'],
      '24-32': ['24px', '32px'],
      '24-36': ['24px', '36px'],
      '24-48': ['24px', '48px'],
      '28-32': ['28px', '32px'],
      '28-36': ['28px', '36px'],
      '28-40': ['28px', '40px'],
      '32-32': ['32px', '32px'],
      '32-40': ['32px', '40px'],
      '40-40': ['40px', '40px'],
      '48-48': ['48px', '48px'],
    },
  },
  plugins: [],
} 