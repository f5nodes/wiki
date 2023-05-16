---
sidebar_position: 3
description: Celestia Nodes FAQ
---

# Node FAQ

### Will there be any rewards for running a node?
Rewards will be only for selected operators to Blockspace Race (1.000 operators). They were already selected and have itn role in Discord. Applications have been closed and there's no way to apply for now.

### Is it possible to run the node in Blockspace Race if I wasn't selected?
Yes, anyone can run node in Blockspace chain, as the network is permissionless. 

### What are the difference between Mocha/Arabica/Brockspace race testnets?
1. Mocha is the long standing testnet. 
2. Arabica is a devnet (more experimental). 
3. Blockspace Race is an incentivized testnet that ends in 2-4 weeks. 

### Which type of node is better to run? 
All types of nodes are good, they are not made by the type of better/worse. For now will be a good choice - full/bridge/light nodes. Check the difference following [link](https://docs.celestia.org/nodes/overview/)

### How to export your wallet address?
```bash
cd celestia-node
./cel-key export <key-name> --keyring-backend test --node.type <node-type> --p2p.network blockspacerace
```

:::note
Change *key-name* and *node-type* to yours one.
:::

### How to transfer node to another server?
Save the keys. Keys are located in the *~/.celestia-node-type-blockspacerace-0/keys* directory (assuming you use the default node store path).
Install node on new server & wait for synchronization.
Stop the old node: `sudo systemctl stop celestia-<node-type>` (for systemd).
On new server, using any FTP client or cmd add previously saved keys in the same path *~/.celestia-node-type-blockspacerace-0/keys*.
Restart the new node: `sudo systemctl restart celestia-<node-type>` (for systemd).

:::note
Change *node-type* to yours one.
:::

### How to check the disk usage of the blockspacerace-0 directory?

```bash
du -h ~/.celestia-node-type-blockspacerace-0
```

:::note
Change *node-type* to yours one.
:::

### How to edit service file?

```bash
nano /etc/systemd/system/celestia-node-type.service
```

`Ctrl+X –> Y –> Enter` to exit editing mode.

### Can I add my wallet to Keplr? 
For now you can add Mocha and Blockspace Race chains. Mamaki testnet has been eliminated and there's no way to add it. For more information and tutorial check Keplr [documentation](https://docs.celestia.org/developers/keplr/)

### At what stage is Celestia now?
Celestia is still in testnet. Mainnet is expected to launch in Q3 of 2023.