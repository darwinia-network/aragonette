import { Address, erc20Abi } from "viem";
import { useReadContract } from "wagmi";
import useConstant from "@/hooks/useConstant";

export function useVotingToken() {
  const { publicTokenAddress } = useConstant();
  const {
    data: tokenSupply,
    isError: isError1,
    isLoading: isLoading1,
  } = useReadContract({
    address: publicTokenAddress as Address,
    abi: erc20Abi,
    functionName: "totalSupply",
  });

  const {
    data: tokenSymbol,
    isError: isError2,
    isLoading: isLoading2,
  } = useReadContract({
    address: publicTokenAddress as Address,
    abi: erc20Abi,
    functionName: "symbol",
  });

  return {
    address: publicTokenAddress as Address,
    tokenSupply,
    symbol: tokenSymbol,
    status: {
      isLoading: isLoading1 || isLoading2,
      isError: isError1 || isError2,
    },
  };
}
