---
sidebar_position: 2
description: Archival snapshot 
---

# Archival snapshot 

> This snapshot contains the full state of the blockchain.

import Snapshots from '@site/src/components/Snapshots';

<Snapshots tip="Click on any snapshot to paste it into the code block." endpoint="https://celestia-snapshots-archive.f5nodes.com/"/>

:::info
Snapshots are taken every <i>24 hours</i>.
:::

```bash
sudo systemctl stop celestia-appd

# make a backup
cp $HOME/.celestia-app/data/priv_validator_state.json $HOME/.celestia-app/priv_validator_state.json.backup

# reset your node and download a snapshot
celestia-appd tendermint unsafe-reset-all --home $HOME/.celestia-app --keep-addr-book
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.celestia-app

# replace the priv_validator_state.json you have backed up
mv $HOME/.celestia-app/priv_validator_state.json.backup $HOME/.celestia-app/data/priv_validator_state.json

sudo systemctl restart celestia-appd && sudo journalctl -u celestia-appd -f -o cat
```