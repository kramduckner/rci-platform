"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild
} from "@headlessui/react";
import {
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  BookOpenIcon,
  ChartBarIcon,     
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePathname } from 'next/navigation';


const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({sidebarOpen, setSidebarOpen}:any) {

const navigationItems = [
  { name: "Home", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "Catalog", href: "/dashboard/catalog", icon: BookOpenIcon, current: false },
  { name: "My Requests", href: "/dashboard/requests", icon: ClipboardDocumentListIcon, current: false },
  { name: "About", href: "/", icon: UsersIcon, current: false },
];

  const pathname = usePathname();

  const navigation = navigationItems.map((item) => ({
    ...item,
    current: pathname === item.href,
  }));


  return (
    <>
          <div className="sm:px-6">
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
                                      ? "bg-gray-50 text-sky-600"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-sky-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      item.current
                                        ? "text-sky-600"
                                        : "text-gray-400 group-hover:text-sky-600",
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
                            href="/myAccount"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-sky-600"
                          >
                            <Cog6ToothIcon
                              aria-hidden="true"
                              className="size-6 shrink-0 text-gray-400 group-hover:text-sky-600"
                            />
                            My Account
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
            <div className="hidden lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
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
                                  ? "bg-gray-50 text-sky-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-sky-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current
                                    ? "text-sky-600"
                                    : "text-gray-400 group-hover:text-sky-600",
                                  "size-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <hr className="my-2 border-t border-gray-200" />
                    <li className="mt-auto">
                      <a
                        href="/myAccount"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-sky-600"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-sky-600"
                        />
                        My Account
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
      
    </>
  );
}
