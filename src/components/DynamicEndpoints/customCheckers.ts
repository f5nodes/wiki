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
      
      // Additional check: verify it's a Celestia node
      if (response.ok) {
        const data = await response.json();
        return data?.default_node_info?.network === 'celestia' || 
               data?.node_info?.network === 'celestia';
      }
      
      return false;
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
      
      // Additional check: verify it's a Celestia node
      if (response.ok) {
        const data = await response.json();
        return data?.result?.node_info?.network === 'celestia';
      }
      
      return false;
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
