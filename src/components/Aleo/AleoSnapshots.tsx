import React, { useState, useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import Admonition from "@theme/Admonition";

interface Snapshot {
	filename: string;
	date: string;
	size: string;
}

const formatBytes = (bytes: number): string => {
	const gigabytes = bytes / (1024 * 1024 * 1024);
	return gigabytes.toFixed(2) + " GB";
};

const AleoSnapshots: React.FC<{ tip?: string }> = ({ tip }) => {
	const [fileList, setFileList] = useState<Snapshot[]>([]);
	const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://aleo-snapshots.f5nodes.com/");
				if (response.ok) {
					const data = await response.text();
					const parser = new DOMParser();
					const htmlDoc = parser.parseFromString(data, "text/html");

					const entries: Snapshot[] = Array.from(htmlDoc.querySelectorAll("a[href]"))
						.map((link) => {
							const href = link.getAttribute("href");
							if (!href || !href.startsWith("../")) {
								const filename = href || "";
								const fileInfo = link.nextSibling?.textContent?.trim() || "";
								const [date, time, size] = fileInfo.split(/\s+/);
								return { filename, date: `${date} ${time}`, size };
							}
							return null;
						})
						.filter((entry) => entry !== null) as Snapshot[];

					setFileList(entries);
				} else {
					console.error("Error fetching file list:", response.statusText);
				}
			} catch (error) {
				console.error("Error fetching file list:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			{tip && (
				<Admonition type="tip" icon="📘" title="How to Use">
					<p>{tip}</p>
				</Admonition>
			)}
			<div className="button-group card">
				{fileList.map((item, index) => (
					<button className="button button--primary" key={index} onClick={() => setSelectedSnapshot(item)}>
						<h4>
							{item.filename} — {item.date} — {formatBytes(parseFloat(item.size))}
						</h4>
					</button>
				))}
			</div>

			{fileList.length > 0 && (
				<CodeBlock language="bash" showLineNumbers>
					{selectedSnapshot
						? `wget https://aleo-snapshots.f5nodes.com/${selectedSnapshot.filename}`
						: `wget https://aleo-snapshots.f5nodes.com/${fileList[fileList.length - 1].filename}`}
				</CodeBlock>
			)}
		</div>
	);
};

export default AleoSnapshots;
