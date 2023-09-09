import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

interface SelectPasteProps {
	endpoints: string[];
	codeTemplate: string;
	tip?: string;
}

const SelectPaste: React.FC<SelectPasteProps> = ({ endpoints, codeTemplate, tip }) => {
	const [selectedEndpoint, setSelectedEndpoint] = useState<string>(endpoints[0]);

	const renderedCode = codeTemplate.replace("{{endpoint}}", selectedEndpoint);

	return (
		<div>
			{tip && (
				<Admonition type="tip" icon="📘" title="How to Use">
					<p>{tip}</p>
				</Admonition>
			)}
			<div className="button-group card">
				{endpoints.map((item, index) => (
					<button className="button button--info" key={index} onClick={() => setSelectedEndpoint(item)}>
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
