"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/[locale]/components/ui/button";
import { Search, Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "@/app/[locale]/components/theme-toggle";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import "./styles/style.css";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  const toggleDropdown = (path: string) => {
    setOpenStates((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const closeMobileMenu = () => setMobileOpen(false);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    const newPath = `/${locale}${pathname?.replace(/^\/[a-z]{2}/, "")}`;
    router.push(newPath);
  };

  const t = useTranslations();
  const navbarItems = t.raw("navbar.navbarItems") as { name: string; path: string; type: string }[];

  return (
    <>
      <header className='sticky top-0 2xl:pt-3 min-[1710px]:pt-4 z-40 bg-white/50 backdrop-blur-xl dark:bg-gray-950/50'>
        <section className='mx-auto px-2 xl:px-4 py-1 flex items-center justify-around lg:gap-4 xl:gap-32'>
          <div className='flex items-center justify-between gap-4 sm:gap-6 md:gap-4 lg:gap-2 xl:gap-32 2xl:gap-10'>
            <div className='spacing flex justify-between items-center gap-4 sm:gap-6 md:gap-4 lg:gap-20 xl:gap-40 2xl:gap-60 min-[1710px]:gap-72'>
              <div className='flex gap-2 md:gap-4 lg:gap-8'>
                <Link
                  href='/'
                  className='logo_width flex items-center mt-2 max-[375px]:mr-0 xs:mr-8 sm:mr-2 xl:mr-0 2xl:mr-4'
                >
                  <img
                    src='/Logo.svg'
                    alt='Skill Bridge Logo'
                    className='logo_width w-16 sm:w-20 md:w-24 lg:w-16 xl:w-20 h-16 sm:h-20 md:h-24 lg:h-16 xl:h-20 2xl:w-24 2xl:h-24'
                  />
                </Link>
                <nav className='hidden lg:flex items-center gap-4 lg:gap-5 xl:gap-6 min-[1710px]:gap-12 font-inter'>
                  {navbarItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className={`font-medium font-inter text-sm lg:text-xs xl:text-sm 2xl:text-[18px] ${
                        isActive(item.path)
                          ? "text-[#2196F3]"
                          : "text-gray-700 dark:text-gray-300 hover:text-[#2196F3]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className='flex max-[375px]:gap-2 min-[375px]:gap-5 sm:gap-6 min-[1760px]:gap-12 items-center'>
                <div className='search_bar flex items-center border border-gray-200 dark:border-gray-700 rounded-full pl-4 pr-2 py-0.5 sm:py-1.5 lg:py-1 xl:py-1.5 2xl:py-2 2xl:pl-8 2xl:pr-3 w-[220px] min-[500px]:w-[260px] sm:w-[280px] md:w-[240px] lg:w-[180px] xl:w-[280px] 2xl:w-[320px] max-[375px]:mr-1 min-[375px]:mr-4 min-[500px]:mr-7 sm:mr-4 md:mr-16 min-[920px]:mr-8 lg:mr-4 xl:mr-1'>
                  <input
                    type='text'
                    placeholder={t("navbar.searchPlaceholder")}
                    className='bg-transparent outline-none text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-lg w-full dark:text-white'
                  />
                  <Button
                    size='icon'
                    variant='ghost'
                    className='h-7 w-7 rounded-full'
                  >
                    <Search size={16} className='text-[#2196F3]' />
                  </Button>
                </div>
                <Button
                  size='sm'
                  className='hidden md:block bg-[#2196F3] hover:bg-blue-500 h-9 2xl:h-12 px-5'
                >
                  <Link href='/login' className='text-base 2xl:text-lg'>
                    {t("navbar.getStarted")}
                  </Link>
                </Button>
                <div className='flex gap-2 items-center justify-center'>
                  <label htmlFor='lang'>
                    <Globe className='h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-[#2196F3] cursor-pointer' />
                  </label>
                  <select
                    name='lang'
                    id='lang'
                    className='appearance-none bg-transparent text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:border-transparent'
                    onChange={changeLanguage}
                    defaultValue={pathname?.split("/")[1] || "en"}
                  >
                    <option value='en'>En</option>
                    <option value='am'>አማ</option>
                  </select>
                </div>
                <div className='hidden md:block'>
                  <ThemeToggle />
                </div>
                <button
                  className='lg:hidden rounded-md py-2 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={() => setIsOpen(true)}
                >
                  <Menu className='h-5 md:h-6 w-5 md:w-6' />
                </button>
              </div>
            </div>
          </div>
        </section>
      </header>

      <div className='lg:hidden'>
        {isOpen && (
          <div
            className='fixed inset-0 bg-black/50 z-50'
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        <div
          className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-900 z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className='flex justify-between items-center p-4 border-b'>
            <div className='flex items-center gap-2'>
              <Image
                src='/skills.png'
                alt='Skill Bridge Mobile Logo'
                width={36}
                height={36}
              />
              <span className='font-bold text-sm sm:text-base'>
                SkillBridge
              </span>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(false)}
              aria-label='Close menu'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>

          <div className='p-4'>
            <div className='flex items-center justify-between mb-6'>
              <div className='block md:hidden'>
                <ThemeToggle />
              </div>
              <Button
                size='sm'
                className='block md:hidden bg-[#2196F3] hover:bg-blue-500 h-9 px-5'
              >
                <Link href='/login'>{t("navbar.getStarted")}</Link>
              </Button>
            </div>

            <nav className='space-y-4'>
              {navbarItems.map((item) => (
                <div
                  key={item.path}
                  className='border-b border-gray-100 dark:border-gray-800'
                >
                  <Link
                    href={item.path}
                    className={`block py-2 font-medium font-inter ${
                      isActive(item.path)
                        ? "text-[#2196F3]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#2196F3]"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
