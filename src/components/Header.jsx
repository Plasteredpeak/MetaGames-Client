import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import { IoExtensionPuzzleSharp } from "react-icons/io5";
import { LuSwords } from "react-icons/lu";
import { GiAncientSword, GiPistolGun, GiSwordwoman } from "react-icons/gi";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaChess, FaDice, FaGraduationCap, FaPlane } from "react-icons/fa";
import { BiSolidCarCrash, BiSolidGame } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";

import Web3 from "web3";

import Logo from "../assets/wLogo.png";

import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { tokenABI } from "../utils/contract.abi";

const items = [
  {
    name: "Action",
    description: "Action-packed gaming experiences",
    href: "/game/action",
    icon: LuSwords,
  },
  {
    name: "Adventure",
    description: "Embark on thrilling journeys and quests",
    href: "/game/adventure",
    icon: GiSwordwoman,
  },
  {
    name: "RPG",
    description:
      "Immerse yourself in rich storytelling and character development",
    href: "/game/role-playing-games-rpg",
    icon: GiAncientSword,
  },
  {
    name: "Strategy",
    description: "Exercise your strategic thinking and planning skills",
    href: "/game/strategy",
    icon: FaChess,
  },
  {
    name: "Shooter",
    description: "Get your adrenaline pumping with intense shooting action",
    href: "/game/shooter",
    icon: GiPistolGun,
  },
  {
    name: "Casual",
    description: "Relax and unwind with easy-to-play games",
    href: "/game/casual",
    icon: BiSolidGame,
  },
  {
    name: "Simulation",
    description: "Experience real-life scenarios and simulations",
    href: "/game/simulation",
    icon: FaPlane,
  },
  {
    name: "Puzzle",
    description: "Challenge your mind with brain-teasing puzzles",
    href: "/game/puzzle",
    icon: IoExtensionPuzzleSharp,
  },
  {
    name: "Racing",
    description: "Speed through thrilling races and competitions",
    href: "/game/racing",
    icon: BiSolidCarCrash,
  },
  {
    name: "Sports",
    description: "Compete in exciting sports challenges and events",
    href: "/game/sports",
    icon: MdSportsCricket,
  },
  {
    name: "Board Games",
    description: "Play classic and modern board games digitally",
    href: "/game/board-games",
    icon: FaDice,
  },
  {
    name: "Educational",
    description: "Learn while you play with educational games",
    href: "/game/educational",
    icon: FaGraduationCap,
  },
];

const callsToAction = [
  // { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  // { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(false);
  const [user, setUser] = useState(null);
  const [cartHasItems, setCartHasItems] = useState(false);
  const [cartAccessed, setCartAccessed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userAddress")) {
      setConnectedAccount(true);
      userBalance();
    }
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length > 0) {
        setCartHasItems(true);
      } else {
        setCartHasItems(false);
      }
    };

    // Listen for custom event
    window.addEventListener("cartUpdated", handleCartUpdate);

    window.addEventListener("cartAccessed", () => {
      setCartAccessed(true);
    });

    window.addEventListener("login", () => {
      setConnectedAccount(true);
      userBalance();
    });
  }, []);

  const userBalance = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        const contractAddress = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS;

        const contract = new web3.eth.Contract(tokenABI, contractAddress);

        const balance = await contract.methods.balanceOf(accounts[0]).call();

        const balanceInEther = web3.utils.fromWei(balance, "ether");

        setUser({ address: accounts[0], balance: balanceInEther });
      }
    } catch (e) {
      localStorage.clear();
      setConnectedAccount(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className=" bg-secondary">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex max-h-[10vh] cursor-pointer lg:flex-1">
          <a onClick={() => handleNavigation("/home")}>
            <img className="rounded-sm" src={Logo} alt="" width={80} />
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
            onClick={() => handleNavigation("/home")}
            className="cursor-pointer text-sm font-semibold leading-6  text-gray-300 hover:text-gray-100"
          >
            Home
          </a>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300  hover:text-gray-100">
              Category
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
              <Popover.Panel className=" absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-800 shadow-lg ring-1 ring-gray-900/5 no-scrollbar">
                <div className="max-h-96 overflow-y-auto p-4 no-scrollbar">
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
                          onClick={() => handleNavigation(item.href)}
                          className="block cursor-pointer font-semibold text-gray-300"
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
                      onClick={() => handleNavigation(item.href)}
                      className="flex cursor-pointer items-center justify-center gap-x-2.5 rounded-lg p-3 text-sm font-semibold leading-6 text-gray-300 hover:bg-gray-600"
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
            onClick={() => handleNavigation("/cart")}
            className="relative cursor-pointer text-sm font-semibold leading-6 text-gray-300 hover:text-gray-100"
          >
            Cart
            {cartHasItems && !cartAccessed && (
              <span className="absolute right-0 top-0 -mr-2 h-2 w-2 animate-pulse  rounded-full bg-red-500"></span>
            )}
          </a>
          <a
            onClick={() => handleNavigation("/my-games")}
            className="cursor-pointer text-sm font-semibold leading-6 text-gray-300 hover:text-gray-100"
          >
            My Games
          </a>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!connectedAccount ? (
            <>
              <a onClick={() => handleNavigation("/login")} className="btn">
                Log in
              </a>
              <a
                onClick={() => handleNavigation("/signup")}
                className="btn btn-accent ml-3"
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              <div className="dropdown dropdown-end dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost text-white"
                >
                  <span>My Account</span>
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none"
                    aria-hidden="true"
                  />
                </div>
                <div
                  tabIndex={0}
                  className="card dropdown-content card-compact z-[100] bg-base-100 p-2 shadow"
                >
                  <div className="card-body">
                    <p className="font-bold">{user?.address || ""}</p>
                    <p>Balance: {user?.balance || 0} GT</p>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-error text-white"
                onClick={() => {
                  localStorage.clear();
                  setConnectedAccount(false);
                  window.dispatchEvent(new Event("cartUpdated"));
                  handleNavigation("/home");
                }}
              >
                Log out
              </button>
            </>
          )}
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
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="fixed right-0 -mt-2 mr-2 text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <img className="h-40" src={Logo} alt="" />
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  onClick={() => handleNavigation("/home")}
                  className="-mx-3 block cursor-pointer rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  Home
                </a>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700">
                        Category
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
                            onClick={() => handleNavigation(item.href)}
                            className="block cursor-pointer rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <a
                  onClick={() => handleNavigation("/cart")}
                  className="-mx-3 block cursor-pointer rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  Cart
                </a>
                <a
                  onClick={() => handleNavigation("/my-games")}
                  className="-mx-3 block cursor-pointer rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                >
                  My Games
                </a>
              </div>

              <div className="">
                {!connectedAccount ? (
                  <>
                    <a
                      onClick={() => handleNavigation("/login")}
                      className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                    >
                      Log in
                    </a>
                    <a
                      onClick={() => handleNavigation("/signup")}
                      className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                    >
                      Sign up
                    </a>
                  </>
                ) : (
                  <a
                    onClick={() => {
                      localStorage.clear();
                      setConnectedAccount(false);
                      window.dispatchEvent(new Event("cartUpdated"));
                      handleNavigation("/home");
                    }}
                    className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-700"
                  >
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
