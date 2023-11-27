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
sudo systemctl stop sged

# make a backup
cp $HOME/.sge/data/priv_validator_state.json $HOME/.sge/priv_validator_state.json.backup 

# reset your node and download a snapshot
sged tendermint unsafe-reset-all --home $HOME/.sge --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.sge

# replace the priv_validator_state.json you have backed up
mv $HOME/.sge/priv_validator_state.json.backup $HOME/.sge/data/priv_validator_state.json 

sudo systemctl restart sged && sudo journalctl -u sged -f -o cat
```

A list of Snapshots you can use: