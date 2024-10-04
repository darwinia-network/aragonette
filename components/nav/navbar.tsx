import WalletContainer from "@/components/WalletContainer";
import { plugins } from "@/plugins";
import { AvatarIcon, IconType } from "@aragon/ods";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MobileNavDialog } from "./mobileNavDialog";
import { NavLink, type INavLink } from "./navLink";
import { useChainId } from "wagmi";

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const chainId = useChainId();

  console.log("chain id", chainId);

  const navLinks: INavLink[] = [
    // { path: "/", id: "dashboard", name: "Dashboard", icon: IconType.APP_DASHBOARD },
    ...plugins.map((p) => ({
      id: p.id,
      name: p.title,
      path: `/plugins/${p.id}/#/`,
      icon: p.icon,
    })),
  ];

  return (
    <>
      <nav className="h-30 top-0 z-10 w-full flex-col gap-2 border-b border-b-neutral-100 p-3 md:px-6 md:pb-0 md:pt-5 lg:gap-3">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className={classNames(
              "flex cursor-pointer items-center gap-x-3 rounded-full md:rounded-lg",
              "outline-none focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset" // focus styles
            )}
          >
            {(chainId === 46 || chainId === 701) && (
              <Image src="/images/logo-icon.png" width="36" height="36" className="shrink-0" alt="Ring Dao" />
            )}
            <Image src="/images/logo.png" width="100" height="36" className="shrink-0" alt="Ring Dao" />
            {chainId === 701 && (
              <span className="hidden py-1 text-lg font-semibold leading-tight text-[#fff] sm:block md:text-xl">
                Test Version
              </span>
            )}
          </Link>
          <div className="z-20 flex items-center gap-x-2">
            <div className="shrink-0">
              <WalletContainer />
            </div>

            {/* Nav Trigger */}
            {/* <button
              onClick={() => setOpen(true)}
              className={classNames(
                "rounded-full border border-neutral-100 bg-neutral-0 p-1 md:hidden",
                "outline-none focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset" // focus styles
              )}
            >
              <AvatarIcon size="lg" icon={IconType.MENU} />
            </button> */}
          </div>
        </div>

        {/* Tab wrapper */}
        <ul className="hidden gap-x-10 md:flex lg:pl-14">
          {navLinks.map(({ id, name, path }) => (
            <NavLink name={name} path={path} id={id} key={id} />
          ))}
        </ul>
      </nav>
      <MobileNavDialog open={open} navLinks={navLinks} onOpenChange={setOpen} />
    </>
  );
};
