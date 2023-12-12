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
sudo systemctl stop andromedad

# make a backup
cp $HOME/.andromeda/data/priv_validator_state.json $HOME/.andromeda/priv_validator_state.json.backup 

# reset your node and download a snapshot
andromedad tendermint unsafe-reset-all --home $HOME/.andromeda --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.andromeda

# replace the priv_validator_state.json you have backed up
mv $HOME/.andromeda/priv_validator_state.json.backup $HOME/.andromeda/data/priv_validator_state.json 

sudo systemctl restart andromedad && sudo journalctl -u andromedad -f -o cat
```

A list of Snapshots you can use:

#### kjnodes:
```bash
https://snapshots.kjnodes.com/andromeda/snapshot_latest.tar.lz4
```

#### Nodejumper:
```bash
https://snapshots.nodejumper.io/andromeda/andromeda_latest.tar.lz4
```

#### NodeX:
```bash
https://snap.nodex.one/andromeda/andromeda-latest.tar.lz4
```

#### STAVR:
```bash
http://andro.snapshot.stavr.tech:1030/andromeda/andromeda-snap.tar.lz4
```