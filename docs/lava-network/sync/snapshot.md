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
sudo systemctl stop lavad

# make a backup
cp $HOME/.lava/data/priv_validator_state.json $HOME/.lava/priv_validator_state.json.backup 

# reset your node and download a snapshot
lavad tendermint unsafe-reset-all --home $HOME/.lava --keep-addr-book 
wget <snapshot_url> | lz4 -dc - | tar -xf - -C $HOME/.lava

# replace the priv_validator_state.json you have backed up
mv $HOME/.lava/priv_validator_state.json.backup $HOME/.lava/data/priv_validator_state.json 

sudo systemctl restart lavad && sudo journalctl -u lavad -f -o cat
```

A list of Snapshots you can use:

#### AutoStake:
```bash
https://snapshots.autostake.com/lava-testnet-2
```

#### AviaOne:
```bash
https://services.lava-testnet-2.lava.aviaone.com
```

#### ITRocket:
```bash 
https://testnet-files.itrocket.net/lava/snap_lava.tar.lz4
```

#### kjnodes:
```bash 
https://snapshots.kjnodes.com/lava-testnet/snapshot_latest.tar.lz4
```

#### 𝐥𝐞𝐬𝐧𝐢𝐤 | 𝐔𝐓𝐒𝐀:
```bash 
https://share101.utsa.tech/lava/snap-lava.tar.lz4
```

#### LiveRaveN:
```bash 
https://snapshots.liveraven.net/snapshots/lava/lava-testnet-2_latest.tar.lz4
```

#### NodeJumper:
```bash 
https://snapshots-testnet.nodejumper.io/lava-testnet
```

#### NodeStake:
```bash 
https://ss-t.lava.nodestake.top
```

#### Stake Village:
```bash 
http://snapshots.stakevillage.net/snapshots/lava-testnet-2/snapshot_latest.tar.lz4
```
