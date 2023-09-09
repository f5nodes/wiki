import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

interface SelectPasteProps {
	rpc: string[];
	codeTemplate: string;
}

const SelectPaste: React.FC<SelectPasteProps> = ({ rpc, codeTemplate }) => {
	const [selectedRpc, setSelectedRpc] = useState<string>(rpc[0]);

	const renderedCode = codeTemplate.replace("{{selectedRpc}}", selectedRpc);

	return (
		<div>
			<Admonition type="tip" icon="📘" title="How to Use">
				<p>Click on any RPC to paste it into the code block.</p>
			</Admonition>

			<CodeBlock language="bash" showLineNumbers>
				{renderedCode}
			</CodeBlock>

			<div className="button-group card">
				{rpc.map((item, index) => (
					<button className="button button--secondary" key={index} onClick={() => setSelectedRpc(item)}>
						{item}
					</button>
				))}
			</div>
		</div>
	);
};

export default SelectPaste;
