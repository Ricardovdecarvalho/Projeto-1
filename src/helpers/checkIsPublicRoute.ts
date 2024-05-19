import { APP_ROUTES } from "@/constants/appRoutes";

export const checkIsPublicRoute = (path: string) => {
  const appPublicRoutes = Object.values(APP_ROUTES.public);

  return appPublicRoutes.includes(path);
};
