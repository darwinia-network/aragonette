import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { TokenVotingAbi } from "@/plugins/tokenVoting/artifacts/TokenVoting.sol";
import { useEffect } from "react";
// import { PUB_TOKEN_VOTING_PLUGIN_ADDRESS } from "@/constants";
import useConstant from "@/hooks/useConstant";
import { Address } from "viem";

export function useUserCanVote(proposalId: bigint) {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { publicTokenVotingPluginAddress } = useConstant();

  const { data: canVote, refetch: refreshCanVote } = useReadContract({
    address: publicTokenVotingPluginAddress as Address,
    abi: TokenVotingAbi,
    functionName: "canVote",
    args: [proposalId, address!, 1],
    query: { enabled: !!address },
  });

  useEffect(() => {
    refreshCanVote();
  }, [blockNumber]);

  return canVote;
}
