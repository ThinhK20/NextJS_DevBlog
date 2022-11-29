import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const PageHeader: React.FC = () => {
    const router = useRouter(); 
    const isHome = useMemo(() => {
    if (router.route === '/') {
        return true
    }
    return false
    }, [router.route]) 

  return (
    <header className="overflow-x-hidden">
      <nav className="bg-[#171717] border-gray-200 lg:px-6 py-4 overflow-x-hidden">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img
              src="/tailwind.svg"
              className="mr-3 h-6 sm:h-6"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              DevBlog
            </span>
          </Link>
         
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/"
                  className={`block py-2 pr-4 pl-3 ${isHome === true ? 'text-white' : 'text-gray-400'} rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
            
              <li>
                <a
                  href="https://github.com/ThinhK20/NextJS_DevBlog" 
                  target="_blank"
                  rel="noreferrer"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PageHeader;
