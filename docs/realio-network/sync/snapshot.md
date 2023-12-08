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
sudo systemctl stop realio-networkd

# make a backup
cp $HOME/.realio-network/data/priv_validator_state.json $HOME/.realio-network/priv_validator_state.json.backup 

# reset your node and download a snapshot
realio-networkd tendermint unsafe-reset-all --home $HOME/.srealio-network --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.realio-network

# replace the priv_validator_state.json you have backed up
mv $HOME/.realio-network/priv_validator_state.json.backup $HOME/.realio-network/data/priv_validator_state.json 

sudo systemctl restart realio-networkd && sudo journalctl -u realio-networkd -f -o cat
```

A list of Snapshots you can use:

#### ITRocket:
```bash
https://mainnet-files.itrocket.net/realio/snap_realio.tar.lz4
```

#### Kynraze:
```bash
https://snap.kynraze.com/realio/snapshot-latest.tar.lz4 
```

#### Nodeist:
```bash
https://ss.nodeist.net/realio-network/snapshot_latest.tar.lz4
```

#### NodeX:
```bash
https://snap.nodex.one/realio/realio-latest.tar.lz4
```

#### Skynodes:
```bash
https://snapshots.skynodejs.net/realio/realio.tar.lz4
```

#### STAVR:
```bash
http://realio.snapshot.stavr.tech:1029/realio/realio-snap.tar.lz4
```