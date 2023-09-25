export const stateSync = `sudo systemctl stop {{binary}}

cp $HOME/.{{home}}/data/priv_validator_state.json $HOME/.{{home}}/priv_validator_state.json.backup
{{binary}} tendermint unsafe-reset-all --home $HOME/.{{home}} --keep-addr-book

CUSTOM_RPC="{{endpoint}}"

LATEST_HEIGHT=$(curl -s $CUSTOM_RPC/block | jq -r .result.block.header.height)
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1500))
TRUST_HASH=$(curl -s "$CUSTOM_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)

echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH

sed -i 's|^enable *=.*|enable = true|' $HOME/.{{home}}/config/config.toml
sed -i 's|^rpc_servers *=.*|rpc_servers = "'$CUSTOM_RPC,$CUSTOM_RPC'"|' $HOME/.{{home}}/config/config.toml
sed -i 's|^trust_height *=.*|trust_height = '$BLOCK_HEIGHT'|' $HOME/.{{home}}/config/config.toml
sed -i 's|^trust_hash *=.*|trust_hash = "'$TRUST_HASH'"|' $HOME/.{{home}}/config/config.toml

mv $HOME/.{{home}}/priv_validator_state.json.backup $HOME/.{{home}}/data/priv_validator_state.json

sudo systemctl restart {{binary}}
sudo journalctl -u {{binary}} -f --no-hostname -o cat`;
