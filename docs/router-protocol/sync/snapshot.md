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
sudo systemctl stop routerd

# make a backup
cp $HOME/.routerd/data/priv_validator_state.json $HOME/.routerd/priv_validator_state.json.backup 

# reset your node and download a snapshot
routerd tendermint unsafe-reset-all --home $HOME/.routerd --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.routerd

# replace the priv_validator_state.json you have backed up
mv $HOME/.routerd/priv_validator_state.json.backup $HOME/.routerd/data/priv_validator_state.json 

sudo systemctl restart routerd && sudo journalctl -u routerd -f -o cat
```

A list of Snapshots you can use:

#### Nodeist:
```bash
https://ss.nodeist.net/t/router/snapshot_latest.tar.lz4
```

#### NodeX:
```bash
https://snap.nodex.one/router-testnet/router-latest.tar.lz4
```