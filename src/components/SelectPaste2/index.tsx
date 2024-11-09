import React, { useState } from 'react';
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

interface SnapshotItem {
  name: string;
  text: string;
}

interface SelectPasteProps {
  items: SnapshotItem[];
  tip?: string;
}

const SelectPaste: React.FC<SelectPasteProps> = ({ items, tip }) => {
  const [selectedItem, setSelectedItem] = useState<SnapshotItem>(items[0]);
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      {tip && (
        <Admonition type="tip" icon="📘" title="How to Use">
          <p>{tip}</p>
        </Admonition>
      )}
      
      <div className="button-group card">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedItem(item)}
            className="button button--primary"
          >
            {item.name}
          </button>
        ))}
      </div>

      <CodeBlock language="bash" showLineNumbers>
        {selectedItem.text}
      </CodeBlock>
    </div>
  );
};

export default SelectPaste;
