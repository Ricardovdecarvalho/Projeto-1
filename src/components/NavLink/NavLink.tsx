import React from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = React.PropsWithChildren &
  LinkProps & {
    className?: string;
    ariaLabel?: string;
  };

const NavLink = ({
  children,
  className,
  ariaLabel,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();

  const activeClass = pathname === props.href ? 'active' : '';
  return (
    <Link
      {...props}
      className={`${activeClass} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export default NavLink;
