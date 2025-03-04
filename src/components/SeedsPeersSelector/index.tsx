import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

type SeedPeerItem = {
  provider: string;
  address: string;
  port?: string;
};

interface SeedsPeersSelectorProps {
  items: SeedPeerItem[];
  type: "seeds" | "peers";
  home: string;
  binary: string;
}

const SeedsPeersSelector: React.FC<SeedsPeersSelectorProps> = ({ 
  items, 
  type, 
  home, 
  binary 
}) => {
  const [selectedItems, setSelectedItems] = useState<SeedPeerItem[]>([]);
  
  const toggleItem = (item: SeedPeerItem) => {
    if (selectedItems.some(selected => selected.address === item.address)) {
      setSelectedItems(selectedItems.filter(selected => selected.address !== item.address));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  
  const selectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...items]);
    }
  };
  
  const getConfigProperty = () => {
    return type === "seeds" ? "seeds" : "persistent_peers";
  };
  
  const getSelectedAddresses = () => {
    return selectedItems.map(item => item.address).join(",");
  };
  
  const generateCommand = () => {
    const addresses = getSelectedAddresses();
    const configProperty = getConfigProperty();
    
    if (!addresses) {
      return `# Please select at least one ${type === "seeds" ? "seed" : "peer"} from the table above`;
    }
    
    return `${configProperty.toUpperCase()}="${addresses}"
sed -i -e "s/^${configProperty} *=.*/${configProperty} = \\"$${configProperty.toUpperCase()}\\"/g" $HOME/.${home}/config/config.toml
sudo systemctl restart ${binary}`;
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectedItems.length === items.length && items.length > 0}
                  onChange={selectAll}
                />
              </th>
              <th>Provider</th>
              <th>{type === "seeds" ? "Seed" : "Peer"}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={selectedItems.some(selected => selected.address === item.address) ? styles.selected : ""}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedItems.some(selected => selected.address === item.address)}
                    onChange={() => toggleItem(item)}
                  />
                </td>
                <td>{item.provider}</td>
                <td className={styles.addressCell}>
                  {item.address}
                  <button 
                    className={styles.copyButton} 
                    onClick={() => navigator.clipboard.writeText(item.address)}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </td>
                <td>
                  <button 
                    className={styles.selectButton}
                    onClick={() => toggleItem(item)}
                  >
                    {selectedItems.some(selected => selected.address === item.address) ? "Deselect" : "Select"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={styles.selectedCount}>
        Selected: {selectedItems.length} of {items.length}
      </div>
      
      <div className={styles.codeBlockContainer}>
        <CodeBlock language="bash">
          {generateCommand()}
        </CodeBlock>
      </div>
    </div>
  );
};

export default SeedsPeersSelector;
