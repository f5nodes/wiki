import React, { useEffect, useState } from "react";

const Mainpage = () => {
	const [latestBlock, setLatestBlock] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const network = "Testnet 3";

	useEffect(() => {
		const fetchLatestBlock = async () => {
			try {
				const response = await fetch("https://f5nodes.com/api/aleo/blocks");
				const data = await response.json();
				setLatestBlock(data.maxHeight);
				setIsLoading(false);
			} catch (error) {
				console.error(`Failed to fetch network info for Aleo:`, error);
				setIsLoading(false);
			}
		};

		fetchLatestBlock();
	}, []);

	return (
		<>
			{isLoading ? (
				<h4>Loading metrics info...</h4>
			) : (
				<>
					<h4>
						🌐 Network: {network} | 📟 Latest Chain Block: {latestBlock}
					</h4>
				</>
			)}
		</>
	);
};

export default Mainpage;
