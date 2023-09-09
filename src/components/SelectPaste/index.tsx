import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

interface SelectPasteProps {
	rpc: string[];
}

const SelectPaste: React.FC<SelectPasteProps> = ({ rpc }) => {
	const [selectedRpc, setSelectedRpc] = useState<string>(rpc[0]);

	return (
		<div>
			<Admonition type="tip" icon="📘" title="How to Use">
				<p>Click on any RPC to paste it into the code block.</p>
			</Admonition>

			<CodeBlock language="bash" showLineNumbers>
				{`sudo systemctl stop zetacored

cp $HOME/.zetacored/data/priv_validator_state.json $HOME/.zetacored/priv_validator_state.json.backup
zetacored tendermint unsafe-reset-all --home $HOME/.zetacored --keep-addr-book

CUSTOM_RPC="${selectedRpc}"

LATEST_HEIGHT=$(curl -s $CUSTOM_RPC/block | jq -r .result.block.header.height)
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1500))
TRUST_HASH=$(curl -s "$CUSTOM_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)

echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH

sed -i 's|^enable *=.*|enable = true|' $HOME/.zetacored/config/config.toml
sed -i 's|^rpc_servers *=.*|rpc_servers = "'$CUSTOM_RPC,$CUSTOM_RPC'"|' $HOME/.zetacored/config/config.toml
sed -i 's|^trust_height *=.*|trust_height = '$BLOCK_HEIGHT'|' $HOME/.zetacored/config/config.toml
sed -i 's|^trust_hash *=.*|trust_hash = "'$TRUST_HASH'"|' $HOME/.zetacored/config/config.toml

mv $HOME/.zetacored/priv_validator_state.json.backup $HOME/.zetacored/data/priv_validator_state.json

sudo systemctl restart zetacored
sudo journalctl -u zetacored -f --no-hostname -o cat
 `}
			</CodeBlock>

			<div className="button-group card">
				{rpc.map((item, index) => (
					<button className="button button--secondary" key={index} onClick={() => setSelectedRpc(item)}>
						{item}
					</button>
				))}
			</div>
		</div>
	);
};

export default SelectPaste;
