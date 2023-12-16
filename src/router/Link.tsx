import router from ".";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Link({ children, href }: LinkProps) {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!href) {
      return;
    }

    router.goTo(href);
  };

  return (
    <a href={href} onClick={handleLinkClick}>
      {children}
    </a>
  );
}
