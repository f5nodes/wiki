import React, { useEffect, useState } from "react";

const LivePeers = () => {
	const [peers, setPeers] = useState([]);

	useEffect(() => {
		const fetchLivePeers = async () => {
			try {
				const response = await fetch("https://zetachain-rpc.f5nodes.com/net_info");
				const data = await response.json();
				console.log(data);
				setPeers(data);
			} catch (error) {
				console.error("Failed to fetch peers info:", error);
			}
		};

		fetchLivePeers();
	}, []);

	return (
		<div>
			<h2>Peers Information</h2>
			{data}
		</div>
	);
};

export default LivePeers;
