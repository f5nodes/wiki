---
sidebar_position: 2
---

# Transfer node

To transfer you node to another server, you need to follow this steps:

1. Save the original `charon` folder
2. On the new server run commands:

```bash
git clone https://github.com/ObolNetwork/charon-distributed-validator-node.git
cd charon-distributed-validator-node
```

3. Copy the .charon folder from the old server to charon-distributed-validator-node on the new server.
4. Assign the rights to the `.charon` folder:

```bash
sudo chmod -R 777 .charon
sudo chmod -R 777 teku
```

5. Start the node:

```bash
docker-compose up -d
```
