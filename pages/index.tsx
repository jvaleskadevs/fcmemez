import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { CreateToken } from '../components/CreateToken';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Communitary Edition</title>
        <meta
          content="Communitary Edition"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={`${styles.main} dark text-foreground bg-background`}>
        
        <h1 className="text-6xl font-bold m-16">
          Communitary Edition
        </h1>
        
        <ConnectButton />
        
        <CreateToken />
        
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with 💜 and Energy 💫
        </a>
      </footer>
    </div>
  );
};

export default Home;
