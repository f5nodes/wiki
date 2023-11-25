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
sudo systemctl stop injectived

# make a backup
cp $HOME/.injectived/data/priv_validator_state.json $HOME/.injectived/priv_validator_state.json.backup 

# reset your node and download a snapshot
injectived tendermint unsafe-reset-all --home $HOME/.injectived --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.injectived

# replace the priv_validator_state.json you have backed up
mv $HOME/.injectived/priv_validator_state.json.backup $HOME/.injectived/data/priv_validator_state.json 

sudo systemctl restart injectived && sudo journalctl -u injectived -f -o cat
```

A list of Snapshots you can use:

#### High Stakes:
```bash
https://tools.highstakes.ch/files/injective.tar.gz
```

#### Lavender.Five:
```bash
https://snapshots.lavenderfive.com/snapshots/injective/latest.tar.lz4
```

#### w3coins:
```bash
https://s3.eu-central-1.amazonaws.com/w3coins.io/wasm/injective-mainnet/wasmonly.tar.lz4
```
