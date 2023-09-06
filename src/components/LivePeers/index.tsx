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
	const [peers, setPeers] = useState<Peer[]>([]);

	useEffect(() => {
		const fetchLivePeers = async () => {
			try {
				const response = await fetch(rpc);
				const data = await response.json();

				const extractedPeers = data.result.peers.map((peer: any) => {
					const port = peer.node_info.listen_addr.split(":").pop();
					return {
						id: peer.node_info.id,
						ip: peer.remote_ip,
						port: port,
					};
				});

				setPeers(extractedPeers);
			} catch (error) {
				console.error("Failed to fetch peers info:", error);
			}
		};

		fetchLivePeers();
	}, []);

	return (
		<div>
			<h2>Peers Information</h2>
			<h4>
				All peers: <span>{peers.length}</span>
			</h4>
			<ul>
				{peers.map((peer) => (
					<li key={peer.id}>
						ID: {peer.id}, IP: {peer.ip}, Port: {peer.port}
					</li>
				))}
			</ul>
		</div>
	);
};

export default LivePeers;
