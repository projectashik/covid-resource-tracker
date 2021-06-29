import { Card } from "./Corona/Card";
import Link from "next/link";

const LinkSelector = ({
  isNormalLink,
  href,
  children,
}: {
  isNormalLink: boolean;
  href: string;
  children: any;
}) => {
  if (!isNormalLink) {
    return <Link href={href}>{children}</Link>;
  } else {
    return <a href={href}>{children}</a>;
  }
};

export const ResourceCard = ({
  image,
  title,
  normalLink = false,
  href,
}: {
  image: any;
  title: string;
  normalLink?: boolean;
  href: string;
}) => {
  const ele = (
    <div
      className="h-52 hover:cursor-pointer bg-cover rounded shadow-md flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.69) 0%, rgba(0, 0, 0, 0.69) 97.83%), url(images/${image})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <p className="text-2xl text-white">{title}</p>
    </div>
  );
  return (
    <LinkSelector isNormalLink={normalLink} href={href}>
      {ele}
    </LinkSelector>
  );
};
