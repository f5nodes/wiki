---
sidebar_position: 4
description: AddrBook
---

# AddrBook

> Address book refers to a local database or record that a node maintains of all the peers it has come into contact with or learned about. This helps in the peer discovery process.

Run the command and restart the node

:::note
Change `addrbook_url` to the one you choose from list above.
:::

```bash
curl -s addrbook_url > $HOME/.zetacored/config/addrbook.json

sudo systemctl restart zetacored
```

<details>
  <summary>F5 Nodes</summary>
  <div>

    url here
  </div>
</details>
