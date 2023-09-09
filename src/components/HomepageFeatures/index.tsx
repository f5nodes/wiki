import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<"svg">>;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: "Always relevant Info",
		Svg: require("@site/static/img/undraw1.svg").default,
		description: (
			<>
				Nodes Wiki provides an up-to-date information on blockchain nodes. Our community-driven platform allows
				anyone to contribute by adding their own info, ensuring that the platform remains comprehensive and
				relevant.
			</>
		),
	},
	{
		title: "What for?",
		Svg: require("@site/static/img/undraw2.svg").default,
		description: (
			<>
				If you're experiencing issues with your nodes, Nodes Wiki is here to help. The platform provides a variety
				of solutions to all types of problems.
			</>
		),
	},
	{
		title: "Easy to Use",
		Svg: require("@site/static/img/undraw3.svg").default,
		description: (
			<>
				Nodes Wiki is user-friendly and easy to navigate, with simple scripts that make it easy for users of all
				skill levels to find the information they need, including scripts for installing and updating nodes,
				downloading snapshots, adding live peers, and finding public endpoints.
			</>
		),
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
