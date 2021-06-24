import Link from "next/link";

export const NavLink = (props: NavLinkType) => {
  return (
    <Link href={props.href}>
      <a className="text-red-400 hover:text-red-600">{props.children}</a>
    </Link>
  );
};

export interface NavLinkType {
  href: string;
  children: string;
}
