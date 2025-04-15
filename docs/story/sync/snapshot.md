---
sidebar_position: 1
description: Snapshot
---

# Snapshot

> When a new node joins a network, it can use a snapshot — a compressed backup of the chain's data — to quickly synchronize with the current state. Snapshots expedite the process, reducing the need to download and verify every transaction from the beginning.

import SelectPaste2 from '@site/src/components/SelectPaste2';

export let items = [
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
        name: "Mandragora: archive snapshots, updated every 3 hours", 
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
        name: "Coha05: pruned snapshots, updated every 24 hours", 
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
aria2c -x 16 -s 16 -k 1M https://story.j-node.net/mainnet/Story_snapshot.lz4\n
cd $HOME
rm -f Geth_snapshot.lz4
aria2c -x 16 -s 16 -k 1M https://story.j-node.net/mainnet/Geth_snapshot.lz4\n
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
aria2c -x 16 -s 16 -k 1M https://story.j-node.net/mainnet/archive_Story_snapshot.lz4\n
cd $HOME
rm -f Geth_snapshot.lz4
aria2c -x 16 -s 16 -k 1M https://story.j-node.net/mainnet/archive_Geth_snapshot.lz4\n
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
        name: "DTEAM: pruned snapshots, updated every 4 hours", 
        text: 
`# Install Dependencies
sudo apt update
sudo apt-get install snapd lz4 -y\n
# Disable State Sync
sed -i -e "s|^enable *=.*|enable = false|" $HOME/.story/story/config/config.toml\n
# Stop Geth Node and Reset Data
sudo systemctl stop story-geth
rm -rf $HOME/.story/geth/odyssey/geth/chaindata\n
# Stop Consensus Node and Reset Data
sudo systemctl stop story
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data\n
# Download Pruned Geth Snapshot
curl -o - -L https://download.dteam.tech/story/testnet/pruned/latest-geth-snapshot  | lz4 -c -d - | tar -x -C $HOME/.story/geth/odyssey/geth\n
# Download Pruned Consensus Snapshot
curl -o - -L https://download.dteam.tech/story/testnet/pruned/latest-snapshot  | lz4 -c -d - | tar -x -C $HOME/.story/story
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Restart Geth Node and Check Logs
sudo systemctl restart story-geth
sudo journalctl -u story-geth -f -o cat\n
# Restart Consensus Node and Check Logs
sudo systemctl restart story
sudo journalctl -u story -f -o cat`
    },
    {
        name: "NodeStake: pruned snapshots, updated every 12 hours", 
        text: 
`# Install lz4
sudo apt update
sudo apt-get install snapd lz4 -y\n
# Stop Node and Reset Date
sudo systemctl stop geth
rm -rf $HOME/.story/geth/story/geth/chaindata
sudo systemctl stop story
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data\n
# Download Snapshot
curl -s https://ss.story.nodestake.org/ | grep -o ">20[^<]*\.tar\.lz4" | tr -d ">" | xargs -I{} curl -o - -L https://ss.story.nodestake.org/{} | lz4 -c -d - | tar -x -C $HOME/.story/story
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json 2>/dev/null || true
curl -o - -L https://ss.story.nodestake.org/geth.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/geth/story/geth/\n
# Restart Node
sudo systemctl restart geth
sudo systemctl restart story
journalctl -u story -f`
    },
    {
        name: "NodeStake: archive snapshots, updated every week", 
        text: 
`# Install lz4
sudo apt update
sudo apt-get install snapd lz4 -y\n
# Stop Node and Reset Date
sudo systemctl stop geth
rm -rf $HOME/.story/geth/story/geth/chaindata
sudo systemctl stop story
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup
rm -rf $HOME/.story/story/data\n
# Download Snapshot
curl -s https://ss.archive.story.nodestake.org/ | egrep -o ">20.*\.tar.lz4" | tr -d ">" | xargs -I{} curl -o - -L https://ss.archive.story.nodestake.org/{} | lz4 -c -d - | tar -x -C $HOME/.story/story
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json 2>/dev/null || true
curl -o - -L https://ss.archive.story.nodestake.org/geth.tar.lz4 | lz4 -c -d - | tar -x -C $HOME/.story/geth/story/geth/\n
# Restart Node
sudo systemctl restart geth
sudo systemctl restart story
journalctl -u story -f`
    },
    {
        name: "Polkachu: pruned snapshots, updated every 24 hours", 
        text: 
`# Install lz4 if needed
sudo apt install lz4\n
# Download the snapshot
curl -s https://snapshots.polkachu.com/snapshots/?prefix=story/ | grep -o '<Key>story/[^<]*</Key>' | sed 's/<Key>//g' | sed 's/<\/Key>//g' | sort -t_ -k2 -n | tail -1 | xargs -I{} wget -O story_latest.tar.lz4 "https://snapshots.polkachu.com/snapshots/{}" --inet4-only\n
# Stop your node
sudo service story stop
sudo service story_geth stop\n
# Reset cometbft data
cp ~/.story/story/data/priv_validator_state.json  ~/.story/story/priv_validator_state.json
rm ~/.story/story/data -rf
cp ~/.story/story/priv_validator_state.json  ~/.story/story/data/priv_validator_state.json\n
# Reset geth data
rm ~/.story/geth/story/geth/chaindata -rf\n
# Decompress the snapshot to your database root location
lz4 -c -d story_latest.tar.lz4  | tar -x -C ~/.story\n
# Restart your node
sudo service story start
sudo service story_geth start\n
# Remove downloaded snapshot to free up space
rm -v story_latest.tar.lz4\n
# Make sure that your node is running
sudo service story status
sudo service story_geth status
sudo journalctl -u story -f
sudo journalctl -u story_geth -f`
    },
    {
        name: "TTT VN: pruned snapshots, updated every 12 hours", 
        text: 
`# Install lz4 if needed
sudo apt update
sudo apt install lz4\n
# Stop your node
sudo systemctl stop story\n
# Back up priv_validator_state.json if needed
cp $HOME/.story/story/data/priv_validator_state.json $HOME/.story/story/priv_validator_state.json.backup\n
# Reset tendermint chain
story tendermint unsafe-reset-all --home $HOME/.story/story --keep-addr-book\n
# Download the Story snapshot
wget -O story_latest.tar.lz4 https://snapshots.tienthuattoan.com/mainnet/story/story_latest.tar.lz4\n
# Decompress the Story snapshot
lz4 -c -d story_latest.tar.lz4 | tar -x -C $HOME/.story/story\n
# Replace with the backed-up priv_validator_state.json
mv $HOME/.story/story/priv_validator_state.json.backup $HOME/.story/story/data/priv_validator_state.json\n
# Restart the service and check the log
sudo systemctl restart story
sudo journalctl -u story -f\n
# Remove downloaded snapshot to free up space
rm story_latest.tar.lz4`
    },
];


<SelectPaste2 items={items} tip="Select a snapshot from the list to view the relevant configuration commands." />
