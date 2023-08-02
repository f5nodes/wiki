---
sidebar_position: 2
description: Update Celestia Nodes
---

# Update 

## Update the full node

### Stop the node
```bash
sudo systemctl stop celestia-full
```

### Upgrade to the latest version
```bash
cd celestia-node
git fetch
git checkout v0.9.1
make build
sudo make install
```

:::note
In command version can be changed.
:::

### Update config 
```bash 
celestia full config-update --p2p.network blockspacerace
```

### Start the node 
```bash
sudo systemctl enable celestia-full
sudo systemctl start celestia-full 
```

### Check logs
```bash
sudo journalctl -u celestia-full.service -f
```

![full-9](./setup/img/full-9.png)

## Update the light node 

### Stop the node
```bash
sudo systemctl stop celestia-lightd
```

### Upgrade to latest version
```bash
cd celestia-node
git fetch
git checkout v0.9.1
make build
sudo make install
```

:::note
In command version can be changed.
:::

### Update config 
```bash
celestia light config-update --p2p.network blockspacerace
```

### Start the node 
```bash
sudo systemctl enable celestia-lightd
sudo systemctl start celestia-lightd 
```

### Check logs
```bash 
sudo journalctl -u celestia-lightd.service -f -o cat
```

![light-9](./setup/img/light-9.png)
