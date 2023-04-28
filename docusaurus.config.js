// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'F5 NODES – WIKI',
	tagline: 'your nodes troubleshooter.',
	favicon: 'img/favicon.svg',
	url: 'https://wiki.f5nodes.com',
	baseUrl: '/',
	organizationName: 'f5nodes',
	projectName: 'wiki',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'uk'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/f5nodes/wiki/tree/main/',
					routeBasePath: '/',
				},
				blog: false,
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			image: 'img/social-card.png',
			colorMode: {
				defaultMode: 'dark',
			},
			// announcementBar: {
			// 	id: 'lets_contribute',
			// 	content:
			// 		'All contributions are welcome! Check our <a target="_blank" rel="noopener noreferrer" href="https://github.com/f5nodes/wiki">github</a>.',
			// 	backgroundColor: 'white',
			// 	textColor: 'black',
			// 	isCloseable: true,
			// },
			algolia: {
				appId: 'CUEVS66Y1G',
				apiKey: 'b2dc4ae3199ebaaeedc032742c9d1589',
				indexName: 'f5nodes',
				contextualSearch: true,
				debug: false,
			},
			navbar: {
				logo: {
					alt: 'F5 Nodes Wiki',
					src: 'img/logo-light.svg',
					srcDark: 'img/logo-dark.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Intro',
					},
					{
						href: 'https://github.com/f5nodes/wiki',
						label: 'GitHub',
						position: 'right',
					},
					{
						type: 'localeDropdown',
						position: 'right',
					},
				],
			},
			footer: {
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Intro',
								to: '/intro',
							},
							{
								label: 'Celestia',
								to: '/category/celestia',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'Telegram',
								href: 'https://t.me/f5nodes',
							},
							{
								label: 'Twitter',
								href: 'https://twitter.com/f5nodes',
							},
						],
					},
					{
						title: 'More',
						items: [
							{
								label: 'F5 Nodes',
								href: 'https://f5nodes.com',
							},
							{
								label: 'F5 Checker',
								href: 'https://github.com/f5nodes/f5checker',
							},
							{
								label: 'GitHub',
								href: 'https://github.com/f5nodes/wiki',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} F5 NODES, Inc.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
