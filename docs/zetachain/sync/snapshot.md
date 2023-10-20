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
sudo systemctl stop zetacored

# make a backup
cp $HOME/.zetacored/data/priv_validator_state.json $HOME/.zetacored/priv_validator_state.json.backup

# reset your node and download a snapshot
zetacored tendermint unsafe-reset-all --home $HOME/.zetacored --keep-addr-book
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.zetacored

# replace the priv_validator_state.json you have backed up
mv $HOME/.zetacored/priv_validator_state.json.backup $HOME/.zetacored/data/priv_validator_state.json

sudo systemctl restart zetacored && sudo journalctl -u zetacored -f -o cat
```

A list of Snapshots you can use:

#### ITRocket:
```bash
https://testnet-files.itrocket.net/zetachain/snap_zetachain.tar.lz4
```

#### kjnodes:
```bash
https://snapshots.kjnodes.com/zetachain-testnet/snapshot_latest.tar.lz4
```

#### NodeJumper:
```bash
https://snapshots-testnet.nodejumper.io/zetachain-testnet
```

#### NodeStake:
```bash
https://ss-t.zeta.nodestake.top
```
