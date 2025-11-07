import Link from "next/link";
import React from "react";

const BreadCrumb = ({ path }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex overflow-hidden rounded border border-gray-300 bg-white text-sm text-gray-500">
        <li className="flex items-center group">
          <Link
            href="/"
            className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 leading-10 transition-colors hover:text-gray-950
             hover:bg-gray-200 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-house-icon lucide-house"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Home
          </Link>
          <span
            className=" absolute translate-x-[100px] h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]
              rtl:rotate-180 transition-colors group-hover:bg-gray-200"
          ></span>
        </li>

        <li className="relative flex items-center">
          <a
            href="#"
            className="block h-10 pr-4 pl-6 leading-10 transition-colors hover:text-gray-900 "
          >
            {path?.split("/")[1]}
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
