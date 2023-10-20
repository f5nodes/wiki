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
sudo systemctl stop bandd

# make a backup
cp $HOME/.band/data/priv_validator_state.json $HOME/.band/priv_validator_state.json.backup 

# reset your node and download a snapshot
bandd tendermint unsafe-reset-all --home $HOME/.band --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.band

# replace the priv_validator_state.json you have backed up
mv $HOME/.band/priv_validator_state.json.backup $HOME/.band/data/priv_validator_state.json 

sudo systemctl restart bandd && sudo journalctl -u bandd -f -o cat
```

A list of Snapshots you can use:

#### Highstakes:
```bash
https://tools.highstakes.ch/files/bandprotocol.tar.gz
```

#### Indonode:
```bash
https://snapshots.indonode.net/band/band-snapshot.tar.lz4
```

#### Nodeist:
```bash
https://ss.nodeist.net/band/snapshot_latest.tar.lz4
```

#### w3coins:
```bash
https://s3.eu-central-1.amazonaws.com/w3coins.io/snapshots/band-mainnet/band_snapsot_latest.tar.lz4
```
