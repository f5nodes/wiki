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
sudo systemctl stop quicksilverd

# make a backup
cp $HOME/.quicksilverd/data/priv_validator_state.json $HOME/.quicksilverd/priv_validator_state.json.backup 

# reset your node and download a snapshot
quicksilverd tendermint unsafe-reset-all --home $HOME/.quicksilverd --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.quicksilverd

# replace the priv_validator_state.json you have backed up
mv $HOME/.quicksilverd/priv_validator_state.json.backup $HOME/.quicksilverd/data/priv_validator_state.json 

sudo systemctl restart quicksilverd && sudo journalctl -u quicksilverd -f -o cat
```

A list of Snapshots you can use:

