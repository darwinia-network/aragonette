import { useEffect, useState } from "react";
import { useChainId } from "wagmi";
import { IconType } from "@aragon/ods";
import { Address } from "viem";
import { crab, darwinia } from "viem/chains";

type PluginItem = {
  /** The URL fragment after /plugins */
  id: string;
  /** The name of the folder within `/plugins` */
  folderName: string;
  /** Title on menu */
  title: string;
  icon: IconType;
  pluginAddress: string;
};

const darwiniaPlugins: PluginItem[] = [
  {
    id: "community-proposals",
    folderName: "tokenVoting",
    title: "Community proposals",
    icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: (process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS ?? "") as Address,
  },
  {
    id: "delegate-wall",
    folderName: "delegateAnnouncer",
    title: "Delegation",
    icon: IconType.FEEDBACK,
    pluginAddress: (process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS ?? "") as Address,
  },
];

const carbPlugins: PluginItem[] = [
  {
    id: "community-proposals",
    folderName: "tokenVoting",
    title: "Community proposals",
    icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: (process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS_CRAB ?? "") as Address,
  },
  {
    id: "delegate-wall",
    folderName: "delegateAnnouncer",
    title: "Delegation",
    icon: IconType.FEEDBACK,
    pluginAddress: (process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS_CRAB ?? "") as Address,
  },
];

const koiPlugins: PluginItem[] = [
  {
    id: "community-proposals",
    folderName: "tokenVoting",
    title: "Community proposals",
    icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: (process.env.NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS_KOI ?? "") as Address,
  },
  {
    id: "delegate-wall",
    folderName: "delegateAnnouncer",
    title: "Delegation",
    icon: IconType.FEEDBACK,
    pluginAddress: (process.env.NEXT_PUBLIC_DELEGATION_CONTRACT_ADDRESS_KOI ?? "") as Address,
  },
];

export default function usePlugins() {
  const chainId = useChainId();
  const [plugins, setPlugins] = useState<PluginItem[]>(darwiniaPlugins);

  useEffect(() => {
    if (chainId === darwinia.id) {
      setPlugins([...darwiniaPlugins]);
    } else if (chainId === crab.id) {
      setPlugins([...carbPlugins]);
    } else if (chainId === 701) {
      setPlugins([...koiPlugins]);
    }
  }, [chainId]);

  return plugins;
}
