---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

import SelectPaste2 from '@site/src/components/SelectPaste2';

export let items = [
    { 
        name: "kjnodes: pruned snapshots, updated every hour", 
        text: 
`# Stop the service
sudo systemctl stop story-testnet.service story-testnet-geth.service\n
# Reset the data and save validator state
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# Download the latest snapshot and recover validator state
curl -L https://snapshots.kjnodes.com/story-testnet/snapshot_latest_geth.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.story/geth
curl -L https://snapshots.kjnodes.com/story-testnet/snapshot_latest.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.story/story
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Restart the service and check the log
sudo systemctl start story-testnet.service story-testnet-geth.service
sudo journalctl -fu story-testnet-geth.service -o cat
sudo journalctl -fu story-testnet.service -o cat`
    },
    { 
        name: "kjnodes: archive snapshots, updated every 24 hours", 
        text: 
`# Stop the service
sudo systemctl stop story-testnet.service story-testnet-geth.service\n
# Reset the data and save validator state
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# Download the latest snapshot and recover validator state
curl -L https://snapshots.kjnodes.com/story-testnet-archive/snapshot_latest_geth.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.story/geth
curl -L https://snapshots.kjnodes.com/story-testnet-archive/snapshot_latest.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.story/story
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Restart the service and check the log
sudo systemctl start story-testnet.service story-testnet-geth.service
sudo journalctl -fu story-testnet-geth.service -o cat
sudo journalctl -fu story-testnet.service -o cat`
    },
    {
        name: "Enigma: pruned snapshots, updated every 24 hours", 
        text: 
`# Stop the services that run
sudo systemctl stop story-testnet.service 
sudo systemctl stop story-testnet-geth.service\n
# Be carreful and save your validator state 
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup\n
# Reset the older data folders
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# Download the latest snapshot and recover validator state
wget -O story_snapshot.tar.lz4 https://api.enigma-validator.com/story-testnet/story-pruned-latest.tar.lz4 --inet4-only
wget -O story_geth_last.tar.lz4 https://services.enigma-validator.com/story-testnet/story_geth_last.tar.lz4 --inet4-only\n
# Decompress story snapshots
lz4 -c -d story_snapshot.tar.lz4 | tar -x -C $HOME/.story/story
lz4 -c -d story_geth_last.tar.lz4 | tar -x -C $HOME/.story/geth/odyssey/geth\n
# Restore your validator state
sudo cp $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Delete downloaded story snapshots & story-geth 
sudo rm story_snapshot.tar.lz4
sudo rm story_geth_last.tar.lz4\n
# Restart the services
sudo systemctl start story-testnet.service 
sudo systemctl start story-testnet-geth.service`
    },
    { 
        name: "Enigma: archive snapshots, updated every 24 hours", 
        text: 
`# Stop the services that run
sudo systemctl stop story-testnet.service 
sudo systemctl stop story-testnet-geth.service\n
# Be carreful and save your validator state 
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup\n
# Reset the older data folders
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# Download the latest snapshot and recover validator state
wget -O story_archive.tar.lz4 https://api.enigma-validator.com/story-testnet/story-archive-latest.tar.lz4 --inet4-only
wget -O story_geth_last.tar.lz4 https://services.enigma-validator.com/story-testnet/story_geth_last.tar.lz4 --inet4-only\n
# Decompress story snapshots
lz4 -c -d story_archive.tar.lz4 | tar -x -C $HOME/.story/story
lz4 -c -d story_geth_last.tar.lz4 | tar -x -C $HOME/.story/geth/odyssey/geth\n
# Restore your validator state
sudo cp $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Delete downloaded story snapshots & story-geth 
sudo rm story_archive.tar.lz4
sudo rm story_geth_last.tar.lz4\n
# Restart the services
sudo systemctl start story-testnet.service 
sudo systemctl start story-testnet-geth.service`
    },
    { 
        name: "Mandragora: pruned snapshots, updated every 4 hours", 
        text: 
`# Install required dependencies
sudo apt-get install wget lz4 -y\n
# Stop your story-geth and story nodes
sudo systemctl stop story-geth
sudo systemctl stop story\n
# Back up your validator state
sudo cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/priv_validator_state.json.backup\n
# Delete previous geth chaindata and story data folders
sudo rm -rf $HOME/.story/geth/odyssey/geth/chaindata
sudo rm -rf $HOME/.story/story/data\n
# Download story-geth and story snapshots
wget -O geth_snapshot.lz4 https://snapshots2.mandragora.io/story/geth_snapshot.lz4
wget -O story_snapshot.lz4 https://snapshots2.mandragora.io/story/story_snapshot.lz4\n
# Decompress story-geth and story snapshots
lz4 -c -d geth_snapshot.lz4 | tar -xv -C $HOME/.story/geth/odyssey/geth
lz4 -c -d story_snapshot.lz4 | tar -xv -C $HOME/.story/story\n
# Delete downloaded story-geth and story snapshots
sudo rm -v geth_snapshot.lz4
sudo rm -v story_snapshot.lz4\n
# Restore your validator state
sudo cp $HOME/.story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Start your story-geth and story nodes
sudo systemctl start story-geth
sudo systemctl start story` 
    },
    { 
        name: "Mandragora: archive snapshots, updated every 24 hours", 
        text: 
`# Install required dependencies
sudo apt-get install wget lz4 -y\n
# Stop your story-geth and story nodes
sudo systemctl stop story-geth
sudo systemctl stop story\n
# Back up your validator state
sudo cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/priv_validator_state.json.backup\n
# Delete previous geth chaindata and story data folders
sudo rm -rf $HOME/.story/geth/odyssey/geth/chaindata
sudo rm -rf $HOME/.story/story/data\n
# Download story-geth and story snapshots
wget -O geth_snapshot.lz4 https://snapshots.mandragora.io/geth_snapshot.lz4
wget -O story_snapshot.lz4 https://snapshots.mandragora.io/story_snapshot.lz4\n
# Decompress story-geth and story snapshots
lz4 -c -d geth_snapshot.lz4 | tar -xv -C $HOME/.story/geth/odyssey/geth
lz4 -c -d story_snapshot.lz4 | tar -xv -C $HOME/.story/story\n
# Delete downloaded story-geth and story snapshots
sudo rm -v geth_snapshot.lz4
sudo rm -v story_snapshot.lz4\n
# Restore your validator state
sudo cp $HOME/.story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Start your story-geth and story nodes
sudo systemctl start story-geth
sudo systemctl start story` 
    },
    { 
        name: "Coha05: pruned snapshots, updated every 12 hours", 
        text: 
`# Install Required Tools
sudo apt-get install wget lz4 aria2 pv -y\n
# Stop Node Services
sudo systemctl stop story
sudo systemctl stop story-geth\n
# Download Geth Snapshot
cd $HOME
aria2c -x 16 -s 16 https://snapshot.spidernode.net/Geth_snapshot.lz4\n
# Download Story Snapshot
cd $HOME
aria2c -x 16 -s 16 https://snapshot.spidernode.net/Story_snapshot.lz4\n
# Backup priv_validator_state.json
mv $HOME/.story/story/data/priv_validator_state.json $HOME/.story/priv_validator_state.json.backup\n
# Remove Old Data
rm -rf ~/.story/story/data
rm -rf ~/.story/geth/odyssey/geth/chaindata\n
# Extract Story and Story-geth Snapshot
sudo mkdir -p /root/.story/story/data
lz4 -d Story_snapshot.lz4 | pv | sudo tar xv -C /root/.story/story/\n
sudo mkdir -p /root/.story/geth/odyssey/geth/chaindata
lz4 -d Geth_snapshot.lz4 | pv | sudo tar xv -C /root/.story/geth/odyssey/geth/\n
# Restore priv_validator_state.json
mv $HOME/.story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Restart Node Services
sudo systemctl start story
sudo systemctl start story-geth\n
# Remove snapshot file
sudo rm -rf Story_snapshot.lz4
sudo rm -rf Geth_snapshot.lz4`    
    },
    { 
        name: "ITRocket: pruned snapshots, updated every 4 hours", 
        text: 
`# install dependencies, and disable statesync to avoid sync issues
sudo apt install curl tmux jq lz4 unzip -y
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*|\\1false|" $HOME/.story/story/config/config.toml\n
# stop node and backup priv_validator_state.json
sudo systemctl stop story story-geth
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup\n
# remove old data and unpack Story snapshot
rm -rf $HOME/.story/story/data\n
# ⚠️ please use only ONE of the following commands, this will determine which server the snapshot will be downloaded from
curl -s https://server-1.itrocket.net/testnet/story/.current_state.json | jq -r '.snapshot_name' | xargs -I {} curl https://server-1.itrocket.net/testnet/story/{} | lz4 -dc - | tar -xf - -C $HOME/.story/story
OR
curl -s https://server-3.itrocket.net/testnet/story/.current_state.json | jq -r '.snapshot_name' | xargs -I {} curl https://server-3.itrocket.net/testnet/story/{} | lz4 -dc - | tar -xf - -C $HOME/.story/story\n
# restore priv_validator_state.json
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# delete geth data and unpack Geth snapshot
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# ⚠️ please use only ONE of the following commands, this will determine which server the snapshot will be downloaded from
curl -s https://server-1.itrocket.net/testnet/story/.current_state.json | jq -r '.snapshot_geth_name' | xargs -I {} curl https://server-1.itrocket.net/testnet/story/{} | lz4 -dc - | tar -xf - -C $HOME/.story/story
OR
curl -s https://server-3.itrocket.net/testnet/story/.current_state.json | jq -r '.snapshot_geth_name' | xargs -I {} curl https://server-3.itrocket.net/testnet/story/{} | lz4 -dc - | tar -xf - -C $HOME/.story/story\n
# restart node and check logs
sudo systemctl restart story story-geth
sudo journalctl -u story-geth -u story -f` 
    },
    { 
        name: "ITRocket: archive snapshots, updated every 4 hours", 
        text: 
`# install dependencies, and disable statesync to avoid sync issues
sudo apt install curl tmux jq lz4 unzip -y
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*|\\1false|" $HOME/.story/story/config/config.toml\n
# stop node and backup priv_validator_state.json
sudo systemctl stop story story-geth
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup\n
# remove old data and unpack Story snapshot
rm -rf $HOME/.story/story/data\n
# ⚠️ please use only ONE of the following commands, this will determine which server the snapshot will be downloaded from
curl -s https://server-5.itrocket.net/testnet/story/.current_state.json | jq -r '.snapshot_name' | xargs -I {} curl https://server-5.itrocket.net/testnet/story/{} | lz4 -dc - | tar -xf - -C $HOME/.story/story
OR
curl -s https://server-8.itrocket.net/testnet/story/.current_state.json | jq -r '.snapshot_name' | xargs -I {} curl https://server-8.itrocket.net/testnet/story/{} | lz4 -dc - | tar -xf - -C $HOME/.story/story\n
# restore priv_validator_state.json
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# delete geth data and unpack Geth snapshot
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# ⚠️ please use only ONE of the following commands, this will determine which server the snapshot will be downloaded from
curl -s https://server-5.itrocket.net/testnet/story/.current_state.json | jq -r '.snapshot_geth_name' | xargs -I {} curl https://server-5.itrocket.net/testnet/story/{} | lz4 -dc - | tar -xf - -C $HOME/.story/story
OR
curl -s https://server-8.itrocket.net/testnet/story/.current_state.json | jq -r '.snapshot_geth_name' | xargs -I {} curl https://server-8.itrocket.net/testnet/story/{} | lz4 -dc - | tar -xf - -C $HOME/.story/story\n
# restart node and check logs
sudo systemctl restart story story-geth
sudo journalctl -u story-geth -u story -f` 
    },
    { 
        name: "JosephTran: pruned snapshots", 
        text: 
`# Install tool
sudo apt-get install wget lz4 aria2 pv -y\n
# Stop node
sudo systemctl stop story
sudo systemctl stop story-geth\n
# Download snapshot 
# pruning = "default", indexer = "null", disables state snapshots, app-db-backend = "goleveldb"
cd $HOME
rm -f Story_snapshot.lz4
aria2c -x 16 -s 16 -k 1M https://story.josephtran.co/Story_snapshot.lz4\n
cd $HOME
rm -f Geth_snapshot.lz4
aria2c -x 16 -s 16 -k 1M https://story.josephtran.co/Geth_snapshot.lz4\n
# Backup priv_validator_state.json
cp ~/.story/story/data/priv_validator_state.json ~/.story/priv_validator_state.json.backup\n
# Remove old data
rm -rf ~/.story/story/data
rm -rf ~/.story/geth/odyssey/geth/chaindata\n
# Decompress snapshot
sudo mkdir -p /root/.story/story/data
lz4 -d -c Story_snapshot.lz4 | pv | sudo tar xv -C ~/.story/story/ > /dev/null\n
sudo mkdir -p /root/.story/geth/odyssey/geth/chaindata
lz4 -d -c Geth_snapshot.lz4 | pv | sudo tar xv -C ~/.story/geth/odyssey/geth/ > /dev/null\n
# Move priv_validator_state.json back
cp ~/.story/priv_validator_state.json.backup ~/.story/story/data/priv_validator_state.json\n
# Restart node
sudo systemctl start story
sudo systemctl start story-geth` 
    },
    { 
        name: "JosephTran: archive snapshots", 
        text: 
`# Install tool
sudo apt-get install wget lz4 aria2 pv -y\n
# Stop node
sudo systemctl stop story
sudo systemctl stop story-geth\n
# Download snapshot 
# pruning = "nothing", indexer = "kv"
cd $HOME
rm -f Story_snapshot.lz4
aria2c -x 16 -s 16 -k 1M https://story.josephtran.co/archive_Story_snapshot.lz4\n
cd $HOME
rm -f Geth_snapshot.lz4
aria2c -x 16 -s 16 -k 1M https://story.josephtran.co/archive_Geth_snapshot.lz4\n
# Backup priv_validator_state.json
cp ~/.story/story/data/priv_validator_state.json ~/.story/priv_validator_state.json.backup\n
# Remove old data
rm -rf ~/.story/story/data
rm -rf ~/.story/geth/odyssey/geth/chaindata\n
# Decompress snapshot
sudo mkdir -p /root/.story/story/data
lz4 -d -c archive_Story_snapshot.lz4 | pv | sudo tar xv -C ~/.story/story/ > /dev/null\n
sudo mkdir -p /root/.story/geth/odyssey/geth/chaindata
lz4 -d -c archive_Geth_snapshot.lz4 | pv | sudo tar xv -C ~/.story/geth/odyssey/geth/ > /dev/null\n
# Move priv_validator_state.json back
cp ~/.story/priv_validator_state.json.backup ~/.story/story/data/priv_validator_state.json\n
# Restart node
sudo systemctl start story
sudo systemctl start story-geth` 
    },
    { 
        name: "lesnik | UTSA: pruned snapshots, updated every 3 hours", 
        text: 
`systemctl stop story
systemctl stop story-geth\n
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup\n
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# story
curl -o - -L https://share106-7.utsa.tech/story/story_testnet.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/story/\n
# story_geth
curl -o - -L https://share106-7.utsa.tech/story/story_geth_testnet.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/geth/odyssey/geth/\n
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
systemctl restart story
systemctl restart story-geth` 
    },
    { 
        name: "lesnik | UTSA: archive snapshots, updated every 3 days", 
        text: 
`systemctl stop story
systemctl stop story-geth\n
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup\n
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# story
curl -o - -L https://share102.utsa.tech/story/story_testnet.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/story/\n
# story_geth
curl -o - -L https://share102.utsa.tech/story/story_geth_testnet.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/geth/odyssey/geth/\n
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
systemctl restart story
systemctl restart story-geth` 
    },
    { 
        name: "STAVR: pruned snapshots, updated every 2 hours", 
        text: 
`cd $HOME
snap install lz4
sudo systemctl stop story story-geth
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/odyssey/geth/chaindata
curl -o - -L https://story.snapshot.stavr.tech/story-snap.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/story/
curl -o - -L https://story.snapshot.stavr.tech/story_geth-snap.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/geth/odyssey/geth/
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json
wget -O $HOME/.story/story/config/addrbook.json "https://raw.githubusercontent.com/111STAVR111/props/main/Story/addrbook.json"
sudo systemctl restart story-geth
sudo systemctl restart story && sudo journalctl -fu story -ocat` 
    },
    { 
        name: "STAVR: archive snapshots, updated every 2 days", 
        text: 
`cd $HOME
snap install lz4
sudo systemctl stop story story-geth
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data
rm -rf $HOME/.story/geth/odyssey/geth/chaindata
curl -o - -L https://story-archive.snapshot.stavr.tech/story-snap.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/story/
curl -o - -L https://story-archive.snapshot.stavr.tech/story_geth-snap.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/geth/odyssey/geth/
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json
wget -O $HOME/.story/story/config/addrbook.json "https://raw.githubusercontent.com/111STAVR111/props/main/Story/addrbook.json"
sudo systemctl restart story-geth
sudo systemctl restart story && sudo journalctl -fu story -ocat` 
    },
];

<SelectPaste2 items={items} tip="Select a snapshot from the list to view the relevant configuration commands." />
