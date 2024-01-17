---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

:::info
Choose a snapshot from the list and run the commands below. Don't forget to change `snapshot_url`.
:::

```bash
sudo systemctl stop xiond

# make a backup
cp $HOME/.xiond/data/priv_validator_state.json $HOME/.xiond/priv_validator_state.json.backup 

# reset your node and download a snapshot
xiond tendermint unsafe-reset-all --home $HOME/.xiond --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.xiond

# replace the priv_validator_state.json you have backed up
mv $HOME/.xiond/priv_validator_state.json.backup $HOME/.xiond/data/priv_validator_state.json 

sudo systemctl restart xiond && sudo journalctl -u xiond -f -o cat
```

A list of Snapshots you can use:

#### Xion (official):
```bash
https://files.xion-testnet-1.burnt.com/xion-testnet-1-latest.tar.lz4
```

#### NodeX:
```bash
https://snap.nodex.one/xion-testnet/xion-latest.tar.lz4
```