import { useState, useEffect, useCallback } from 'react';
import { Endpoint } from './celestiaEndpoints';

type EndpointWithStatus = Endpoint & { isWorking: boolean };

type UseEndpointCheckerResult = {
  workingEndpoints: Endpoint[];
  loading: boolean;
  error: string | null;
  lastChecked: Date | null;
  refreshEndpoints: () => void;
};

/**
 * Custom hook to check the status of endpoints
 * @param endpoints List of endpoints to check
 * @param checkEndpoint Function to check if an endpoint is working
 * @returns Object containing working endpoints, loading state, error, and last checked timestamp
 */
export const useEndpointChecker = (
  endpoints: Endpoint[],
  checkEndpoint: (endpoint: Endpoint) => Promise<boolean>
): UseEndpointCheckerResult => {
  const [workingEndpoints, setWorkingEndpoints] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const refreshEndpoints = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    const checkEndpoints = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Create an array of promises to check all endpoints
        const checkPromises = endpoints.map(async (endpoint) => {
          try {
            const isWorking = await checkEndpoint(endpoint);
            return { ...endpoint, isWorking };
          } catch (err) {
            console.error(`Error checking endpoint ${endpoint.url}:`, err);
            return { ...endpoint, isWorking: false };
          }
        });
        
        // Wait for all checks to complete
        const checkedEndpoints = await Promise.all(checkPromises);
        
        // Filter to only include working endpoints
        const working = checkedEndpoints
          .filter((endpoint): endpoint is EndpointWithStatus => endpoint.isWorking)
          .map(({ isWorking, ...rest }) => rest); // Remove the isWorking property
        
        setWorkingEndpoints(working);
        setLastChecked(new Date());
        setLoading(false);
      } catch (err) {
        console.error("Error checking endpoints:", err);
        setError("Failed to check endpoints. Please try again later.");
        setLoading(false);
      }
    };

    checkEndpoints();
  }, [endpoints, checkEndpoint, refreshTrigger]);

  return { workingEndpoints, loading, error, lastChecked, refreshEndpoints };
};

/**
 * Default function to check if an endpoint is working
 * @param endpoint The endpoint to check
 * @returns Promise that resolves to true if the endpoint is working, false otherwise
 */
export const defaultCheckEndpoint = async (endpoint: Endpoint): Promise<boolean> => {
  try {
    // For API and RPC endpoints, we can do a simple fetch
    if (endpoint.type === 'api' || endpoint.type === 'rpc') {
      const url = endpoint.type === 'api' 
        ? `${endpoint.url}/cosmos/base/tendermint/v1beta1/node_info` 
        : `${endpoint.url}/status`;
      
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
