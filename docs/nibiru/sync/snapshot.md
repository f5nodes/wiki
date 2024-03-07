---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

import Snapshots from '@site/src/components/Snapshots';

<Snapshots tip="Click on any snapshot to paste it into the code block." endpoint="https://nibiru-snapshots.f5nodes.com/"/>

:::info
Snapshots are taken every <i>6 hours</i>.
:::

```bash
sudo systemctl stop nibid

# make a backup
cp $HOME/.nibid/data/priv_validator_state.json $HOME/.nibid/priv_validator_state.json.backup 

# reset your node and download a snapshot
nibid tendermint unsafe-reset-all --home $HOME/.nibid --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.nibid

# replace the priv_validator_state.json you have backed up
mv $HOME/.nibid/priv_validator_state.json.backup $HOME/.nibid/data/priv_validator_state.json 

sudo systemctl restart nibid && sudo journalctl -u nibid -f -o cat
```




