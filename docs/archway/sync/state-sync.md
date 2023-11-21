---
sidebar_position: 2
description: State Sync
---

# State Sync

> State Sync allows new nodes to join a blockchain network by downloading a recent snapshot of the application state instead of processing all historical blocks. This approach is typically faster and requires less data, as the application state is usually more concise than the entire block history.

import SelectPaste from '@site/src/components/SelectPaste';

import { stateSync }  from '@site/src/components/SelectPaste/stateSync.ts';

export let endpoints = [
			`https://rpc.mainnet.archway.io`,
			'https://archway-rpc.0base.dev',
			'https://archway-mainnet-archive.allthatnode.com',
			'https://rpc-archway.cosmos-spaces.cloud',
			'https://archway-rpc.f5nodes.com',
			'https://rpc-akash.imperator.co',
			'https://archway.rpc.kjnodes.com',
			'https://archway-mainnet.rpc.l0vd.com',
			'https://archway-rpc.lavenderfive.com',
			'https://m-archway.rpc.utsa.tech',
			'https://rpc-archway.mms.team',
			'https://rpc-archway.mzonder.com',
			'https://rpc-1.archway.nodes.guru',
			'https://rpc.archway.nodestake.top',
			'https://archway-rpc.openbitlab.com',
			`https://archway-rpc.polkachu.com`,
			'https://archway-rpc.stake-town.com:443',
			'https://rpc.archway.stakeup.tech',
			'https://rpc-archway-mainnet.testnet-pride.com',
			'https://archway-rpc.tienthuattoan.ventures',
			'https://rpc-archway.mainnet.validatrium.club',
			'https://rpc-archway.whispernode.com',
];

export let home = 'archway';

export let binary = 'archwayd';

<SelectPaste endpoints={endpoints} codeTemplate={stateSync} home={home} binary={binary} tip="Click on any RPC to paste it into the code block." />
