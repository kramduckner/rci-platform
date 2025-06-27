"use client"
import { useAuth } from './auth-context';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import {useState, useEffect} from "react"
import Image from "next/image";


const navigation: any = [
    // { name: "Home", href: "/", current: true },
    // { name: "About", href: "/about", current: false },
    // { name: "Catalog", href: "/catalog", current: false },
    // { name: "My Requests", href: "/requests", current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {

    const [userNavigation, setUserNavigation] = useState([
        { name: "Login", href: "/login" },
        { name: "Sign Up", href: "/signup" },
    ])

    const { user, signOut } = useAuth();
    
    useEffect(()=>{
        if (user){
            setUserNavigation([
                { name: "My Account", href: "/myAccount" },
                { name: "Log Out", href: "/logout" },
            ])
        }
    }, [user])
    
    const handleSignOut = async () => {
        signOut()
        window.location.reload(); 
    };
    
    return (
        <div className="min-h-full">
          <Disclosure as="nav" className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex shrink-0 items-center">
                    <img
                      src="/rci-logo.svg"
                      alt="Your Company"
                      className="hidden h-8 w-auto lg:block"
                    />
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">
                      View notifications
                    </span>
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">
                          Open user menu
                        </span>
                        <Image
                          width="100"
                          height="100"
                          alt=""
                          src={"/avatar.svg"}
                          className="size-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {userNavigation.map((item:any) => (
                      <MenuItem key={item.name}>
                        {item.action || true ?( 
                            <a
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              {item.name}
                            </a>) : <button  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">{item.name}</button>
                        }
                      </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-3">
                {navigation.map((item: any) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                      item.current
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                      "block border-l-4 py-2 pr-4 pl-3 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="shrink-0">
                    <Image
                      alt=""
                      src={"/avatar.svg"}
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">
                      View notifications
                    </span>
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item: any) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    {item.name}
                  </DisclosureButton>
                  ))}
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
    );
}
