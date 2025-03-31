import { Endpoint } from './celestiaEndpoints';

/**
 * Custom endpoint checker for Celestia network
 * @param endpoint The endpoint to check
 * @returns Promise that resolves to true if the endpoint is working, false otherwise
 */
export const celestiaEndpointChecker = async (endpoint: Endpoint): Promise<boolean> => {
  try {
    // For API endpoints, check the node info endpoint
    if (endpoint.type === 'api') {
      const url = `${endpoint.url}/cosmos/base/tendermint/v1beta1/node_info`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(url, { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    }
    
    // For RPC endpoints, check the status endpoint
    if (endpoint.type === 'rpc') {
      const url = `${endpoint.url}/status`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(url, { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    }
    
    // For gRPC endpoints, we can't directly check from the browser
    // We'll assume they're working for now, but in a real implementation
    // you might want to have a backend service check these
    return true;
  } catch (error) {
    console.error(`Error checking endpoint ${endpoint.url}:`, error);
    return false;
  }
};

/**
 * Custom endpoint checker for Story network
 * @param endpoint The endpoint to check
 * @returns Promise that resolves to true if the endpoint is working, false otherwise
 */
export const storyEndpointChecker = async (endpoint: Endpoint): Promise<boolean> => {
  try {
    if (endpoint.type === 'api') {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(endpoint.url, { 
          method: 'GET',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return true;
      } catch (err) {
        return false;
      }
    }
    
    // For RPC endpoints, just check if the server responds
    if (endpoint.type === 'rpc') {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(endpoint.url, { 
          method: 'GET',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        return true;
      } catch (err) {
        return false;
      }
    }
    
    // For websocket endpoints, just check if we can establish a connection
    if (endpoint.type === 'websocket') {
      return new Promise((resolve) => {
        try {
          const ws = new WebSocket(endpoint.url);
          const timeoutId = setTimeout(() => {
            ws.close();
            resolve(false);
          }, 5000);

          ws.onopen = () => {
            clearTimeout(timeoutId);
            ws.close();
            resolve(true);
          };

          ws.onerror = () => {
            clearTimeout(timeoutId);
            resolve(false);
          };
        } catch (error) {
          resolve(false);
        }
      });
    }
    
    return true;
  } catch (error) {
    return false;
  }
};
