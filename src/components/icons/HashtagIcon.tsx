import type { SVGProps } from 'react';

const MarketeqHastag: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 50 50"
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <path stroke="currentColor" d="M8.333 31.25h31.25m-29.166-12.5h31.25z" />
        <path stroke="currentColor" d="m13.5 43.75l10.063-37.5m12.937 0l-10.062 37.5z" />
      </g>
    </svg>
  );
};

export default MarketeqHastag;
