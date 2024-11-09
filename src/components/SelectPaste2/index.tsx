import React, { useState } from 'react';
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

interface SelectPasteProps {
  names: string[];
  customText: string;
  tip?: string;
}

const SelectPaste: React.FC<SelectPasteProps> = ({ names, customText, tip }) => {
  const [selectedName, setSelectedName] = useState<string>(names[0]);
  
  const renderedText = customText.replace("{{name}}", selectedName);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {tip && (
				<Admonition type="tip" icon="📘" title="How to Use">
					<p>{tip}</p>
				</Admonition>
			)}
      
      <div className="button-group card">
        {names.map((name, index) => (
          <button
            key={index}
            onClick={() => setSelectedName(name)}
            className="button button--primary"
          >
            {name}
          </button>
        ))}
      </div>

      <CodeBlock language="bash" showLineNumbers>
				{renderedText}
			</CodeBlock>
    </div>
  );
};

export default SelectPaste;
