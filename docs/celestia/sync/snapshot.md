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
sudo systemctl stop celestia-appd

# make a backup
cp $HOME/.celestia-app/data/priv_validator_state.json $HOME/.celestia-app/priv_validator_state.json.backup 

# reset your node and download a snapshot
celestia-appd tendermint unsafe-reset-all --home $HOME/.celestia-app --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.celestia-app

# replace the priv_validator_state.json you have backed up
mv $HOME/.celestia-app/priv_validator_state.json.backup $HOME/.celestia-app/data/priv_validator_state.json 

sudo systemctl restart celestia-appd && sudo journalctl -u celestia-appd -f -o cat
```

A list of Snapshots you can use:

#### kjnodes:
```bash
https://snapshots.kjnodes.com/celestia/snapshot_latest.tar.lz4
```

#### Lavender.Five:
```bash
https://snapshots.lavenderfive.com/snapshots/celestia/latest.tar.lz4
```

#### Synarge Nodes:
```bash
https://s3.eu-central-1.amazonaws.com/snapshots.synergynodes.com/celestia_mainnet/celestia_36.tar.lz4
```
