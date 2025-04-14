import { Endpoint } from './celestiaEndpoints';

export const storyEndpoints: Endpoint[] = [
  { provider: "BlockHub", url: "https://story-mainnet-api.blockhub.id", type: "api" },
  { provider: "Cumulo", url: "https://api.story.cumulo.me", type: "api" },
  { provider: "DTEAM", url: "https://api.story.mainnet.dteam.tech", type: "api" },
  { provider: "Grand Valley", url: "https://lightnode-api-mainnet-story.grandvalleys.com", type: "api" },
  { provider: "Lavender.Five", url: "https://api.lavenderfive.com/story", type: "api" },
  { provider: "Mandragora", url: "https://story-api.mandragora.io", type: "api" },
  { provider: "NodeStake", url: "https://api.story.nodestake.org", type: "api" },
  { provider: "Nodes.Guru", url: "https://api-1.story.nodes.guru", type: "api" },
  { provider: "Polkachu", url: "https://story-api.polkachu.com", type: "api" },
  { provider: "Silent", url: "https://api.story.silentvalidator.com", type: "api" },
  
  { provider: "BlockHub", url: "https://story-mainnet-rpc.blockhub.id", type: "rpc" },
  { provider: "Cumulo", url: "https://rpc.story.cumulo.me", type: "rpc" },
  { provider: "DTEAM", url: "https://rpc.story.mainnet.dteam.tech", type: "rpc" },
  { provider: "Grand Valley", url: "https://lightnode-rpc-mainnet-story.grandvalleys.com", type: "rpc" },
  { provider: "Lavender.Five", url: "https://rpc.lavenderfive.com/story", type: "rpc" },
  { provider: "Mandragora", url: "https://story-rpc.mandragora.io", type: "rpc" },
  { provider: "NodeStake", url: "https://rpc.story.nodestake.org", type: "rpc" },
  { provider: "Nodes.Guru", url: "https://rpc-1.story.nodes.guru", type: "rpc" },
  { provider: "Polkachu", url: "https://story-rpc.polkachu.com", type: "rpc" },
  { provider: "Silent", url: "https://rpc.story.silentvalidator.com", type: "rpc" },
  
  { provider: "BlockHub", url: "wss://story-mainnet-rpc.blockhub.id/websocket", type: "websocket" },
  { provider: "Cumulo", url: "wss://rpc.story.cumulo.me/websocket", type: "websocket" },
  { provider: "DTEAM", url: "wss://rpc.story.mainnet.dteam.tech/websocket", type: "websocket" },
  { provider: "Grand Valley", url: "wss://lightnode-rpc-mainnet-story.grandvalleys.com/websocket", type: "websocket" },
  { provider: "Lavender.Five", url: "wss://rpc.lavenderfive.com/story/websocket", type: "websocket" },
  { provider: "Mandragora", url: "wss://story-rpc.mandragora.io/websocket", type: "websocket" },
  { provider: "NodeStake", url: "wss://rpc.story.nodestake.org/websocket", type: "websocket" },
  { provider: "Nodes.Guru", url: "wss://rpc-1.story.nodes.guru/websocket", type: "websocket" },
  { provider: "Polkachu", url: "wss://story-rpc.polkachu.com/websocket", type: "websocket" },
  { provider: "Silent", url: "wss://rpc.story.silentvalidator.com/websocket", type: "websocket" },
];
