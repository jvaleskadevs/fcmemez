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
        <title>FC Meme Edition</title>
        <meta
          content="FC Meme Edition. First Farcaster meme contest organized by Energy. 
                   Upload your memes and create NFTs on the Zora network."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
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
