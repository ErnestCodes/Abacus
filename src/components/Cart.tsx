import { Fragment, useEffect, useState } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import {
  products,
  navigation,
} from "../utils/data";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { getAllProducts } from "../features/products/productSlice";
import getGoogleOAuthURL from "../utils/getGoogleUrl";
import { loadingUser } from "../features/user/userSlice";
import FooterSection from "./FooterSection";
import { Link } from "react-router-dom";
import routes from "../routes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Cart() {
  const [open, setOpen] = useState(false);
  const { user, isSuccess, accessToken, refreshToken } = useSelector(
    (state: any) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProducts()) as any;

    if (isSuccess || accessToken || refreshToken) {
      dispatch(loadingUser()) as any;
    }
  }, [products, user, dispatch]);

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      {/** Mobile Navigation */}
      {/* <Header /> */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-indigo-600 border-indigo-600"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel
                      key={category.name}
                      className="pt-10 pb-8 px-4 space-y-10"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover"
                              />
                            </div>
                            <a
                              href={item.href}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute z-10 inset-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="font-medium text-gray-900"
                          >
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a
                                  href={item.href}
                                  className="-m-2 p-2 block text-gray-500"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {user ? (
                  <div className="flow-root">
                    <a className="-m-2 p-2 block font-medium text-gray-900">
                      Hello, {user && user.name}
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="flow-root">
                      <a
                        href={getGoogleOAuthURL()}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        Sign in
                      </a>
                    </div>
                    <div className="flow-root">
                      <a
                        href={getGoogleOAuthURL()}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        Create account
                      </a>
                      <a
                        href="#"
                        className="-m-2 mt-3 p-2 block font-medium text-gray-900"
                      >
                        Orders
                      </a>
                      {/* Cart */}
                          <a href="#" className="group mt-3 -m-2 p-2 flex items-center">
                            <ShoppingBagIcon
                              className="flex-shrink-0 h-6 w-6 text-gray-900"
                              aria-hidden="true"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-900">
                              0
                            </span>
                            <span className="sr-only">items in cart, view bag</span>
                          </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/** Main Navigation */}

      <header className="relative overflow-hidden">
        {/* Top navigation */}
        <nav
          aria-label="Top"
          className="relative z-20 bg-black bg-opacity-90 backdrop-filter backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-[#f0c14b] lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 mb-3 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-14 w-auto"
                    src="https://abacus-47e6d.web.app/img/abacus223.png"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-white",
                                "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0 bg-white text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />
                              {/* Fake border when menu is open */}
                              <div
                                className="absolute inset-0 top-0 h-px max-w-7xl mx-auto px-8"
                                aria-hidden="true"
                              >
                                <div
                                  className={classNames(
                                    open ? "bg-gray-200" : "bg-transparent",
                                    "w-full h-px transition-colors ease-out duration-200"
                                  )}
                                />
                              </div>

                              <div className="relative">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute z-10 inset-0"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-white"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {user ? (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a
                      href={getGoogleOAuthURL()}
                      className="text-sm font-medium text-white hover:text-gray-200"
                    >
                      Hello, {user && user.name}
                    </a>
                    <Link
                      to={routes.order}
                      className="text-sm font-medium text-white hover:text-gray-200"
                      >
                        Orders
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <a
                        href={getGoogleOAuthURL()}
                        className="text-sm font-medium text-white hover:text-gray-200"
                      >
                        Sign in
                      </a>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <a
                        href={getGoogleOAuthURL()}
                        className="text-sm font-medium text-white hover:text-gray-200"
                      >
                        Create account
                      </a>
                      
                    </div>
                  </>
                )}

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-200">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={routes.cart} className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-200"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-200">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

        <main className="lg:min-h-full lg:overflow-hidden lg:flex mt-10 mb-10 lg:flex-row-reverse">
            <div className="px-4 py-6 sm:px-6 lg:hidden">
                <div className="max-w-lg mx-auto flex">
                <a href="#">
                    <span className="sr-only">Workflow</span>
                    <img src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="" className="h-8 w-auto" />
                </a>
                </div>
            </div>

            <h1 className="sr-only">Checkout</h1>

            {/** Mobile order summary */}
            <section aria-labelledby="order-heading" className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
                <div className="max-w-lg mx-auto">
                <div className="flex items-center justify-between">
                    <h2 id="order-heading" className="text-lg font-medium text-gray-900">Your Order</h2>
                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" aria-controls="disclosure-1" aria-expanded="false">
                    {/** Only display for open option.*/}
                    {/* <span>Hide full summary</span> */}
                    {/** Don't display for open option.*/}
                    {/* <span>Show full summary</span> */}
                    </button>
                </div>

                <div id="disclosure-1">
                    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                        <li className="flex py-6 space-x-6">
                            <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md" />
                            <div className="flex flex-col justify-between space-y-4">
                            <div className="text-sm font-medium space-y-1">
                                <h3 className="text-gray-900">Micro Backpack</h3>
                                <p className="text-gray-900">$70.00</p>
                                <p className="text-gray-500">Moss</p>
                                <p className="text-gray-500">5L</p>
                            </div>
                            <div className="flex space-x-4">
                                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button>
                                <div className="flex border-l border-gray-300 pl-4">
                                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                </div>
                            </div>
                            </div>
                        </li>
                        <li className="flex py-6 space-x-6">
                            <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md" />
                            <div className="flex flex-col justify-between space-y-4">
                            <div className="text-sm font-medium space-y-1">
                                <h3 className="text-gray-900">Micro Backpack</h3>
                                <p className="text-gray-900">$70.00</p>
                                <p className="text-gray-500">Moss</p>
                                <p className="text-gray-500">5L</p>
                            </div>
                            <div className="flex space-x-4">
                                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button>
                                <div className="flex border-l border-gray-300 pl-4">
                                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                </div>
                            </div>
                            </div>
                        </li>
                        <li className="flex py-6 space-x-6">
                            <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md" />
                            <div className="flex flex-col justify-between space-y-4">
                            <div className="text-sm font-medium space-y-1">
                                <h3 className="text-gray-900">Micro Backpack</h3>
                                <p className="text-gray-900">$70.00</p>
                                <p className="text-gray-500">Moss</p>
                                <p className="text-gray-500">5L</p>
                            </div>
                            <div className="flex space-x-4">
                                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button>
                                <div className="flex border-l border-gray-300 pl-4">
                                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                </div>
                            </div>
                            </div>
                        </li>
                    {/** More products...*/} 
                    </ul>

                    <form className="mt-10">
                    <label className="block text-sm font-medium text-gray-700">Discount code</label>
                    <div className="flex space-x-4 mt-1">
                        <input type="text" id="discount-code-mobile" name="discount-code-mobile" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        <button type="submit" className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Apply</button>
                    </div>
                    </form>

                    <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
                    <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd className="text-gray-900">$210.00</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="flex">
                        Discount
                        <span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">CHEAPSKATE</span>
                        </dt>
                        <dd className="text-gray-900">-$24.00</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt>Taxes</dt>
                        <dd className="text-gray-900">$23.68</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt>Shipping</dt>
                        <dd className="text-gray-900">$22.00</dd>
                    </div>
                    </dl>
                </div>

                    <p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
                        <span className="text-base">Total</span>
                        <span className="text-base">$341.68</span>
                    </p>
                </div>
            </section>

             {/**Order summary */}
            <section aria-labelledby="summary-heading" className="hidden bg-gray-50 w-full max-w-md flex-col lg:flex">
                <h2 id="summary-heading" className="sr-only">Order summary</h2>

                <ul role="list" className="flex-auto overflow-y-auto divide-y divide-gray-200 px-6">
                <li className="flex py-6 space-x-6">
                    <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md" />
                    <div className="flex flex-col justify-between space-y-4">
                    <div className="text-sm font-medium space-y-1">
                        <h3 className="text-gray-900">Micro Backpack</h3>
                        <p className="text-gray-900">$70.00</p>
                        <p className="text-gray-500">Moss</p>
                        <p className="text-gray-500">5L</p>
                    </div>
                    <div className="flex space-x-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button>
                        <div className="flex border-l border-gray-300 pl-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                        </div>
                    </div>
                    </div>
                </li>
                <li className="flex py-6 space-x-6">
                    <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md" />
                    <div className="flex flex-col justify-between space-y-4">
                    <div className="text-sm font-medium space-y-1">
                        <h3 className="text-gray-900">Micro Backpack</h3>
                        <p className="text-gray-900">$70.00</p>
                        <p className="text-gray-500">Moss</p>
                        <p className="text-gray-500">5L</p>
                    </div>
                    <div className="flex space-x-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button>
                        <div className="flex border-l border-gray-300 pl-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                        </div>
                    </div>
                    </div>
                </li>
                <li className="flex py-6 space-x-6">
                    <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md" />
                    <div className="flex flex-col justify-between space-y-4">
                    <div className="text-sm font-medium space-y-1">
                        <h3 className="text-gray-900">Micro Backpack</h3>
                        <p className="text-gray-900">$70.00</p>
                        <p className="text-gray-500">Moss</p>
                        <p className="text-gray-500">5L</p>
                    </div>
                    <div className="flex space-x-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button>
                        <div className="flex border-l border-gray-300 pl-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                        </div>
                    </div>
                    </div>
                </li>

                {/** More products... */} 
                </ul>

                <div className="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
                    <form>
                        <label className="block text-sm font-medium text-gray-700">Discount code</label>
                        <div className="flex space-x-4 mt-1">
                        <input type="text" id="discount-code" name="discount-code" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <button type="submit" className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Apply</button>
                        </div>
                    </form>

                    <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
                        <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd className="text-gray-900">$210.00</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="flex">
                            Discount
                            <span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">CHEAPSKATE</span>
                        </dt>
                        <dd className="text-gray-900">-$24.00</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt>Taxes</dt>
                        <dd className="text-gray-900">$23.68</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt>Shipping</dt>
                        <dd className="text-gray-900">$22.00</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                        <dt className="text-base">Total</dt>
                        <dd className="text-base">$341.68</dd>
                        </div>
                    </dl>
                </div>
            </section>

    { /** Checkout form  */}
  <section aria-labelledby="payment-heading" className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24">
    <div className="max-w-lg mx-auto">
      {/* <div className="hidden pt-10 pb-16 lg:flex">
        <a href="#">
          <span className="sr-only">Workflow</span>
          <img src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="" className="h-8 w-auto" />
        </a>
      </div> */}

      <button type="button" className="w-full flex items-center justify-center bg-black border border-transparent text-white rounded-md py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
        <span className="sr-only">Pay with Apple Pay</span>
        <svg className="h-5 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20">
          <path d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z" />
        </svg>
      </button>

      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-white text-sm font-medium text-gray-500"> or </span>
        </div>
      </div>

      <form className="mt-6">
        <div className="grid grid-cols-12 gap-y-6 gap-x-4">
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1">
              <input type="email" id="email-address" name="email-address" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Name on card</label>
            <div className="mt-1">
              <input type="text" id="name-on-card" name="name-on-card" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Card number</label>
            <div className="mt-1">
              <input type="text" id="card-number" name="card-number" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="col-span-8 sm:col-span-9">
            <label className="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
            <div className="mt-1">
              <input type="text" name="expiration-date" id="expiration-date" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="col-span-4 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">CVC</label>
            <div className="mt-1">
              <input type="text" name="cvc" id="cvc" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <div className="mt-1">
              <input type="text" id="address" name="address" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="col-span-full sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <div className="mt-1">
              <input type="text" id="city" name="city" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="col-span-full sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">State / Province</label>
            <div className="mt-1">
              <input type="text" id="region" name="region" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div className="col-span-full sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">Postal code</label>
            <div className="mt-1">
              <input type="text" id="postal-code" name="postal-code" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-2">
          <div className="flex items-center h-5">
            <input id="same-as-shipping" name="same-as-shipping" type="checkbox" checked className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
          </div>
          <label className="text-sm font-medium text-gray-900">Billing address is the same as shipping address</label>
        </div>

        <button type="submit" className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Pay $341.68</button>

        <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
          {/** Heroicon name: solid/lock-closed*/}  
          <svg className="w-5 h-5 text-gray-400 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
          Payment details stored in plain text
        </p>
      </form>
    </div>
  </section>
</main>

      <FooterSection />
    </div>
  );
}

export default Cart;
