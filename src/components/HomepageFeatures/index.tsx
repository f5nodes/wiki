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
		title: "Open-Source Knowledge",
		Svg: require("@site/static/img/undraw1.svg").default,
		description: (
			<>
				Being open-source, Nodes Wiki invites contributions from across the globe, ensuring a rich and dynamic repository of content that benefits everyone.
			</>
		),
	},
	{
		title: "Up-to-date Information",
		Svg: require("@site/static/img/undraw2.svg").default,
		description: (
			<>
				Nodes Wiki is committed to keeping you at the forefront, with timely updates reflecting the latest developments and useful resources.
			</>
		),
	},
	{
		title: "Validator-Driven Content",
		Svg: require("@site/static/img/undraw3.svg").default,
		description: (
			<>
				With content sourced and scrutinized by some of the most active validators in the blockchain world, Nodes Wiki stands as a beacon of reliable and expert-backed information.
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
				<h3><b>{title}</b></h3>
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
