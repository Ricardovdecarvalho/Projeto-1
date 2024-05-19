'use client';

import Sidenav from '@/components/Sidenav';
import { UserStorage } from '@/contexts/UserContext';

import { StrategyStorage } from '@/contexts/StrategyContext';
import { GlobalStorage } from '@/contexts/GlobalContext';
import Advice from '@/components/Advice';
import LoginPanda from '@/components/LoginPanda';
import StyledComponentsRegistry from '@/helpers/registry';

import GoToTop from '@/helpers/GoToTop';
import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/helpers/checkIsPublicRoute';
import PrivateRoute from '@/components/PrivateRoute';

import './globals.css';
import Script from 'next/script';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname);

  return (
    <html lang="pt-BR">
      <head>
        <meta name="prerender" content="style,script" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <title>Tecnologia Milionária</title>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function(d,t) {
          var BASE_URL="https://chat.automatende.com";
          var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
          g.src=BASE_URL+"/packs/js/sdk.js";
          g.defer = true;
          g.async = true;
          s.parentNode.insertBefore(g,s);
          g.onload=function(){
            window.chatwootSDK.run({
              websiteToken: 'UTcv9j87jcaQPECKfE8y8XLX',
              baseUrl: BASE_URL
            })
          }
          })(document,"script");
        `}
        </Script>
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStorage>
            <UserStorage>
              <StrategyStorage>
                <Sidenav />
                <LoginPanda />
                {isPublicPage && children}
                {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
                <Advice />
                <GoToTop />
              </StrategyStorage>
            </UserStorage>
          </GlobalStorage>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
