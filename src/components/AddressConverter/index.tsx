import React, { useState } from "react";
import { bech32 } from "bech32";

export const AddressConverter: React.FC<{}> = () => {
	const [address, setAddress] = useState("");
	const [convertedAddress, setConvertedAddress] = useState("");
	const [hrp, setHrp] = useState("");

	const handleAddressChange = (e: any) => {
		setAddress(e.target.value);
	};

	const handleHrpChange = (e: any) => {
		setHrp(e.target.value);
	};

	const handleConvert = () => {
		try {
			let converted;
			if (address.startsWith("0x")) {
				const data = Buffer.from(address.substr(2), "hex");
				converted = bech32.encode(hrp, bech32.toWords(data));
			} else {
				const decoded = bech32.decode(address);
				converted = "0x" + Buffer.from(bech32.fromWords(decoded.words)).toString("hex");
			}

			setConvertedAddress(converted);
		} catch (error) {}
	};

	return (
		<div>
			<div className="flex items-center gap-3 mb-3">
				<input
					type="text"
					value={hrp}
					onChange={handleHrpChange}
					placeholder="HRP (e.g., dydx)"
					className="bg-yellow-800 dark:bg-red-800"
				/>
				<input
					type="text"
					value={address}
					onChange={handleAddressChange}
					placeholder="0x or Bech32 address"
					className="bg-yellow-800 dark:bg-red-800"
				/>

				<button type="button" onClick={handleConvert} className="hover:dark:border-green-500">
					Convert
				</button>
			</div>
			<p>Converted address: {convertedAddress}</p>
		</div>
	);
};

export default AddressConverter;
