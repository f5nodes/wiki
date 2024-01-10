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
sudo systemctl stop hid-noded

# make a backup
cp $HOME/.hid-node/data/priv_validator_state.json $HOME/.hid-node/priv_validator_state.json.backup 

# reset your node and download a snapshot
hid-noded tendermint unsafe-reset-all --home $HOME/.hid-node --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.hid-node

# replace the priv_validator_state.json you have backed up
mv $HOME/.hid-node/priv_validator_state.json.backup $HOME/.hid-node/data/priv_validator_state.json 

sudo systemctl restart hid-noded && sudo journalctl -u hid-noded -f -o cat
```

A list of Snapshots you can use:

#### kjnodes:
```bash
https://snapshots.kjnodes.com/hypersign-testnet/snapshot_latest.tar.lz4
```

#### Nodeist:
```bash
https://t-ss.nodeist.net/hypersign/snapshot_latest.tar.lz4
```