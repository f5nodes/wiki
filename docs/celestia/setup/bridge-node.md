---
sidebar_position: 3
description: Setting up Celestia Bridge Node
---

# Bridge Node

## Hardware requirements

- Memory: 8 GB RAM
- CPU: 6 cores
- Disk: 1 TB SSD Storage
- Bandwidth: 1 Gbps for Download/1 Gbps for Upload

## Installation the Consensus Full Node (if needed)

### Server preparing
```bash
sudo apt -q update
sudo apt -qy install curl git jq lz4 build-essential
sudo apt -qy upgrade
```

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

### Clone the repository

```bash
cd $HOME
rm -rf celestia-app
git clone https://github.com/celestiaorg/celestia-app.git
cd celestia-app
git checkout v0.13.2
```

### Build binaries

```bash
make build
```

### Prepare binaries for Cosmovisor

```bash
mkdir -p $HOME/.celestia-app/cosmovisor/genesis/bin
mv build/celestia-appd $HOME/.celestia-app/cosmovisor/genesis/bin/
rm -rf build

sudo ln -s $HOME/.celestia-app/cosmovisor/genesis $HOME/.celestia-app/cosmovisor/current -f
sudo ln -s $HOME/.celestia-app/cosmovisor/current/bin/celestia-appd /usr/local/bin/celestia-appd -f
```

### Install cosmovisor

```bash
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.4.0
```

### Create service

```bash
sudo tee /etc/systemd/system/celestia-appd.service > /dev/null << EOF
[Unit]
Description=celestia-testnet node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which cosmovisor) run start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
Environment="DAEMON_HOME=$HOME/.celestia-app"
Environment="DAEMON_NAME=celestia-appd"
Environment="UNSAFE_SKIP_BACKUP=true"
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:$HOME/.celestia-app/cosmovisor/current/bin"

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable celestia-appd
```

### Configure node

```bash
celestia-appd config chain-id blockspacerace-0
celestia-appd config keyring-backend test
celestia-appd config node tcp://localhost:12057
```


### Initialize the node

:::note
Change `f5nodes` to your moniker 
:::

```bash
celestia-appd init f5nodes --chain-id blockspacerace-0
```

### Add seeds & gas price

```bash
sed -i -e "s|^seeds =.|seeds = \"0293f2cf7184da95bc6ea6ff31c7e97578b9c7ff@65.109.106.95:26656, 8f14ec71e1d712c912c27485a169c2519628cfb6@celest-test-seed.theamsolutions.info:22256\"|" $HOME/.celestia-app/config/config.toml
sed -i -e "s|^minimum-gas-prices =.|minimum-gas-prices = \"0.005utia\"|" $HOME/.celestia-app/config/app.toml
```

### Set pruning

```bash
sed -i \
-e 's|^pruning =.|pruning = "nothing"|' \
-e 's|^pruning-keep-recent =.|pruning-keep-recent = "100"|' \
-e 's|^pruning-keep-every =.|pruning-keep-every = "0"|' \
-e 's|^pruning-interval =.|pruning-interval = "19"|' \
$HOME/.celestia-app/config/app.toml
```
```bash
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:12058\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:12057\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:12060\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:12056\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":12066\"%" $HOME/.celestia-app/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:12017\"%; s%^address = \":8080\"%address = \":12080\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:12090\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:12091\"%; s%:8545%:12045%; s%:8546%:12046%; s%:6065%:12065%" $HOME/.celestia-app/config/app.toml
```

### Start service
```bash
sudo systemctl start celestia-appd
```

### Check logs
```bash
sudo journalctl -u celestia-appd -f --no-hostname -o cat
```

## Setting up Bridge Node

### Build binaries

```bash
cd $HOME
rm -rf celestia-node
git clone https://github.com/celestiaorg/celestia-node.git
cd celestia-node
git checkout v0.9.5
make build
sudo mv build/celestia /usr/local/bin
make cel-key
sudo mv cel-key /usr/local/bin
```

### Create key for node 

:::note
Change `f5nodes` to your moniker 
:::
- Create a new key
```bash
./cel-key add f5nodes --keyring-backend test --node.type bridge --p2p.network blockspacerace
```

- Restore an existing key using a mnemonic (optional)
```bash
./cel-key add f5nodes --keyring-backend test --node.type bridge --p2p.network blockspacerace --recover
```

Then we can go to [#faucet](https://discord.com/invite/YsnTPcSfWQ) channel for “Blockspace Race” and request test tokens in format: 
```bash
$request <celestia1ux3y......> 
```

### Initialize Bridge Node

:::note
Change `f5nodes` to your moniker 
:::

```bash
celestia bridge init \
--keyring.accname f5nodes \
--core.ip localhost \
--core.rpc.port 12057 \
--core.grpc.port 12090 \
--p2p.network blockspacerace \
--rpc.port 12058 \
--gateway.port 12059
```


### Create service

:::note
Change `f5nodes` to your moniker 
:::

```bash
sudo tee /etc/systemd/system/celestia-bridge.service > /dev/null << EOF
[Unit]
Description=Celestia Bridge Node service
After=network-online.target

[Service]
User=$USER
ExecStart=$(which celestia) bridge start \\
--keyring.accname f5nodes \\
--core.ip localhost \\
--core.rpc.port 12057 \\
--core.grpc.port 12090 \\
--p2p.network blockspacerace \\
--rpc.port 12058 \\
--gateway.port 12059 \\
--metrics.tls=false \\
--metrics \\
--metrics.endpoint otel.celestia.tools:4318
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable celestia-bridge
```


### Start Bridge Node

```bash
systemctl start celestia-bridge
journalctl -fu celestia-bridge -o cat
```

## Useful commands

### Get Node ID

```bash
AUTH_TOKEN=$(celestia bridge auth admin --p2p.network blockspacerace)
curl -s -X POST -H "Authorization: Bearer $AUTH_TOKEN" -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":0,"method":"p2p.Info","params":[]}' http://localhost:12058 | jq -r .result.ID
```

### Check wallet

```bash
cd celestia-node
./cel-key list --node.type bridge --keyring-backend test --p2p.network blockspacerace
```

### Check wallet balance
```bash
celestia-appd q bank balances $(cel-key show bridge-wallet --node.type bridge --p2p.network blockspacerace -a | tail -1)
```

### Check node logs

```bash
journalctl -fu celestia-bridge -o cat
```

### Restart Bridge node
```bash
sudo systemctl restart celestia-bridge
```