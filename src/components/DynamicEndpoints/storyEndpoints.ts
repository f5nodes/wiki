import { Endpoint } from './celestiaEndpoints';

export const storyEndpoints: Endpoint[] = [
  { provider: "Nodes.Guru", url: "https://api-1.story.nodes.guru/", type: "api" },
  { provider: "Mandragora", url: "https://story-api.mandragora.io", type: "api" },
  
  { provider: "Nodes.Guru", url: "https://rpc-1.story.nodes.guru", type: "rpc" },
  { provider: "Mandragora", url: "https://story-rpc.mandragora.io", type: "rpc" },
  
  { provider: "Nodes.Guru", url: "wss://rpc-1.story.nodes.guru:443", type: "websocket" },
  { provider: "Mandragora", url: "wss://story-rpc.mandragora.io/websocket", type: "websocket" },
];
