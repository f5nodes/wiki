import React, { useEffect, useState } from "react";

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

	useEffect(() => {
		const fetchLivePeers = async () => {
			try {
				const response = await fetch(rpc);
				const data = await response.json();

				const extractedPeers = data.result.peers.map((peer: any) => {
					const port = peer.node_info.listen_addr.split(":").pop();
					return `${peer.node_info.id}@${peer.remote_ip}:${port}`;
				});

				setPeers(extractedPeers.join(", "));
			} catch (error) {
				console.error(`Failed to fetch peers info for RPC ${rpc}:`, error);
			}
		};

		fetchLivePeers();
	}, []);

	return (
		<div>
			<h4>
				Live peers: <span>{peers.split(", ").length}</span>
			</h4>
			<CodeBlock language="bash">{`PEERS="${peers}"`}</CodeBlock>
		</div>
	);
};

export default LivePeers;
