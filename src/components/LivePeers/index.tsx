import React, { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";

type Peer = {
	id: string;
	ip: string;
	port: string;
};

interface LivePeersProps {
	rpc: string;
}

const LivePeers: React.FC<LivePeersProps> = ({ rpc }) => {
	const [peers, setPeers] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchLivePeers = async () => {
			try {
				const response = await fetch(`${rpc}/net_info`);
				const data = await response.json();

				const extractedPeers = data.result.peers.map((peer: any) => {
					const port = peer.node_info.listen_addr.split(":").pop();
					return `${peer.node_info.id}@${peer.remote_ip}:${port}`;
				});

				setPeers(extractedPeers.join(", "));
				setIsLoading(false);
			} catch (error) {
				console.error(`Failed to fetch peers info for RPC ${rpc}:`, error);
				setIsLoading(false);
			}
		};

		fetchLivePeers();
	}, [rpc]);

	return (
		<>
			{isLoading ? (
				<p>Loading live peers...</p>
			) : (
				<>
					<h4>Live peers: {peers.split(", ").length}</h4>
					<CodeBlock language="bash">{`PEERS="${peers}"`}</CodeBlock>
				</>
			)}
		</>
	);
};

export default LivePeers;
