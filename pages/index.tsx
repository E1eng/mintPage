import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { 
  MediaRenderer,  
  Web3Button, 
  useActiveClaimConditionForWallet, 
  useAddress, 
  useClaimIneligibilityReasons, 
  useContract, 
  useContractMetadata,  
  useTotalCirculatingSupply, 
  useTotalCount 
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import gif from "../public/4mb.gif";


const Home: NextPage = () => {
  const address = useAddress();
  const router = useRouter();
  const maxClaimQuantity = 10;


  const {
    contract
  } = useContract(CONTRACT_ADDRESS);

  const {
    data: contractMetadata,
    isLoading: isContractMetadataLoading,
  } = useContractMetadata(contract,);

  const {
    data: activeClaimPhase,
    isLoading: isActiveClaimPhaseLoading,
  } = useActiveClaimConditionForWallet(contract, address, [0]);

  const {
    data: claimIneligibilityReasons,
    isLoading: isClaimIneligibilityReasonsLoading,
  } = useClaimIneligibilityReasons(
    contract, 
    {
      
      walletAddress: address || "",
      quantity: 1,
    }
  );

  const {
    data: totalSupply,
    isLoading: isTotalSupplyLoading,
  } = useTotalCount(contract);
  const {
    data: totalClaimSupply,
    isLoading: isTotalClaimSupplyLoading,
  } = useTotalCirculatingSupply(contract, [0]);

  

  const [claimQuantity, setClaimQuantity] = useState(1);
  const increment = () => {
    if (claimQuantity < maxClaimQuantity) {
      setClaimQuantity(claimQuantity + 1);
    }
  };
  const decrement = () => {
    if (claimQuantity > 1) {
      setClaimQuantity(claimQuantity - 1);
    }
  };


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {!isContractMetadataLoading && (
          <div className={styles.heroSection}>
            <h1 className={styles.name}>Tirwin Series</h1>
            <div className={styles.collectionImage}>
              <MediaRenderer
                src={gif.src}
              />
            </div>
            <div className={styles.descriptionHeader}>
              <p className={styles.descriptionHead}>A crystal, a dream, a life transformed: The Crystal of Prosperity</p>
              {!isActiveClaimPhaseLoading ? (
                <div>
                  <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                  <p>Price: {ethers.utils.formatUnits(activeClaimPhase?.price!)} ETH</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              {!isTotalSupplyLoading && !isTotalClaimSupplyLoading ? (
                <p className={styles.Minted}>Minted: {totalClaimSupply?.toNumber()} / {555}</p>
              ) : (
                <p>Loading...</p>
              )}
              {address ? (
                !isClaimIneligibilityReasonsLoading ? (
                  claimIneligibilityReasons?.length! > 0 ? (
                    claimIneligibilityReasons?.map((reason, index) => (
                      <p className={styles.reason} key={index}>{reason}</p>
                    ))
                  ) : (
                    <div>
                      <p></p>
                      <div className={styles.claimContainer}>
                        <div className={styles.claimValue}>
                          <button
                            className={styles.claimBtn}
                            onClick={decrement}
                          >-</button>
                          <input
                            className={styles.claimInput}
                            type="button"
                            value={claimQuantity}
                          />
                          <button
                            className={styles.claimBtn}
                            onClick={increment}
                          >+</button>
                        </div>
                        <Web3Button 
                          contractAddress={CONTRACT_ADDRESS}
                          action={(contract) =>  contract.erc721.claim(claimQuantity)}
                          onSuccess={() => router.push(`/profile/${address}`)} 
                        >Mint Now</Web3Button>
                      </div>
                    </div>
                  )
                ) : (
                  <p className={styles.walletConnected}>Checking Eligibility...</p>
                )
              ) : (
                <p className={styles.walletConnected}>Connect Your Wallet!</p>
              )}
              <div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

