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
sudo systemctl stop dymd

# make a backup
cp $HOME/.dymension/data/priv_validator_state.json $HOME/.dymension/priv_validator_state.json.backup 

# reset your node and download a snapshot
dymd tendermint unsafe-reset-all --home $HOME/.dymension --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.dymension

# replace the priv_validator_state.json you have backed up
mv $HOME/.dymension/priv_validator_state.json.backup $HOME/.dymension/data/priv_validator_state.json 

sudo systemctl restart dymd && sudo journalctl -u dymd -f -o cat
```

A list of Snapshots you can use:

#### kjnodes:
```bash
https://snapshots.kjnodes.com/dymension/snapshot_latest.tar.lz4
```

#### Nodeist
```bash
https://ss.nodeist.net/dymension/snapshot_latest.tar.lz4
```

#### Nodejumper:
```bash
https://snapshots.nodejumper.io/dymension/dymension_latest.tar.lz4
```

#### STAVR:
```bash
https://dymension-m.snapshot.stavr.tech/dymension-snap.tar.lz4
```
