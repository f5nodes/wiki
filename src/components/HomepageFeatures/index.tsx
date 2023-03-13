import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<'svg'>>;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: 'Always relevant Info',
		Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: (
			<>
				Idea of the platform is that each of you can contribute by adding your own bugs / errors along with the right
				solutions.
			</>
		),
	},
	{
		title: 'What for?',
		Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
		description: (
			<>
				Node doesn't work or have some problems? F5 Wiki will help you to solve your node issues, providing the right
				solutions.
			</>
		),
	},
	{
		title: 'Easy to Use',
		Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: (
			<>Use our scripts to install / update your nodes, download snapshot, add live peers, find public endpoints etc.</>
		),
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
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
