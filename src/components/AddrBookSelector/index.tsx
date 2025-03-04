import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

type AddrBookProvider = {
  name: string;
  url: string;
};

interface AddrBookSelectorProps {
  providers: AddrBookProvider[];
  codeTemplate: string;
  tip?: string;
  home: string;
  binary: string;
}

const AddrBookSelector: React.FC<AddrBookSelectorProps> = ({
  providers,
  codeTemplate,
  tip,
  home,
  binary,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<AddrBookProvider>(
    providers[0]
  );

  const renderedCode = codeTemplate
    .replace("{{endpoint}}", selectedProvider.url)
    .replaceAll("{{home}}", home)
    .replaceAll("{{binary}}", binary);

  return (
    <div>
      {tip && (
        <Admonition type="tip" icon="📘" title="How to Use">
          <p>{tip}</p>
        </Admonition>
      )}
      <div className="button-group card">
        {providers.map((provider, index) => (
          <button
            className={`button button--primary`}
            key={index}
            onClick={() => setSelectedProvider(provider)}
          >
            {provider.name}
          </button>
        ))}
      </div>
      <CodeBlock language="bash" showLineNumbers>
        {renderedCode}
      </CodeBlock>
    </div>
  );
};

export default AddrBookSelector;
