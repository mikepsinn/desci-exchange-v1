import { SessionProvider } from "next-auth/react";
import "./styles.css";

import type { AppProps } from "next/app";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  // if (
  //   process.env.NEXT_PUBLIC_SUPABASE_URL &&
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // ) {
  //   return (
  //     <UserProvider supabaseClient={supabaseClient}>
  //       <Component {...pageProps} />
  //     </UserProvider>
  //   );
  // }
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
