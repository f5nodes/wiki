import React, { useEffect, useState } from "react";

interface MainpageMetricsProps {
	rpc: string;
	binary: string;
}

const MainpageMetrics: React.FC<MainpageMetricsProps> = ({ rpc, binary }) => {
	const [network, setNetwork] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchNetworkInfo = async () => {
			try {
				const response = await fetch(`${rpc}/status`);
				const data = await response.json();

				const networkInfo = data.result.node_info.network;
				setNetwork(networkInfo);
				setIsLoading(false);
			} catch (error) {
				console.error(`Failed to fetch network info for RPC ${rpc}:`, error);
				setIsLoading(false);
			}
		};

		fetchNetworkInfo();
	}, [rpc]);

	return (
		<>
			{isLoading ? (
				<p>Loading metrics info...</p>
			) : (
				<>
					<h4>
						🌐 Network: {network} | 📟 Binary Name: {binary}
					</h4>
				</>
			)}
		</>
	);
};

export default MainpageMetrics;
