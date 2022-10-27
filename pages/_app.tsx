import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          fontFamily: "Inter, sans-serif"
        }}>
        <ModalsProvider>
          <NotificationsProvider position='top-center'>
            <NavigationProgress />
            <Component {...pageProps} />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
