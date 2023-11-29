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
sudo systemctl stop archwayd

# make a backup
cp $HOME/.archway/data/priv_validator_state.json $HOME/.archway/priv_validator_state.json.backup 

# reset your node and download a snapshot
archwayd tendermint unsafe-reset-all --home $HOME/.archway --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.archway

# replace the priv_validator_state.json you have backed up
mv $HOME/.archway/priv_validator_state.json.backup $HOME/.archway/data/priv_validator_state.json 

sudo systemctl restart archwayd && sudo journalctl -u archwayd -f -o cat
```

A list of Snapshots you can use:

#### kjnodes:
```bash
https://snapshots.kjnodes.com/archway/snapshot_latest.tar.lz4
```

#### Lavender.Five:
```bash
https://snapshots.lavenderfive.com/snapshots/archway/latest.tar.lz4
```

#### lesnik | UTSA:
```bash
https://share2.utsa.tech/archway/snap-archway.tar.lz4
```

#### StateTown:
```bash
https://snapshots.stake-town.com/archway/archway-1_latest.tar.lz4
```

#### w3coins:
```bash
https://s3.eu-central-1.amazonaws.com/w3coins.io/wasm/archway-mainnet/wasmonly.tar.lz4
```