export const stateSync = `sudo systemctl stop lavad

cp $HOME/.lava/data/priv_validator_state.json $HOME/.lava/priv_validator_state.json.backup
lavad tendermint unsafe-reset-all --home $HOME/.lava --keep-addr-book

CUSTOM_RPC="{{endpoint}}"

LATEST_HEIGHT=$(curl -s $CUSTOM_RPC/block | jq -r .result.block.header.height)
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1500))
TRUST_HASH=$(curl -s "$CUSTOM_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)

echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH

sed -i 's|^enable *=.*|enable = true|' $HOME/.lava/config/config.toml
sed -i 's|^rpc_servers *=.*|rpc_servers = "'$CUSTOM_RPC,$CUSTOM_RPC'"|' $HOME/.lava/config/config.toml
sed -i 's|^trust_height *=.*|trust_height = '$BLOCK_HEIGHT'|' $HOME/.lava/config/config.toml
sed -i 's|^trust_hash *=.*|trust_hash = "'$TRUST_HASH'"|' $HOME/.lava/config/config.toml

mv $HOME/.lava/priv_validator_state.json.backup $HOME/.lava/data/priv_validator_state.json

sudo systemctl restart lavad
sudo journalctl -fu lavad -o cat`;
