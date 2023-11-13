import React, { useState } from "react";
import { bech32 } from "bech32";
import CodeBlock from "@theme/CodeBlock";

export const AddressConverter: React.FC<{}> = () => {
	const [address, setAddress] = useState("");
	const [convertedAddress, setConvertedAddress] = useState("");
	const [network, setNetwork] = useState("");

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
	};

	const handleNetworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNetwork(e.target.value);
	};

	const handleConvert = () => {
		try {
			let converted;

			if (address.startsWith("0x")) {
				// Convert from hexadecimal to Bech32
				const hexData = address.substr(2);
				const bytes = new Uint8Array(hexData.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
				const words = bech32.toWords(bytes);
				converted = bech32.encode(network, words);
			} else if (address.includes("1")) {
				// Convert from Bech32 to hexadecimal
				const decoded = bech32.decode(address);
				const bytes = new Uint8Array(bech32.fromWords(decoded.words));
				converted =
					"0x" +
					Array.from(bytes)
						.map((byte) => byte.toString(16).padStart(2, "0"))
						.join("");
			} else {
				// Handle invalid input address format
				throw new Error("Invalid address format");
			}

			setConvertedAddress(converted);
		} catch (error) {
			setConvertedAddress("Error: Invalid address or network");
		}
	};

	return (
		<div>
			<div className="convert-container">
				<input
					type="text"
					value={network}
					onChange={handleNetworkChange}
					placeholder="Network (e.g., dydx)"
					className="convert-input"
				/>
				<input
					type="text"
					value={address}
					onChange={handleAddressChange}
					placeholder="0x or Bech32 address"
					className="convert-input"
				/>

				<button type="button" onClick={handleConvert} className="convert-button button button--primary">
					Convert
				</button>
			</div>
			{convertedAddress && (
				<>
					<h4>Converted address:</h4>
					<CodeBlock language="bash">{convertedAddress}</CodeBlock>
				</>
			)}
		</div>
	);
};

export default AddressConverter;
