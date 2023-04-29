---
sidebar_position: 1
description: Setting up Celestia Light Node
---

# Light Node

## Hardware requirements

- Memory: **2 GB RAM**
- CPU: **Single Core**
- Disk: **25 GB SSD Storage**
- Bandwidth: **56 Kbps for Download/56 Kbps for Upload**

## Setting up light node

### Server preparing

```bash
sudo apt -q update
sudo apt -qy install curl git jq lz4 build-essential
sudo apt -qy upgrade
```

![light-1](./img/light-1.png)

### Install Go

```bash
ver="1.20.2" 
cd $HOME 
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" 
sudo rm -rf /usr/local/go 
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" 
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
```

![light-2](./img/light-2.png)

### Check Go version

```bash
go version
```
You should see output like:

![light-3](./img/light-3.png)

### Download the binary file

```bash
cd $HOME 
rm -rf celestia-node 
git clone https://github.com/celestiaorg/celestia-node.git 
cd celestia-node/ 
git checkout tags/v0.9.1
make build 
make install 
make cel-key
```

![light-4](./img/light-4.png)

### Check Celestia version

```bash
celestia version
```

:::info
Check the latest celestia-node version [here](https://github.com/celestiaorg/celestia-node/releases)
:::

### Create key for node 

:::note
Change `f5nodes` to your moniker 
:::
- Create a new key
```bash
./cel-key add f5nodes --keyring-backend test --node.type light --p2p.network blockspacerac
```

![light-6](./img/light-6.png)

- Restore an existing key using a mnemonic (optional)
```bash
./cel-key add f5nodes --keyring-backend test --node.type light --p2p.network blockspacerace --recover
```

![light-6](./img/light-6.png)

Then we can go to [#faucet](https://discord.com/invite/YsnTPcSfWQ) channel for “Blockspace Race” and request test tokens in format: 
```bash
$request <celestia1ux3y......> 
```

### Initialize Light node 

:::note
Change `f5nodes` to your moniker 
:::

```bash
celestia light init \
  --keyring.accname f5nodes \
  --p2p.network blockspacerace
```

![light-7](./img/light-7.png)

### Create a service file 

```bash
sudo tee <<EOF >/dev/null /etc/systemd/system/celestia-lightd.service
[Unit]
Description=celestia-lightd Light Node
After=network-online.target
 
[Service]
User=$USER
ExecStart=/usr/local/bin/celestia light start --core.ip https://rpc-blockspacerace.pops.one/ --core.grpc.port 9090 --gateway --gateway.addr localhost --gateway.port 26659 --metrics.tls=false --metrics --metrics.endpoint otel.celestia.tools:4318 --p2p.network blockspacerace
Restart=on-failure
RestartSec=3
LimitNOFILE=4096
 
[Install]
WantedBy=multi-user.target
EOF
```

![light-8](./img/light-8.png)

### Start the node

```bash
sudo systemctl enable celestia-lightd
sudo systemctl start celestia-lightd && sudo journalctl -u celestia-lightd.service -f -o cat
```

![light-9](./img/light-9.png)

## Useful commands

### Check wallet
```bash
cd celestia-node
./cel-key list --node.type light --keyring-backend test --p2p.network blockspacerace
```

### Check balance
```bash
curl -X GET http://127.0.0.1:26659/balance
```

### Get light node ID
```bash
AUTH_TOKEN=$(celestia light auth admin --p2p.network blockspacerace)
curl -X POST \
     -H "Authorization: Bearer $AUTH_TOKEN" \
     -H 'Content-Type: application/json' \
     -d '{"jsonrpc":"2.0","id":0,"method":"p2p.Info","params":[]}' \
     http://localhost:26658
```

### Check logs
```bash
sudo journalctl -u celestia-lightd.service -f -o cat
```

### Submitting a PayForData transaction
```bash
curl -X POST -d '{"namespace_id": "0c204d39600fddd3",
  "data": "f1f20ca8007e910a3bf8b2e61da0f26bca07ef78717a6ea54165f5",
  "gas_limit": 80000, "fee": 2000}' http://localhost:26659/submit_pfd
```

### Delete node
```bash
cd $HOME
sudo systemctl stop celestia-lightd
sudo systemctl disable celestia-lightd
sudo rm /etc/systemd/system/celestia-lightd.service
sudo systemctl daemon-reload
rm -f $(which celestia-lightd)
rm -rf $HOME/.celestia-lightd
rm -rf $HOME/celestia-lightd
```
