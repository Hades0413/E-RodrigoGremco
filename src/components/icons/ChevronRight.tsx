import type { SVGProps } from 'react';

const IconParkSolidRightC: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <defs>
        <mask id="ipSRightC0">
          <g fill="none" strokeLinejoin="round" strokeWidth={4}>
            <path
              fill="#fff"
              stroke="#fff"
              d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
            />
            <path
              stroke="#000"
              strokeLinecap="round"
              d="m21 33l9-9l-9-9"
            />
          </g>
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#ipSRightC0)"
      />
    </svg>
  );
};

export default IconParkSolidRightC;
