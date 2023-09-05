import React, { useEffect, useState } from "react";

type Peer = {
	id: string;
	ip: string;
	port: string;
};

const PeersInfo: React.FC = () => {
	const [peers, setPeers] = useState<Peer[]>([]);

	useEffect(() => {
		const fetchPeersInfo = async () => {
			try {
				const response = await fetch("https://zetachain-rpc.f5nodes.com/net_info");
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

		fetchPeersInfo();
	}, []);

	return (
		<div>
			<h2>Peers Information</h2>
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

export default PeersInfo;
