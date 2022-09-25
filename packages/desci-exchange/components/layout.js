import Head from 'next/head';
import Loading from './loading';
import Navbar from './navbar.js';
import { useUser } from '../lib/user';

let slogan = 'Abolishing suffering with the power of the invisible hand!';
/**
 * @typedef {import('react').ReactChildren} Children
 * @typedef {(props: import('./types.js').LayoutChildrenProps) => Children} ChildrenFn
 */
/**
 *
 * @param {import('./types.js').LayoutProps & {children: ChildrenFn}} props
 * @returns
 */
export default function Layout({
  callback,
  children,
  title = 'DeSci Exchange',
  description = slogan,
  navBgColor = 'bg--dsepurple',
  altLogo = false,
  image = 'images/desci-exchange-banner-logo-[Converted].png',
}) {
  // @ts-ignore
  const { user } = useUser();

  const logo = {
    src: altLogo
      ? '/images/desci-exchange/desci-exchange-text-logo-wide.svg'
      : '/images/desci-exchange/desci-exchange-text-logo-wide.svg',
    isDark: altLogo,
  };

  const jsonLD = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DeSci Exchange',
    slogan: slogan
  });

  return (
    <div className="nft-storage font-sans flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://desci.exchange" />
        <meta property="og:image" content={image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLD }}
        ></script>
      </Head>
      {callback ? (
        <>
          <Loading />
          {children({ user })}
        </>
      ) : (
        <>
          <Navbar bgColor={navBgColor} logo={logo} user={user} />
          <div className="flex flex-col flex-auto top-0">
            {children({ user })}
          </div>
        </>
      )}
    </div>
  );
}
