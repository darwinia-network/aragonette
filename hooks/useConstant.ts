import { useEffect, useState } from "react";
import { crab, darwinia } from "viem/chains";
import { useChainId } from "wagmi";

export default function useConstant() {
  const [publicDaoAddress, setPublicDaoAddress] = useState<string>("");
  const [publicTokenAddress, setPublicTokenAddress] = useState<string>("");
  const [publicTokenVotingPluginAddress, setPublicTokenVotingPluginAddress] = useState<string>("");
  const [publicDelegationContractAddress, setPublicDelegationContractAddress] = useState<string>("");
  const [publicDelegationAnnouncementsStartBlock, setPublicDelegationAnnouncementsStartBlock] = useState<string>("");

  const chainId = useChainId();

  useEffect(() => {
    if (chainId === darwinia.id) {
      console.log("switched to darwinia");
      setPublicDaoAddress(process.env.NEXT_PUBLIC_DAO_ADDRESS ? process.env.NEXT_PUBLIC_DAO_ADDRESS : "");
      setPublicTokenAddress(process.env.NEXT_PUBLIC_TOKEN_ADDRESS ? process.env.NEXT_PUBLIC_TOKEN_ADDRESS : "");
      setPublicTokenVotingPluginAddress(
        process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS ? process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS : ""
      );
      setPublicDelegationContractAddress(
        process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS ? process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS : ""
      );
      setPublicDelegationAnnouncementsStartBlock(
        process.env.NEXT_PUBLIC_DELEGATION_ANNOUNCEMENTS_START_BLOCK
          ? process.env.NEXT_PUBLIC_DELEGATION_ANNOUNCEMENTS_START_BLOCK
          : ""
      );
    } else if (chainId === crab.id) {
      console.log("switched to crab");
      setPublicDaoAddress(process.env.NEXT_PUBLIC_DAO_ADDRESS_CRAD ? process.env.NEXT_PUBLIC_DAO_ADDRESS_CRAD : "");
      setPublicTokenAddress(
        process.env.NEXT_PUBLIC_TOKEN_ADDRESS_CRAD ? process.env.NEXT_PUBLIC_TOKEN_ADDRESS_CRAD : ""
      );
      setPublicTokenVotingPluginAddress(
        process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS_CRAD
          ? process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS_CRAD
          : ""
      );
      setPublicDelegationContractAddress(
        process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS_CRAD
          ? process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS_CRAD
          : ""
      );
      setPublicDelegationAnnouncementsStartBlock(
        process.env.NEXT_PUBLIC_DELEGATION_ANNOUNCEMENTS_START_BLOCK_CRAD
          ? process.env.NEXT_PUBLIC_DELEGATION_ANNOUNCEMENTS_START_BLOCK_CRAD
          : ""
      );
    } else if (chainId === 701) {
      console.log("switched to koi");
      setPublicDaoAddress(process.env.NEXT_PUBLIC_DAO_ADDRESS_KOI ? process.env.NEXT_PUBLIC_DAO_ADDRESS_KOI : "");
      setPublicTokenAddress(process.env.NEXT_PUBLIC_TOKEN_ADDRESS_KOI ? process.env.NEXT_PUBLIC_TOKEN_ADDRESS_KOI : "");
      setPublicTokenVotingPluginAddress(
        process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS_KOI
          ? process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS_KOI
          : ""
      );
      setPublicDelegationContractAddress(
        process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS_KOI
          ? process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS_KOI
          : ""
      );
      setPublicDelegationAnnouncementsStartBlock(
        process.env.NEXT_PUBLIC_DELEGATION_ANNOUNCEMENTS_START_BLOCK_KOI
          ? process.env.NEXT_PUBLIC_DELEGATION_ANNOUNCEMENTS_START_BLOCK_KOI
          : ""
      );
    }
  }, [chainId]);

  return {
    publicDaoAddress,
    publicTokenAddress,
    publicTokenVotingPluginAddress,
    publicDelegationContractAddress,
    publicDelegationAnnouncementsStartBlock,
  };
}
