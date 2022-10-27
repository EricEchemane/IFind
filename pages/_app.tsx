import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import UserContextProvider from 'contexts/user.context';
import { SessionProvider } from 'next-auth/react';

interface AppPropsWithSession extends AppProps {
  pageProps: { session: any; };
}

function MyApp({ Component, pageProps }: AppPropsWithSession) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <UserContextProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: 'light',
              fontFamily: "Inter, sans-serif"
            }}>
            <ModalsProvider>
              <NotificationsProvider position='top-center'>
                <NavigationProgress />
                <Component {...pageProps} />
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </UserContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
