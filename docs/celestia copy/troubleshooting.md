---
sidebar_position: 4
description: Celestia Nodes Troubleshooting
---

# Troubleshooting

If you are experiencing any problems with your Celestia node, you can find the answers below:

### If I don't see my ID in tiascan?
Restart your node with metrics flags: 
```bash
--metrics.tls=false --metrics --metrics.endpoint otel.celestia.tools:4318
``` 

Read more [here.](https://docs.celestia.org/nodes/itn-enable-telemetry-nodes/)

### If I can't check the balance or ID in terminal?
Wait for synchronization & check whether `--gateway.addr localhost --gateway.port 26659` is added to your node start command.

### No wallet displayed in terminal with command `./cel-key list --node.type <node-type> --keyring-backend test --p2p.network blockspacerace`
Make sure you are in the */celestia-node* directory. You can move to right directory using command: 
```bash 
cd celestia-node
```

### If I can't send PayForBlob transaction?

Make sure you are using the right port while sending PFB transaction. You can check it in your service file by running command below and see your `--gateway.port`:
```bash 
cat /etc/systemd/system/celestia-<node-type>.service
```

:::note 
Change `<node-type>` to yours one. 
:::



