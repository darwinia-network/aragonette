import { Address } from "viem";
import { useState, useEffect } from "react";
import { useBalance, useAccount, useReadContracts, useChainId } from "wagmi";
import { TokenVotingAbi } from "@/plugins/tokenVoting/artifacts/TokenVoting.sol";
// import { PUB_CHAIN, PUB_TOKEN_VOTING_PLUGIN_ADDRESS } from "@/constants";
import useConstant from "@/hooks/useConstant";

export function useCanCreateProposal() {
  const { address } = useAccount();
  const { publicTokenVotingPluginAddress } = useConstant();
  const [minProposerVotingPower, setMinProposerVotingPower] = useState<bigint>();
  const [votingToken, setVotingToken] = useState<Address>();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address,
    token: votingToken,
    chainId: chainId,
  });

  const { data: contractReads } = useReadContracts({
    contracts: [
      {
        chainId: chainId,
        address: publicTokenVotingPluginAddress as Address,
        abi: TokenVotingAbi,
        functionName: "minProposerVotingPower",
      },
      {
        chainId: chainId,
        address: publicTokenVotingPluginAddress as Address,
        abi: TokenVotingAbi,
        functionName: "getVotingToken",
      },
    ],
  });

  useEffect(() => {
    if (!contractReads?.length || contractReads?.length < 2) return;

    setMinProposerVotingPower(contractReads[0].result as bigint);
    setVotingToken(contractReads[1].result as Address);
  }, [contractReads?.[0]?.status, contractReads?.[1]?.status]);

  if (!address) return false;
  else if (!minProposerVotingPower) return true;
  else if (!balance) return false;
  else if (balance?.value >= minProposerVotingPower) return true;

  return false;
}
