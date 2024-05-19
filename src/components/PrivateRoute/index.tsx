import { APP_ROUTES } from '@/constants/appRoutes';
import { checkUserAuthenticated } from '@/helpers/checkUserAuthenticated';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const { push } = useRouter();

  const isUserAuthenticated = checkUserAuthenticated();

  useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.login);
    }
  }, [isUserAuthenticated, push]);

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
