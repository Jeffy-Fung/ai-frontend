"use client";

import { useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  UsersIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { signOut } from "@/app/helpers/auth";
import { usePathname, useRouter } from "next/navigation";
import ChatSessionContext from "@/store/ChatSessionProvider";
import AuthContext from "@/store/AuthProvider";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

function getSubItems(
  pathname: string,
  sessionDrawerOpen: boolean,
  setSessionDrawerOpen: (open: boolean) => void,
  newsArticlesDrawerOpen: boolean,
  setNewsArticlesDrawerOpen: (open: boolean) => void
) {
  if (pathname !== "/chatbot" && pathname !== "/rag-chatbot") return [];

  if (pathname === "/chatbot") {
    return [
      {
        name: "Sessions",
        action: () => {
          setSessionDrawerOpen(!sessionDrawerOpen);
        },
        initial: "S",
        current: sessionDrawerOpen,
      },
    ];
  }

  return [
    {
      name: "Sessions",
      action: () => {
        setSessionDrawerOpen(!sessionDrawerOpen);
      },
      initial: "S",
      current: sessionDrawerOpen,
    },
    {
      name: "News Articles",
      action: () => {
        setNewsArticlesDrawerOpen(!newsArticlesDrawerOpen);
      },
      initial: "N",
      current: newsArticlesDrawerOpen,
    },
  ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const userNavigation = [
    {
      name: "Sign out",
      action: () => {
        signOut(router, setIsLoggedIn);
      },
    },
  ];

  const pathname = usePathname();

  const navigation = [
    {
      name: "User Profile",
      href: "/user-profile",
      icon: UsersIcon,
      current: pathname === "/user-profile",
    },
    {
      name: "Simple Chatbot",
      href: "/chatbot",
      icon: ChatBubbleLeftIcon,
      current: pathname === "/chatbot",
    },
    {
      name: "RAG Chatbot",
      href: "/rag-chatbot",
      icon: ChatBubbleLeftIcon,
      current: pathname === "/rag-chatbot",
    },
  ];
  const {
    sessionDrawerOpen,
    setSessionDrawerOpen,
    newsArticlesDrawerOpen,
    setNewsArticlesDrawerOpen,
  } = useContext(ChatSessionContext);

  const otherItems = getSubItems(
    pathname,
    sessionDrawerOpen,
    setSessionDrawerOpen,
    newsArticlesDrawerOpen,
    setNewsArticlesDrawerOpen
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoggedIn) {
    return <div>{children}</div>;
  }

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
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
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
                    {otherItems.length > 0 && (
                      <li>
                        <div className="text-xs/6 font-semibold text-gray-400">
                          Others
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {otherItems.map((item) => (
                            <li key={item.name}>
                              <button
                                onClick={item.action}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50 text-indigo-600"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <span
                                  className={classNames(
                                    item.current
                                      ? "border-indigo-600 text-indigo-600"
                                      : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                    "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium w-full"
                                  )}
                                >
                                  {item.initial}
                                </span>
                                <span className="truncate">{item.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
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
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
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
                {otherItems.length > 0 && (
                  <li>
                    <div className="text-xs/6 font-semibold text-gray-400">
                      Others
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {otherItems.map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={item.action}
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold w-full"
                            )}
                          >
                            <span
                              className={classNames(
                                item.current
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                              )}
                            >
                              {item.initial}
                            </span>
                            <span className="truncate">{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
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
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="size-5 rounded-full bg-gray-50" />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm/6 font-semibold text-gray-900"
                      >
                        {isLoggedIn ? "User" : "Guest"}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 size-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <button
                          onClick={item.action}
                          className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                        >
                          {item.name}
                        </button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
