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
sudo systemctl stop c4ed

# make a backup
cp $HOME/.c4e-chain/data/priv_validator_state.json $HOME/.c4e-chain/priv_validator_state.json.backup 

# reset your node and download a snapshot
c4ed tendermint unsafe-reset-all --home $HOME/.c4e-chain --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.c4e-chain

# replace the priv_validator_state.json you have backed up
mv $HOME/.c4e-chain/priv_validator_state.json.backup $HOME/.c4e-chain/data/priv_validator_state.json 

sudo systemctl restart c4ed && sudo journalctl -u c4ed -f -o cat
```

A list of Snapshots you can use:

#### Anode:
```bash
https://anode.team/C4E/main/anode.team_c4e.tar.lz4
```

#### BccNodes:
```bash
https://services.bccnodes.com/mainnets/c4e/c4e.tar.lz4
```

#### Skynodes:
```bash
https://snapshots.skynodejs.net/c4e/c4e.tar.lz4
```

#### StakeTown:
```bash
https://snapshots.stake-town.com/c4e/perun-1_latest.tar.lz4
```

#### STAVR:
```bash
http://c4e.snapshot.stavr.tech:1018/c4e/c4e-snap.tar.lz4
```