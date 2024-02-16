import { useEffect, useState } from "react";
import { DelegateAnnouncerAbi } from "@/plugins/delegateAnnouncer/artifacts/DelegateAnnouncer.sol";
import { Address, PublicClient, getAbiItem, fromHex } from "viem";
// import { useBlockNumber } from "wagmi";
import { DelegateAnnounce } from "../utils/types";

const AnnounceDelegationEvent = getAbiItem({abi: DelegateAnnouncerAbi, name: "AnnounceDelegation"})

export function useDelegateAnnouncements(
    publicClient: PublicClient,
    delegationContract: Address,
    daoAddress: Address
) {
    // const { data: blockNumber } = useBlockNumber({watch: true})
    const [delegateAnnouncements, setDelegateAnnouncements] = useState<DelegateAnnounce[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true)
            
        publicClient.getLogs({
            address: delegationContract,
            event: AnnounceDelegationEvent,
            args: {
                dao: daoAddress
            } as any,
            fromBlock: BigInt(10541166),
            toBlock: 'latest'
        }).then((logs: any) => {
            console.log('Logs: ', logs)
            setDelegateAnnouncements(
                logs.map((log) => ({
                    logIndex: log.logIndex,
                    dao: log.args.dao,
                    delegate: log.args.delegate,
                    message: fromHex(log.args.message, 'string'),
                }))
            )
        }).catch((err) => {
            console.error("Could not fetch the proposal defailt", err);
            return null;
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    return { delegateAnnouncements, isLoading }
}