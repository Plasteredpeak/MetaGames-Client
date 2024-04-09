import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import { IoGameControllerOutline } from "react-icons/io5";

import Logo from "../assets/wLogo.png";

import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { getGenres } from "../services/igdb.services";

const items = [
  {
    name: "Action",
    description: "Action-packed gaming experiences",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Indie",
    description: "Explore unique and creative games",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Adventure",
    description: "Embark on thrilling journeys and quests",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "RPG",
    description:
      "Immerse yourself in rich storytelling and character development",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Strategy",
    description: "Exercise your strategic thinking and planning skills",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Shooter",
    description: "Get your adrenaline pumping with intense shooting action",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Casual",
    description: "Relax and unwind with easy-to-play games",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Simulation",
    description: "Experience real-life scenarios and simulations",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Puzzle",
    description: "Challenge your mind with brain-teasing puzzles",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Arcade",
    description: "Enjoy classic arcade-style gaming fun",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Platformer",
    description: "Leap and run through platforming adventures",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Racing",
    description: "Speed through thrilling races and competitions",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Massively Multiplayer",
    description: "Join vast online communities and play with friends",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Sports",
    description: "Compete in exciting sports challenges and events",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Fighting",
    description: "Enter the arena and engage in epic battles",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Family",
    description: "Fun for the whole family to enjoy together",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Board Games",
    description: "Play classic and modern board games digitally",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Educational",
    description: "Learn while you play with educational games",
    href: "#",
    icon: IoGameControllerOutline,
  },
  {
    name: "Card",
    description: "Test your skills with card games and collectibles",
    href: "#",
    icon: IoGameControllerOutline,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();
      setGenres(genres);

      console.log(genres);
    };
    fetchGenres();
  }, []);

  return (
    // sticky top-0 z-50 (if i ever want it to be sticky)
    <header className=" bg-secondary">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="max-h-[10vh flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>

            <img
              className=" rounded-sm"
              src={Logo}
              alt=""
              height={100}
              width={100}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a
            href="/home"
            className="text-sm font-semibold leading-6 text-gray-300  hover:text-gray-100"
          >
            Home
          </a>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300  hover:text-gray-100">
              Product
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-300  hover:text-gray-100"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className=" no-scrollbar absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-800 shadow-lg ring-1 ring-gray-900/5">
                <div className="no-scrollbar max-h-80 overflow-y-auto p-4">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-700"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-700 group-hover:bg-gray-900">
                        <item.icon
                          className="h-6 w-6 text-gray-300 group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-300"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-700">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-300 hover:bg-gray-600"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-300 hover:text-gray-100"
          >
            Marketplace
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-300  hover:text-gray-100"
          >
            Company
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="btn">
            Log in
          </a>
          <a href="/signup" className="btn btn-accent ml-3">
            Sign up
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={Logo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/home"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  Home
                </a>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...items, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
