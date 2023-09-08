import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { CreateToken } from '../components/CreateToken';
import { Footer } from '../components/Footer';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>FC Memez</title>
        <meta
          content="FC Memez. First Farcaster meme contest organized by Energy. 
                   Upload your memes and create NFTs on the Zora network."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
        <meta name="application-name" content="FC Memez App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FC Memez App" />

        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="fc_logo_jokerified_192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="fc_logo_jokerified_152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="fc_logo_jokerified_180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="fc_logo_jokerified_167.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="fc_logo_jokerified_32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="fc_logo_jokerified_16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://fcmemez.vercel.app" />
        <meta name="twitter:title" content="FC Memez App" />
        <meta name="twitter:description" content="FC Memez. First Farcaster meme contest organized by Energy. 
                   Upload your memes and create NFTs on the Zora network." />
        <meta name="twitter:image" content="https://fcmemez.vercel.app/fc_logo_jokerified_192.png" />
        <meta name="twitter:creator" content="@Energy" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FC Memez App" />
        <meta property="og:description" content="FC Memez. First Farcaster meme contest organized by Energy. 
                   Upload your memes and create NFTs on the Zora network." />
        <meta property="og:site_name" content="FC Memez App" />
        <meta property="og:url" content="https://fcmemez.vercel.app" />
        <meta property="og:image" content="https://fcmemez.vercel.app/fc_logo_jokerified_192.png" />

      </Head>

      <main className={`${styles.main} dark text-foreground bg-background`}>
        
        <h1 className="text-6xl font-bold m-16">
          FC Meme Edition
        </h1>
        
        <ConnectButton />
        
        <CreateToken />
        
      </main>

      <Footer />
    </div>
  );
};

export default Home;
