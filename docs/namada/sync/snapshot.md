---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

:::info
Choose a snapshot from the list and run the commands below. Don't forget to change `<snapshot_url>`.
:::

```bash
sudo systemctl stop namadad

# make a backup
cp $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/data/priv_validator_state.json $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/priv_validator_state.json.backup

# delete your data and download snapshot
rm -rf $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/db $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/data
wget -O snapshot.tar <snapshot_url>
tar -xvf snapshot.tar -C $HOME/.local/share/namada/public-testnet-15.0dacadb8d663

# replace the priv_validator_state.json you have backed up
mv $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/priv_validator_state.json.backup $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/data/priv_validator_state.json

sudo systemctl restart namadad && sudo journalctl -u namadad -f
```

A list of Snapshots you can use:

**Bware Labs:**

```bash
 https://snapshots.bwarelabs.com/namada/testnet/namada20240312.tar.lz4
```

**CryptoSJ:**

```bash
https://files.cryptosj.net/files/namadatestnet/namadatestnet.tar.gz
```

**IT Rocket:**

```bash
https://testnet-files.itrocket.net/namada/snap_namada.tar
```

**kjnodes:**
```bash
https://snapshots.kjnodes.com/namada-testnet/snapshot_latest.tar.lz4
```

**KonsorTech:**

```bash
https://ss-namada.konsortech.xyz/namada/namada-snapshot.tar.gz
```

**Lankou:**
```bash
https://namada.lankou.org/snapshot/namada-latest.tar.lz4
```

**Lavender.Five:**
```bash
https://snapshots.lavenderfive.com/testnet-extra-db/namada/latest_db.tar.lz4
```

**StakerHouse:**
```bash
https://snapshots3.stakerhouse.com/namada/namada_.tar.lz4
```
