"use client";
import { useEffect, useState } from 'react';
import { BaseError, Address } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { Button, Input, Link, Image, Snippet } from '@nextui-org/react';
import { FileDropBox } from '../components/FileDropBox';
import { CopyButton } from '../components/CopyButton';
import { NFTStorage, File, Blob } from 'nft.storage';
import { 
  communityEditionManagerAddress, 
  communityEditionManagerAbi 
} from '../constants/communityEditionManager';

export function CreateToken() {
  const [imageFile, setImageFile] = useState<File>();
  const [metadata, setMetadata] = useState<any>();
  const [tokenId, setTokenId] = useState<string>();
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
      metadata?.url, 
      "115792089237316195423570985008687907853269984665640564039457584007913129639935", // max uint256
      process.env.NEXT_PUBLIC_MINTER_FIXED_PRICE_TESTNET,
      Math.floor(Date.now() / 1000), // now
      "1696976251", // 0ct 10, must be in the future
      0, // no limit per wallet
      0, // price -> 0 wei
      process.env.NEXT_PUBLIC_REWARDS_RECIPIENT_TESTNET
    ],
    onSuccess(data) {
      console.log('Success', data);
      if (isSuccess) return;
      setTokenId(data.result as string);
    }
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
    
    const metadata = await client.store({
      name: 'Meme Edition Test',
      description: 'Meme Edition Test ...',
      image: imageFile,
      properties: {
        authors: [{ name: address }]
      }
    });
    console.log(metadata);
    setMetadata(metadata);
    
    //setTokenUri("ipfs://bafyreicvasglirukzsyxboin5iztpby74slxezcjzmoqq2ntewnrwdo53y/metadata.json");
  }
  
  useEffect(() => {
    if (imageFile?.name) toIPFS(imageFile);
  }, [imageFile]);

  return (
    <div className="my-8 max-w-sm">
      <h3 className="text-xl font-semibold my-4">
        {isSuccess 
          ? 'Congrats! Your meme is a cool nft, now!' 
            : 'Create an NFT from your meme on Zora'}
      </h3>
     
     { !isSuccess && 
        <form
          onSubmit={(e) => {
            e.preventDefault();
            write?.();
          }}
          className="flex flex-col gap-2 min-h-full"
        >
          { !imageFile && <FileDropBox setImageFile={setImageFile} /> }
          
          { imageFile && <Image src={URL.createObjectURL(imageFile)} radius="md" height={300} width={300} /> }
          
          { imageFile && 
            <Input 
              type="text"
              label="Metadata"
              variant="flat"
              color={metadata ? 'success' : 'warning'}
              value={metadata ? metadata.url : 'uploading...'}
              isReadOnly
            />}
          
          <Button 
            isDisabled={!write || !metadata || isPending} 
            type="submit" 
            size="lg" 
            color="secondary" 
            className="text-3xl font-bold"
          >
            Create
          </Button>
        </form>
      }
      

      <br></br>
      
      {isSuccess && 
        <div>
           <Button 
            isIconOnly 
            as={Link}
            href={`https://testnet.zora.co/collect/zgor:0xe62debb4777791dc36e83fdeabdea4b9411cf476/${tokenId}`}
            rel="noopener noreferrer"
            target="_blank"            
            color="secondary" 
            variant="light" 
            aria-label="Open in Zora"
            className="mx-16 my-8"
          >
            <Image
              src="https://docs.zora.co/img/zoraOrb.svg"
            />            
          </Button>         
          <Button 
            isIconOnly 
            as={Link}
            href={`https://warpcast.com/~/compose?text=Vote+for+my+meme+by+minting+it+on+Zora&embeds%5B%5D=https%3A%2F%2Ftestnet.zora.co%2Fcollect%2Fzgor%3A0xe62debb4777791dc36e83fdeabdea4b9411cf476%2F${tokenId}+https://nft.storage.link/ipfs${metadata?.data.image.pathname.slice(1)}`}
            rel="noopener noreferrer"
            target="_blank"
            color="secondary" 
            variant="solid" 
            aria-label="Cast meme"
            className="mx-16 my-8"
          >
            <Image
              src="fc_logo.png"
            />            
          </Button>  
          <p className="text-md m-4 mt-0">Cast your Zora nft on FC memes channel!</p>
          <Input 
            type="text"
            label="Your minting link"
            variant="flat"
            color="success" 
            value={`https://testnet.zora.co/collect/zgor:0xe62debb4777791dc36e83fdeabdea4b9411cf476/${tokenId}`}
            isReadOnly
            className="mb-4"
            endContent={<CopyButton value={`https://testnet.zora.co/collect/zgor:0xe62debb4777791dc36e83fdeabdea4b9411cf476/${tokenId}`} />}
          />
          <Input 
            type="text"
            label="Your ready to go cast"
            variant="flat"
            color="success" 
            value={`https://warpcast.com/~/compose?text=Vote+for+my+meme+by+minting+it+on+Zora&embeds%5B%5D=https%3A%2F%2Ftestnet.zora.co%2Fcollect%2Fzgor%3A0xe62debb4777791dc36e83fdeabdea4b9411cf476%2F${tokenId}+https://nft.storage.link/ipfs${metadata?.data.image.pathname.slice(1)}`}
            isReadOnly
            endContent={<CopyButton value={`https://warpcast.com/~/compose?text=Vote+for+my+meme+by+minting+it+on+Zora&embeds%5B%5D=https%3A%2F%2Ftestnet.zora.co%2Fcollect%2Fzgor%3A0xe62debb4777791dc36e83fdeabdea4b9411cf476%2F${tokenId}+https://nft.storage.link/ipfs${metadata?.data.image.pathname.slice(1)}`} />}
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
