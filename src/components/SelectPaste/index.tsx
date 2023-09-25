import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

interface SelectPasteProps {
	endpoints: string[];
	home: string[];
	binary: string[];
	codeTemplate: string;
	tip?: string;
}

const SelectPaste: React.FC<SelectPasteProps> = ({ endpoints, home, binary, codeTemplate, tip }) => {
	const [selectedEndpoint, setSelectedEndpoint] = useState<string>(endpoints[0]);

	const renderedCode = codeTemplate.replace("{{endpoint}}", selectedEndpoint).replace("{{home}}", home).replace("{{binary}}", binary);

	return (
		<div>
			{tip && (
				<Admonition type="tip" icon="📘" title="How to Use">
					<p>{tip}</p>
				</Admonition>
			)}
			<div className="button-group card">
				{endpoints.map((item, index) => (
					<button className="button button--primary" key={index} onClick={() => setSelectedEndpoint(item)}>
						{item}
					</button>
				))}
			</div>
			<CodeBlock language="bash" showLineNumbers>
				{renderedCode}
			</CodeBlock>
		</div>
	);
};

export default SelectPaste;
