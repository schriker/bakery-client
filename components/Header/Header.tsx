import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

export type HeaderPtopsType = {
  title?: string;
  ogImage?: string;
  ogDescription?: string;
};

export default function Header({
  title = process.env.NEXT_PUBLIC_SITE_TITLE,
  ogImage = process.env.NEXT_PUBLIC_SITE_IMAGE,
  ogDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
}: HeaderPtopsType) {
  let router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_HOST}${router.asPath}`} />
      <meta
        property="og:site_name"
        content={process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <meta property="og:image" content={ogImage} />
      <meta property="og:description" content={ogDescription} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=auto"
      ></meta>

      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      {/* Change Google ID */}
      {/* <link rel="manifest" href="/manifest.json"></link> */}
      {/* <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-131295801-1"
      ></script> */}
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments)}
        gtag("js", new Date());
        gtag("config", "UA-131295801-1");
    `,
        }}
      ></script> */}
    </Head>
  );
}
