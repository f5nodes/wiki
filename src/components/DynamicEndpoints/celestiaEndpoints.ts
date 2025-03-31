export type EndpointType = 'api' | 'rpc' | 'grpc' | 'websocket';

export type Endpoint = {
  provider: string;
  url: string;
  type: EndpointType;
};

export const celestiaEndpoints: Endpoint[] = [
  // API Endpoints
  { provider: "Allnodes", url: "https://celestia-rest.publicnode.com", type: "api" },
  { provider: "AmSolutions", url: "https://rest-celestia.theamsolutions.info", type: "api" },
  { provider: "AutoStake", url: "https://celestia-mainnet-lcd.autostake.com", type: "api" },
  { provider: "AviaOne", url: "https://api.celestia.mainnet.celestia.aviaone.com", type: "api" },
  { provider: "Brightlystake", url: "https://celestia-rpc.brightlystake.com/api", type: "api" },
  { provider: "Bro_n_Bro", url: "https://lcd.celestia-app.bronbro.io", type: "api" },
  { provider: "ContributionDAO", url: "https://api-celestia.contributiondao.com", type: "api" },
  { provider: "CosmosSpaces", url: "https://api-celestia.cosmos-spaces.cloud", type: "api" },
  { provider: "Crouton", url: "https://api-celestia.m.crouton.digital", type: "api" },
  { provider: "Cumulo", url: "https://celestia.api.cumulo.org.es", type: "api" },
  { provider: "Enigma", url: "https://celestia-lcd.enigma-validator.com", type: "api" },
  { provider: "F5 Nodes", url: "https://celestia-api.f5nodes.com", type: "api" },
  { provider: "Imperator", url: "https://lcd-celestia.imperator.co", type: "api" },
  { provider: "kjnodes", url: "https://celestia.api.kjnodes.com", type: "api" },
  { provider: "Lavender.Five", url: "https://celestia-api.lavenderfive.com", type: "api" },
  { provider: "Lunar Oasis", url: "https://api.lunaroasis.net", type: "api" },
  { provider: "mzonder", url: "https://api-celestia.mzonder.com", type: "api" },
  { provider: "Newmetric", url: "https://celestia-rest.mesa.newmetric.xyz", type: "api" },
  { provider: "[Noders]Team", url: "http://celestia.rpc.nodersteam.com:1617", type: "api" },
  { provider: "Nodes.Guru", url: "https://api-2.celestia.nodes.guru", type: "api" },
  { provider: "NodeStake", url: "https://api.celestia.nodestake.top", type: "api" },
  { provider: "Numia", url: "https://public-celestia-lcd.numia.xyz", type: "api" },
  { provider: "P-OPS", url: "https://api.celestia.pops.one", type: "api" },
  { provider: "Polkachu", url: "https://celestia-api.polkachu.com", type: "api" },
  { provider: "Spidea", url: "https://celestia-api.spidey.services", type: "api" },
  { provider: "Stakeflow", url: "https://api-celestia-01.stakeflow.io", type: "api" },
  { provider: "StakeTowm", url: "https://celestia-api.stake-town.com", type: "api" },
  { provider: "Stakin", url: "https://celestia.rest.stakin-nodes.com", type: "api" },
  { provider: "Trusted Point", url: "https://api-celestia-mainnet.testnet-pride.com", type: "api" },
  { provider: "ValiDAO", url: "https://celestia.rest.interchain.validao.xyz", type: "api" },
  { provider: "Validatus", url: "https://api.celestia.validatus.com", type: "api" },

  // RPC Endpoints
  { provider: "Allnodes", url: "https://celestia-rpc.publicnode.com:443", type: "rpc" },
  { provider: "AmSolutions", url: "https://rpc-celestia.theamsolutions.info", type: "rpc" },
  { provider: "AutoStake", url: "https://celestia-mainnet-rpc.autostake.com", type: "rpc" },
  { provider: "AviaOne", url: "https://rpc.celestia.mainnet.celestia.aviaone.com", type: "rpc" },
  { provider: "Brightlystake", url: "https://celestia-rpc.brightlystake.com", type: "rpc" },
  { provider: "Bro_n_Bro", url: "https://rpc.celestia-app.bronbro.io", type: "rpc" },
  { provider: "ContributionDAO", url: "https://rpc-celestia.contributiondao.com", type: "rpc" },
  { provider: "CosmosSpaces", url: "https://rpc-cosmoshub.cosmos-spaces.cloud", type: "rpc" },
  { provider: "Crouton", url: "https://rpc-celestia.m.crouton.digital", type: "rpc" },
  { provider: "Cumulo", url: "https://celestia.cumulo.org.es", type: "rpc" },
  { provider: "Enigma", url: "https://celestia-rpc.enigma-validator.com", type: "rpc" },
  { provider: "F5 Nodes", url: "https://celestia-rpc.f5nodes.com", type: "rpc" },
  { provider: "FreshSTAKING", url: "https://rpc.freshstaking.com/celestia", type: "rpc" },
  { provider: "Imperator", url: "https://rpc-celestia.imperator.co", type: "rpc" },
  { provider: "kjnodes", url: "https://celestia.rpc.kjnodes.com", type: "rpc" },
  { provider: "Lavender.Five", url: "https://celestia-rpc.lavenderfive.com", type: "rpc" },
  { provider: "Lunar Oasis", url: "https://rpc.lunaroasis.net", type: "rpc" },
  { provider: "mzonder", url: "https://rpc-celestia.mzonder.com", type: "rpc" },
  { provider: "Newmetric", url: "https://celestia-rpc.mesa.newmetric.xyz", type: "rpc" },
  { provider: "[Noders]Team", url: "http://celestia.rpc.nodersteam.com:29657", type: "rpc" },
  { provider: "Nodes.Guru", url: "https://rpc-2.celestia.nodes.guru", type: "rpc" },
  { provider: "NodeStake", url: "https://rpc.celestia.nodestake.top", type: "rpc" },
  { provider: "Numia", url: "https://public-celestia-rpc.numia.xyz", type: "rpc" },
  { provider: "P-OPS", url: "https://rpc.celestia.pops.one", type: "rpc" },
  { provider: "Polkachu", url: "https://celestia-rpc.polkachu.com", type: "rpc" },
  { provider: "Spidea", url: "https://celestia-rpc.spidey.services", type: "rpc" },
  { provider: "Stakeflow", url: "https://rpc-celestia-01.stakeflow.io", type: "rpc" },
  { provider: "StakeTown", url: "https://celestia-rpc.stake-town.com", type: "rpc" },
  { provider: "Stakin", url: "https://celestia.rpc.stakin-nodes.com", type: "rpc" },
  { provider: "Trusted Point", url: "https://rpc-celestia-mainnet.testnet-pride.com", type: "rpc" },
  { provider: "ValiDAO", url: "https://celestia.rpc.interchain.validao.xyz", type: "rpc" },
  { provider: "Validatus", url: "https://rpc.celestia.validatus.com", type: "rpc" },

  // gRPC Endpoints
  { provider: "Allnodes", url: "celestia-grpc.publicnode.com", type: "grpc" },
  { provider: "AmSolutions", url: "grpc-celestia.theamsolutions.info", type: "grpc" },
  { provider: "AutoStake", url: "celestia-mainnet-grpc.autostake.com", type: "grpc" },
  { provider: "AviaOne", url: "gprc.celestia.mainnet.celestia.aviaone.com", type: "grpc" },
  { provider: "Bro_n_Bro", url: "grpc.celestia-app.bronbro.io", type: "grpc" },
  { provider: "ContributionDAO", url: "grpc-celestia.contributiondao.com", type: "grpc" },
  { provider: "CosmosSpaces", url: "grpc-celestia.cosmos-spaces.cloud:5190", type: "grpc" },
  { provider: "Crouton", url: "grpc-celestia.m.crouton.digital:9590", type: "grpc" },
  { provider: "Cumulo", url: "celestia.grpc.cumulo.org.es:443", type: "grpc" },
  { provider: "F5 Nodes", url: "celestia-grpc.f5nodes.com:9390", type: "grpc" },
  { provider: "Imperator", url: "grpc-celestia.imperator.co:2092", type: "grpc" },
  { provider: "kjnodes", url: "celestia.grpc.kjnodes.com:443", type: "grpc" },
  { provider: "Lavender.Five", url: "celestia-grpc.lavenderfive.com:443", type: "grpc" },
  { provider: "Lunar Oasis", url: "grpc.lunaroasis.net:443", type: "grpc" },
  { provider: "mzonder", url: "grpc-celestia.mzonder.com:443", type: "grpc" },
  { provider: "Newmetric", url: "celestia-grpc.mesa.newmetric.xyz", type: "grpc" },
  { provider: "[Noders]Team", url: "celestia.grpc.nodersteam.com:9690", type: "grpc" },
  { provider: "NodeStake", url: "grpc.celestia.nodestake.top:443", type: "grpc" },
  { provider: "Numia", url: "public-celestia-grpc.numia.xyz", type: "grpc" },
  { provider: "P-OPS", url: "grpc.celestia.pops.one", type: "grpc" },
  { provider: "Polkachu", url: "celestia-grpc.polkachu.com:11690", type: "grpc" },
  { provider: "Spidea", url: "celestia-grpc.spidey.services", type: "grpc" },
  { provider: "Stakeflow", url: "grpc-celestia-01.stakeflow.io:15002", type: "grpc" },
  { provider: "StakeTown", url: "celestia-grpc.stake-town.com", type: "grpc" },
  { provider: "Stakin", url: "celestia.grpc.stakin-nodes.com:443", type: "grpc" },
  { provider: "Trusted Point", url: "grpc-celestia-mainnet.testnet-pride.com:443", type: "grpc" },
  { provider: "ValiDAO", url: "celestia.grpc.interchain.validao.xyz", type: "grpc" },
  { provider: "Validatus", url: "grpc.celestia.validatus.com", type: "grpc" },
];
