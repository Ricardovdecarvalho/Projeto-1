'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const GoToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window === undefined) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
};

export default GoToTop;
