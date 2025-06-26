"use client";

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild
} from "@headlessui/react";
import {
    //CalendarIcon,
    //ChartPieIcon,
    Cog6ToothIcon,
    //DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
//import Image from "next/image";
import { usePathname } from 'next/navigation';


const teams = [
    { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
    { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
    { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

// const userNavigation = [
//     { name: "Your profile", href: "#" },
//     { name: "Sign out", href: "#" },
// ];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {

  
const navigationItems = [
    { name: "Home", href: "/", icon: HomeIcon, current: true },
    { name: "Catalog", href: "/catalog", icon: UsersIcon, current: false },
    { name: "My Requests", href: "/requests", icon: FolderIcon, current: false },
  { name: "About", href: "/about", icon: UsersIcon, current: false },
];

  const pathname = usePathname();

  const navigation = navigationItems.map((item) => ({
    ...item,
    current: pathname === item.href,
  }));


    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
          <div>
            <Dialog
              open={sidebarOpen}
              onClose={setSidebarOpen}
              className="relative z-50 lg:hidden"
            >
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
              />

              <div className="fixed inset-0 flex">
                <DialogPanel
                  transition
                  className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                >
                  <TransitionChild>
                    <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                      <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="-m-2.5 p-2.5"
                      >
                        <span className="sr-only">
                          Close sidebar
                        </span>
                        <XMarkIcon
                          aria-hidden="true"
                          className="size-6 text-white"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <nav className="flex flex-1 flex-col">
                      <ul
                        role="list"
                        className="flex flex-1 flex-col gap-y-7"
                      >
                        <li>
                          <ul
                            role="list"
                            className="-mx-2 space-y-1"
                          >
                            {navigationItems.map((item) => (
                                <li key={item.name}>
                                  <a
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-50 text-indigo-600"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                    )}
                                  >
                                    <item.icon
                                      aria-hidden="true"
                                      className={classNames(
                                          item.current
                                              ? "text-indigo-600"
                                              : "text-gray-400 group-hover:text-indigo-600",
                                          "size-6 shrink-0"
                                      )}
                                    />
                                    {item.name}
                                  </a>
                                </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs/6 font-semibold text-gray-400">
                            Your teams
                          </div>
                          <ul
                            role="list"
                            className="-mx-2 mt-2 space-y-1"
                          >
                            {teams.map((team) => (
                                <li key={team.name}>
                                  <a
                                    href={team.href}
                                    className={classNames(
                                        team.current
                                            ? "bg-gray-50 text-indigo-600"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                    )}
                                  >
                                    <span
                                      className={classNames(
                                          team.current
                                              ? "border-indigo-600 text-indigo-600"
                                              : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                          "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                                      )}
                                    >
                                      {team.initial}
                                    </span>
                                    <span className="truncate">
                                      {team.name}
                                    </span>
                                  </a>
                                </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              aria-hidden="true"
                              className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                {/* <div className="flex h-16 shrink-0 items-center"> */}
                {/*   <Image */}
                {/*     height="100" */}
                {/*     width="100" */}
                {/*     alt="Your Company" */}
                {/*     src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" */}
                {/*     className="h-8 w-auto" */}
                {/*   /> */}
                {/* </div> */}
                <nav className="flex flex-1 flex-col">
                  <ul
                    role="list"
                    className="flex flex-1 flex-col gap-y-7"
                  >
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? "bg-gray-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={classNames(
                                      item.current
                                          ? "text-indigo-600"
                                          : "text-gray-400 group-hover:text-indigo-600",
                                      "size-6 shrink-0"
                                  )}
                                />
                                {item.name}
                              </a>
                            </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        My Account
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="lg:pl-72">
              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                  {/* Your content */}
                </div>
              </main>
            </div>
          </div>
        </>
    );
}
