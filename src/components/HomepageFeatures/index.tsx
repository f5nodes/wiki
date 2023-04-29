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
        Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
        description: (
            <>
                F5 Wiki provides a constantly-updated source of information on blockchain nodes. Our community-driven
                platform allows anyone to contribute by adding their own bugs and solutions, ensuring that the platform
                remains comprehensive and relevant.
            </>
        ),
    },
    {
        title: "What for?",
        Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
        description: (
            <>
                If you're experiencing issues with your nodes, F5 Wiki is here to help. The platform provides a variety
                of solutions to all types of problems.
            </>
        ),
    },
    {
        title: "Easy to Use",
        Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
        description: (
            <>
                F5 Wiki is designed to be user-friendly and easy to navigate, with simple scripts that make it easy for
                users of all skill levels to find the information they need, including scripts for installing and
                updating nodes, downloading snapshots, adding live peers, and finding public endpoints.
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
