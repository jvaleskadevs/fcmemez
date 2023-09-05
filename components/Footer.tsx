import { Button, Input, Link, Image } from '@nextui-org/react';
import styles from '../styles/Home.module.css';

export function Footer () {
  return (
    <footer className={styles.footer}>
      <div className="flex flex-row">
         <Button 
          isIconOnly 
          as={Link}
          href="https://zora.co"
          rel="noopener noreferrer"
          target="_blank"
          color="secondary" 
          variant="light" 
          aria-label="Zora"
          className="m-4 ml-16 mt-0"
        >
          <Image
            src="https://docs.zora.co/img/zoraOrb.svg"
          />            
        </Button>         
        <Button 
          isIconOnly 
          as={Link}
          href="https://farcaster.xyz"
          rel="noopener noreferrer"
          target="_blank"
          color="secondary" 
          variant="solid" 
          aria-label="Farcaster"
          className="m-4 mr-16 mt-0"
        >
          <Image
            src="fc_logo.png"
          />            
        </Button> 
      </div>
      <a href="https://777.energy" rel="noopener noreferrer" target="_blank">
        Made with 💜 and Energy 💫
      </a>
    </footer>  
  );
}
