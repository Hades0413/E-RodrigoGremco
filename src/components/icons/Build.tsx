import React from 'react';
import type { SVGProps } from 'react';

const MaterialSymbolsBuild: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m17.15 20.7l-6.05-6.1q-.5.2-1.012.3T9 15q-2.5 0-4.25-1.75T3 9q0-.9.25-1.712t.7-1.538L7.6 9.4l1.8-1.8l-3.65-3.65q.725-.45 1.538-.7T9 3q2.5 0 4.25 1.75T15 9q0 .575-.1 1.088t-.3 1.012l6.1 6.05q.3.3.3.725t-.3.725l-2.1 2.1q-.3.3-.725.3t-.725-.3"
      />
    </svg>
  );
};

export default MaterialSymbolsBuild;
