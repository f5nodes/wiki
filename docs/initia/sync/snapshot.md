---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

import Snapshots from '@site/src/components/Snapshots';

<Snapshots tip="Click on any snapshot to paste it into the code block." endpoint="https://initia-testnet-snapshots.f5nodes.com/"/>

:::info
Snapshots are taken every <i>6 hours</i>.
:::


```bash
sudo systemctl stop initiad

# make a backup
cp $HOME/.initia/data/priv_validator_state.json $HOME/.initia/priv_validator_state.json.backup 

# reset your node and download a snapshot
initiad tendermint unsafe-reset-all --home $HOME/.initia --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.initia

# replace the priv_validator_state.json you have backed up
mv $HOME/.initia/priv_validator_state.json.backup $HOME/.initia/data/priv_validator_state.json 

sudo systemctl restart initiad && sudo journalctl -u initiad -f -o cat
```

You can also use other snapshots:

#### Trusted Point:
```bash 
https://rpc-initia-testnet.trusted-point.com/latest_snapshot.tar.lz4
```

#### kjnodes:
```bash 
https://snapshots.kjnodes.com/initia-testnet/snapshot_latest.tar.lz4
```