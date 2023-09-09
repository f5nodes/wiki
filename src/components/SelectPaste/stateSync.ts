export const stateSync = `sudo systemctl stop zetacored

cp $HOME/.zetacored/data/priv_validator_state.json $HOME/.zetacored/priv_validator_state.json.backup
zetacored tendermint unsafe-reset-all --home $HOME/.zetacored --keep-addr-book

CUSTOM_RPC="{{selectedRpc}}"

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
sudo journalctl -u zetacored -f --no-hostname -o cat`;
