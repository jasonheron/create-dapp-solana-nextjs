import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader, SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
const walletPublicKey = "4GUQQCHbpb6ZC23VBTC8tu7Lq93Qmv7oHNQiQeUQueHW";

export const GalleryView: FC = ({}) => {
 // const { connection } = useWallet();
   const [walletToParsePublicKey, setWalletToParsePublicKey] =
  useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
   // connection,
  });

  console.log("nfts", nfts);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWalletToParsePublicKey(value.trim());
  };

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  return (
    
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar bg-neutral text-neutral-content shadow-xl rounded-box">
          
          <div className="flex-1 px-2 mx-2">

                
                  <Link href="https://twitter.com/nifty_sol">
                    <a className="btn btn-ghost normal-case text-xl"><p><b>NiFTy's</b> Solana NFT Lookup</p></a>
                  </Link>

            
          </div>
          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <h1 className="mb-5 text-5xl">
                  NFT Gallery on Solana <SolanaLogo />
                </h1>

                <div className="w-full min-w-full">
                  <p className="mb-5">
                    Paste wallet below or connect your own to display NFTs inside.
                    
                  </p>
                  <div>
                    <div className="form-control mt-8">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Enter Wallet Address"
                            className="w-full input input-bordered input-lg"
                            value={walletToParsePublicKey}
                            onChange={onChange}
                            style={{
                              borderRadius:
                                "var(--rounded-btn,.5rem)",
                            }}
                          />

                          <SelectAndConnectWalletButton
                            onUseWalletClick={onUseWalletClick}
                          />
                        </div>
                    </div>
                  </div>
                </div>
                <div className="my-10">
                  {error ? (
                    <div>
                      <h1>Error Occures</h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <NftList nfts={nfts} error={error} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No NFTs found in this wallet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-5 items-start">
      {nfts?.map((nft) => (
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
  );
};