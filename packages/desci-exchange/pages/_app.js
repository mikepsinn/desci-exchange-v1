import '../styles/global.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/layout.js';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { UserContext } from 'lib/user';
import Loading from 'components/loading';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

async function isLoggedIn() {
  const res = await fetch('/api/user');
  return res.ok;
}

/**
 * App Component
 *
 * @param {any} props
 */
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const [isUserBlockedModalShowing, setIsUserBlockedModalShowing] =
    useState(false);

  const handleIsLoggedIn = useCallback(async () => {
    const data = await isLoggedIn();
    if (!data) {
      setIsUserInitialized(true);
    }
    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setIsUserInitialized(true);
    }
  }, [user]);

  useEffect(() => {
    handleIsLoggedIn();
  }, [router, handleIsLoggedIn]);

  useEffect(() => {
    if (!pageProps.redirectTo && pageProps.needsUser) {
      return;
    }
    if (
      // If redirectTo is set, redirect if the user was not found.
      (pageProps.redirectTo && !pageProps.redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (pageProps.redirectIfFound && user)
    ) {
      router.push(router.query.returnUrl ?? pageProps.redirectTo);
    }
  }, [pageProps, user, router, isUserInitialized]);

  const [pendingAuthCheckRoute, setPendingAuthCheckRoute] = useState('');

  useEffect(() => {
    if (pendingAuthCheckRoute && isUserInitialized) {
      const str = pendingAuthCheckRoute.replace(/(^\/+|\/+$)/g, '');

      setPendingAuthCheckRoute('');
    }
  }, [pendingAuthCheckRoute, isUserInitialized, user, router]);

  useEffect(() => {
    Router.events.on('routeChangeComplete', (route) => {
      setPendingAuthCheckRoute(route.split('?')[0].toLowerCase());
    });
    setPendingAuthCheckRoute(
      window.location.pathname.split('?')[0].toLowerCase()
    );
  }, []);

  function handleClearUser() {
    setUser(null);
  }

  if (pageProps.needsUser && !user) {
    return <Loading />;
  }

  return (
    <>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <QueryClientProvider client={queryClient}>
          <UserContext.Provider
            // @ts-ignore
            value={{ user, handleClearUser, handleIsLoggedIn }}
          >
            <Layout {...pageProps}>
              {(props) => <Component {...pageProps} {...props} />}
            </Layout>
          </UserContext.Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
