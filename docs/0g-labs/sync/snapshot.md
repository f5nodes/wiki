---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

import Snapshots from '@site/src/components/Snapshots';

<Snapshots tip="Click on any snapshot to paste it into the code block." endpoint="https://0g-testnet-snapshots.f5nodes.com/"/>

:::info
Snapshots are taken every <i>6 hours</i>.
:::


```bash
sudo systemctl stop 0gchaind

# make a backup
cp $HOME/.l0gchain/data/priv_validator_state.json $HOME/.0gchain/priv_validator_state.json.backup 

# reset your node and download a snapshot
0gchaind tendermint unsafe-reset-all --home $HOME/.0gchain --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.0gchain

# replace the priv_validator_state.json you have backed up
mv $HOME/.0gchain/priv_validator_state.json.backup $HOME/.0gchain/data/priv_validator_state.json 

sudo systemctl restart 0gchaind && sudo journalctl -u 0gchaind -f -o cat
```

You can also use other snapshots:
