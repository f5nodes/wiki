---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

:::info
Choose a snapshot from the list and run the commands below. Don't forget to change `SHAPSHOT_URL`.
:::

```bash
sudo systemctl stop zetacored

# make a backup
cp $HOME/.zetacored/data/priv_validator_state.json $HOME/.zetacored/priv_validator_state.json.backup 

# reset your node and download a snapshot
zetacored tendermint unsafe-reset-all --home $HOME/.zetacored --keep-addr-book
wget SHAPSHOT_URL | lz4 -dc - | tar -xf - -C $HOME/.zetacored

# replace the priv_validator_state.json you have backed up
mv $HOME/.zetacored/priv_validator_state.json.backup $HOME/.zetacored/data/priv_validator_state.json

sudo systemctl restart zetacored && sudo journalctl -u zetacored -f
```

<details>
  <summary>F5 Nodes</summary>
  <div>
    
    url here 
  </div>
</details>


<details>
  <summary>Polkachu</summary>
  <div>
    
    https://snapshots.polkachu.com/testnet-snapshots/zetachain/zetachain_1514635.tar.lz4
  </div>
</details>


<details>
  <summary>NodeJumper</summary>
  <div>
    
    https://snapshots-testnet.nodejumper.io/zetachain-testnet/athens_7001-1_2023-09-07.tar.lz4
  </div>
</details>


<details>
  <summary>NodeStake</summary>
  <div>
    
    https://ss-t.zeta.nodestake.top/2023-09-04_zeta_1474991.tar.lz4
  </div>
</details>


<details>
  <summary>kjnodes</summary>
  <div>
    
    https://snapshots.kjnodes.com/zetachain-testnet/snapshot_latest.tar.lz4
  </div>
</details>


<details>
  <summary>ITRocket</summary>
  <div>
    
    https://testnet-files.itrocket.net/zetachain/snap_zetachain.tar.lz4
  </div>
</details>


<details>
  <summary>Synergy Nodes</summary>
  <div>
    
    http://snapshots.synergynodes.com/zetachain_testnet/zetachain_testnet_1512989.tar.lz4
  </div>
</details>

