---
sidebar_position: 1
description: Snapshot
---

# Snapshots

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

import SelectPaste2 from '@site/src/components/SelectPaste2';

export let items = [
    { 
        name: "kjnodes: pruned snapshots, updated every 6 hours", 
        text: 
`# Stop the service
sudo systemctl stop celestia.service\n
# Reset the data and save validator state
cp $HOME/.celestia-app/data/priv_validator_state.json $HOME/.celestia-app/priv_validator_state.json.backup
rm -rf $HOME/.celestia-app/data\n
# Download the latest snapshot and recover validator state
curl -L https://snapshots.kjnodes.com/celestia/snapshot_latest.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.celestia-app
mv $HOME/.celestia-app/priv_validator_state.json.backup $HOME/.celestia-app/data/priv_validator_state.json\n
# Restart the service and check the log
sudo systemctl start celestia.service && sudo journalctl -fu celestia.service -o cat`
    },
    { 
        name: "kjnodes: archive snapshots, updated every 24 hours", 
        text: 
`# Stop the service
sudo systemctl stop celestia.service\n
# Reset the data and save validator state
cp $HOME/.celestia-app/data/priv_validator_state.json $HOME/.celestia-app/priv_validator_state.json.backup
rm -rf $HOME/.celestia-app/data\n
# Download the latest snapshot and recover validator state
curl -L https://celestia-snapshots.kjnodes.com/celestia-archive/snapshot_latest.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.celestia-app
mv $HOME/.celestia-app/priv_validator_state.json.backup $HOME/.celestia-app/data/priv_validator_state.json\n
# Restart the service and check the log
sudo systemctl start celestia.service && sudo journalctl -fu celestia.service -o cat`
    },
    { 
        name: "ITRocket: pruned snapshots, updated every 4 hours", 
        text: 
`sudo systemctl stop celestia-appd\n
cp $HOME/.celestia-app/data/priv_validator_state.json $HOME/.celestia-app/priv_validator_state.json.backup\n
rm -rf $HOME/.celestia-app/data\n
# ⚠️ please use only ONE of the following commands, this will determine which server the snapshot will be downloaded from
curl -s https://server-2.itrocket.net/mainnet/celestia/.current_state.json | jq -r '.snapshot_name' | xargs -I {} curl https://server-2.itrocket.net/mainnet/celestia/{} | lz4 -dc - | tar -xf - -C $HOME/.celestia-app
OR
curl -s https://server-7.itrocket.net/mainnet/celestia/.current_state.json | jq -r '.snapshot_name' | xargs -I {} curl https://server-7.itrocket.net/mainnet/celestia/{} | lz4 -dc - | tar -xf - -C $HOME/.celestia-app\n
mv $HOME/.celestia-app/priv_validator_state.json.backup $HOME/.celestia-app/data/priv_validator_state.json\n
sudo systemctl restart celestia-appd && sudo journalctl -u celestia-appd -fo cat`
    },
    { 
        name: "ITRocket: archive snapshots, updated every 100 hours", 
        text: 
`# install dependencies, and disable statesync to avoid sync issues
sudo apt install curl tmux jq lz4 unzip aria2 -y
sed -i.bak 's/enable[[:blank:]]*=[[:blank:]]*true/enable = false/' $HOME/.celestia-app/config/config.toml\n
# Download snapshot
cd $HOME
aria2c -x 16 -s 16 -o celestia-archive-snap.tar.lz4 "https://server-9.itrocket.net/mainnet/celestia/$(curl -s https://server-9.itrocket.net/mainnet/celestia/.current_state.json | jq -r .snapshot_name)"\n
# Stop node, backup priv_validator_state.json, remove data, unpack snapshot
sudo systemctl stop celestia-appd
cp $HOME/.celestia-app/data/priv_validator_state.json $HOME/.celestia-app/priv_validator_state.json.backup
rm -rf $HOME/.celestia-app/data
tar -I lz4 -xvf ~/celestia-archive-snap.tar.lz4 -C $HOME/.celestia-app\n
# Restore validator state and start node
mv $HOME/.celestia-app/priv_validator_state.json.backup $HOME/.celestia-app/data/priv_validator_state.json
sudo systemctl restart celestia-appd && sudo journalctl -u celestia-appd -fo cat`
    },
    { 
        name: "Qubelabs: archive snapshots, updated every 48 hours", 
        text: 
`cd $HOME
rm -rf ~/.celestia-app/data
mkdir -p ~/.celestia-app/data
aria2c -x 16 -s 16 -o celestia-snap.tar "https://snaps.qubelabs.io/celestia/$(curl -s https://snaps.qubelabs.io/celestia/ | egrep -o '>celestia.*tar' | tr -d '>')"
tar xf celestia-snap.tar -C ~/.celestia-app/data/`
    },
    { 
        name: "DTEAM: pruned snapshots, updated every 4 hours", 
        text: 
`# Install dependencies 
sudo apt update
sudo apt-get install snapd lz4 -y\n
# Disable state-sync
sed -i.bak 's/enable[[:blank:]]*=[[:blank:]]*true/enable = false/' $HOME/.celestia-app/config/config.toml\n
# Stop node and reset data
sudo systemctl stop celestia-appd
cp $HOME/.celestia-app/data/priv_validator_state.json $HOME/.celestia-app/priv_validator_state.json.backup
rm -rf $HOME/.celestia-app/data
celestia-appd tendermint unsafe-reset-all --home $HOME/.celestia-app --keep-addr-book\n
# Download pruned snapshot
curl -o - -L https://download.dteam.tech/celestia/mainnet/pruned/latest-snapshot | lz4 -c -d - | tar -x -C $HOME/.celestia-app
mv $HOME/.celestia-app/priv_validator_state.json.backup $HOME/.celestia-app/data/priv_validator_state.json\n
# Restart node and check logs
sudo systemctl restart celestia-appd
sudo journalctl -u celestia-appd -f -o cat`
    },
];

<SelectPaste2 items={items} tip="Select a snapshot from the list to view the relevant configuration commands." />