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
sudo systemctl stop sided

# make a backup
cp $HOME/.side/data/priv_validator_state.json $HOME/.side/priv_validator_state.json.backup 

# reset your node and download a snapshot
sided tendermint unsafe-reset-all --home $HOME/.side--keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.side

# replace the priv_validator_state.json you have backed up
mv $HOME/.side/priv_validator_state.json.backup $HOME/.side/data/priv_validator_state.json 

sudo systemctl restart sided && sudo journalctl -u sided -f -o cat
```

A list of Snapshots you can use:

#### AKNodes:
```bash
https://snapshots.aknodes.net/snapshots/side/snapshot-side.AKNodes.lz4
```

#### IT Rocket:
```bash
https://testnet-files.itrocket.net/side/snap_side.tar.lz4
```

#### kjnodes:
```bash
https://snapshots.kjnodes.com/side-testnet/snapshot_latest.tar.lz4
```

#### Nodeist:
```bash
https://t-ss.nodeist.net/side/snapshot_latest.tar.lz4
```

#### Nodejumper:
```bash
https://snapshots-testnet.nodejumper.io/side-testnet/side-testnet_latest.tar.lz4
```

#### Stake Town:
```bash
https://snapshots-testnet.stake-town.com/side/side-testnet-3_latest.tar.lz4
```
