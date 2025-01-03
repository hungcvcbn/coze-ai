import React from "react";

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export const IcCheckCircle: React.FC<Props> = ({ width = 16, height = 16, color = "#4CBB5E" }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.1117 6.15476C11.3023 6.35451 11.295 6.67101 11.0952 6.86168L7.42855 10.3617C7.23534 10.5461 6.93128 10.5461 6.73807 10.3617L4.90476 8.61168C4.70501 8.42101 4.69765 8.10451 4.88833 7.90476C5.079 7.70501 5.39549 7.69765 5.59524 7.88832L7.08332 9.30878L10.4048 6.13832C10.6045 5.94765 10.921 5.95501 11.1117 6.15476Z'
        fill={color}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8Z'
        fill={color}
      />
    </svg>
  );
};
