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
sudo systemctl stop babylond

# make a backup
cp $HOME/.babylond/data/priv_validator_state.json $HOME/.babylond/priv_validator_state.json.backup 

# reset your node and download a snapshot
babylond tendermint unsafe-reset-all --home $HOME/.babylond --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.bbabylond

# replace the priv_validator_state.json you have backed up
mv $HOME/.babylond/priv_validator_state.json.backup $HOME/.babylond/data/priv_validator_state.json 

sudo systemctl restart babylond && sudo journalctl -u babylond -f -o cat
```

A list of Snapshots you can use:

#### kjnodes:
```bash
https://snapshots.kjnodes.com/babylon-testnet/snapshot_latest.tar.lz4
```

#### Nodeist:
```bash
https://ss.nodeist.net/t/babylon/snapshot_latest.tar.lz4
```

#### NodeX:
```bash
https://snap.nodex.one/babylon-testnet/babylon-latest.tar.lz4
```