---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

import Snapshots from '@site/src/components/Snapshots';

<Snapshots tip="Click on any snapshot to paste it into the code block. We provide snapshots for both the execution and consensus layers." endpoint="https://story-testnet-snapshots.f5nodes.com/"/>

:::info
Snapshots are taken every <i>2 hours</i>.
:::


```bash
sudo systemctl stop story && sudo systemctl stop story-geth

# make a backup of the validator state
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/priv_validator_state.json.backup

# delete data folders 
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/iliad/geth/chaindata 

# download and decompress snapshots
story_snapshot_url=$(curl -sL 'https://story-testnet-snapshots.f5nodes.com' | grep -Eo '>iliad-0_story.*\.tar\.lz4' | sed 's/^>//' | head -n1)
geth_snapshot_url=$(curl -sL 'https://story-testnet-snapshots.f5nodes.com' | grep -Eo '>iliad-0_geth.*\.tar\.lz4' | sed 's/^>//' | head -n1)

wget "https://story-testnet-snapshots.f5nodes.com/${story_snapshot_url}" -O - | lz4 -dc - | tar -xf - -C $HOME/.story
wget "https://story-testnet-snapshots.f5nodes.com/${geth_snapshot_url}" -O - | lz4 -dc - | tar -xf - -C $HOME/.story/geth/iliad/geth

# replace the priv_validator_state.json you have backed up
cp $HOME/.story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json

# restart your services
sudo systemctl restart story && sudo systemctl restart story-geth
```

You can also use snapshots from other providers:

#### kjnodes:
```bash 
https://snapshots.kjnodes.com/story-testnet/snapshot_latest.tar.lz4 # story snapshot
https://snapshots.kjnodes.com/story-testnet/snapshot_latest_geth.tar.lz4 # geth snapshot
```

#### Mandragora:
```bash
https://snapshots.mandragora.io/story_snapshot.lz4 # story snapshot
https://snapshots.mandragora.io/geth_snapshot.lz4 # geth snapshot
```

#### ITRocket:
```bash
https://itrocket.net/services/testnet/story/#snap # story and geth snapshot
```
