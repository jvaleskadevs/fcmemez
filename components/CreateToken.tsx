"use client";
import { useEffect, useState } from 'react';
import { BaseError, Address } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { Button, Input, Avatar, Link, Image } from '@nextui-org/react';
import { FileDropBox } from '../components/FileDropBox';
import { NFTStorage, File, Blob } from 'nft.storage';
import { 
  communityEditionManagerAddress, 
  communityEditionManagerAbi 
} from '../constants/communityEditionManager';

export function CreateToken() {
  const [imageFile, setImageFile] = useState<File>();
  const [tokenUri, setTokenUri] = useState<string>();
  const { address } = useAccount();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    abi: communityEditionManagerAbi,
    address: communityEditionManagerAddress,
    functionName: "createToken",
    args: [
      "0xE62DeBB4777791DC36E83fDeABDEA4b9411cF476",//process.env.NEXT_PUBLIC_MULTI_EDITION_TESTNET,
      tokenUri, 
      "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      process.env.NEXT_PUBLIC_MINTER_FIXED_PRICE_TESTNET,
      Math.floor(Date.now() / 1000), // now
      "1696976251", // 0ct 10, must be in the future
      0, // no limit per wallet
      0, // price -> 0 wei
      process.env.NEXT_PUBLIC_REWARDS_RECIPIENT_TESTNET
    ]
  });

  const {
   write, 
   data, 
   error, 
   isLoading, 
   isError 
  } = useContractWrite(config);
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });
  
  const toIPFS = async (imageFile) => {
    const client = new NFTStorage({ 
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN
    });
    /*
    const metadata = await client.store({
      name: 'Community Edition Test',
      description: 'Community Edition Test ...',
      image: imageFile,
      properties: {
        authors: [{ name: address }]
      }
    });
    setTokenUri(metadata.url);
    */
    setTokenUri("ipfs://bafyreicvasglirukzsyxboin5iztpby74slxezcjzmoqq2ntewnrwdo53y/metadata.json");
  }
  
  useEffect(() => {
    if (imageFile?.name) toIPFS(imageFile);
  }, [imageFile]);

  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold my-4">
        Create community token edition
      </h3>
     
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
        className="flex flex-col gap-2"
      >
        { !tokenUri && <FileDropBox setImageFile={setImageFile} /> }
        
        { imageFile && <Image src={URL.createObjectURL(imageFile)} radius="md" height={300} width={300} /> }
        
        { tokenUri && 
          <Input 
            type="text"
            label="TokenUri"
            variant="flat"
            color="success" 
            value={tokenUri}
            isReadOnly
          />}
        
        <Button 
          isDisabled={!write || !tokenUri} 
          type="submit" 
          size="lg" 
          color="secondary" 
          className="text-3xl font-bold"
        >
          Create
        </Button>
      </form>

      <br></br>
      <br></br>
      
      {!isSuccess && 
        <div>
           <Button 
            isIconOnly 
            as={Link}
            href="https://testnet.zora.co/collect/zgor:0xe62debb4777791dc36e83fdeabdea4b9411cf476/1"
            color="secondary" 
            variant="ligth" 
            aria-label="Cast meme"
            className="m-16"
          >
            <Image
              src="https://docs.zora.co/img/zoraOrb.svg"
            />            
          </Button>         
          <Button 
            isIconOnly 
            as={Link}
            href="https://warpcast.com/~/compose?text=Vote+for+my+meme&embeds%5B%5D=https%3A%2F%2Ftestnet.zora.co%2Fcollect%2Fzgor%3A0xe62debb4777791dc36e83fdeabdea4b9411cf476%2F1"
            color="secondary" 
            variant="solid" 
            aria-label="Cast meme"
            className="m-16"
          >
            <Image
              src="fc_logo.png"
            />            
          </Button>  
          <Input 
            type="text"
            label="Your minting link"
            variant="flat"
            color="success" 
            value={"https://testnet.zora.co/collect/zgor:0xe62debb4777791dc36e83fdeabdea4b9411cf476/1"}
            isReadOnly
            className="mb-4"
          />  
          <Input 
            type="text"
            label="Your ready to go cast"
            variant="flat"
            color="success" 
            value={"https://warpcast.com/~/compose?text=Vote+for+my+meme&embeds%5B%5D=https%3A%2F%2Ftestnet.zora.co%2Fcollect%2Fzgor%3A0xe62debb4777791dc36e83fdeabdea4b9411cf476%2F1"}
            isReadOnly
          />       
        </div>
      }
      
      <br></br>
      <br></br>
      
      {isPrepareError && <div>{prepareError?.message}</div>}
      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && <div>Transaction Hash: {data?.hash}</div>}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </div>
  );
}
