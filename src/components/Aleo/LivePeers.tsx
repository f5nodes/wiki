import React, { useState, useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";

interface IPeer {
	ip: string;
	role: string;
}

const LivePeers: React.FC = () => {
	const [data, setData] = useState<[string, string][]>([]);
	const [selectedRole, setSelectedRole] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://aleo-api.f5nodes.com/testnet3/peers/all/metrics");
				const jsonData = await response.json();
				setData(jsonData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleRoleChange = (role: string) => {
		setSelectedRole(role);
	};

	const getFilteredPeers = (): IPeer[] => {
		return data
			.filter(([_, role]) => selectedRole === null || role === selectedRole)
			.map(([address, role]) => ({
				ip: role === "Validator" ? address.split(":")[0] + ":5000" : address,
				role,
			}));
	};

	const getIPString = (): string => {
		return getFilteredPeers()
			.map((peer) => peer.ip)
			.join(", ");
	};

	return (
		<div>
			<div className="button-group card" style={{ display: "flex", flexDirection: "row" }}>
				<button className="button button--primary" onClick={() => handleRoleChange("Prover")}>
					Provers
				</button>
				<button
					className="button button--primary"
					onClick={() => handleRoleChange("Validator")}
					style={{ flex: "1" }}>
					Validators
				</button>
				<button className="button button--primary" onClick={() => handleRoleChange("Client")}>
					Clients
				</button>
			</div>
			<div style={{ marginTop: "1rem" }}>
				{loading ? <h4>Loading live peers...</h4> : <h4>Live peers: {getIPString().split(", ").length}</h4>}
			</div>
			<CodeBlock language="bash" showLineNumbers>
				{loading ? "LOADING..." : getIPString()}
			</CodeBlock>
		</div>
	);
};

export default LivePeers;
