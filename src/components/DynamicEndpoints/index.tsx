import React from "react";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Endpoint, EndpointType } from "./celestiaEndpoints";
import Admonition from "@theme/Admonition";
import { useEndpointChecker, defaultCheckEndpoint } from "./useEndpointChecker";

type DynamicEndpointsProps = {
  endpoints: Endpoint[];
  checkEndpoint?: (endpoint: Endpoint) => Promise<boolean>;
};

const DynamicEndpoints: React.FC<DynamicEndpointsProps> = ({
  endpoints,
  checkEndpoint = defaultCheckEndpoint,
}) => {
  const { workingEndpoints, loading, error, lastChecked, refreshEndpoints } = useEndpointChecker(endpoints, checkEndpoint);

  // Group endpoints by type
  const apiEndpoints = workingEndpoints.filter(endpoint => endpoint.type === 'api');
  const rpcEndpoints = workingEndpoints.filter(endpoint => endpoint.type === 'rpc');
  const grpcEndpoints = workingEndpoints.filter(endpoint => endpoint.type === 'grpc');
  const websocketEndpoints = workingEndpoints.filter(endpoint => endpoint.type === 'websocket');

  if (loading) {
    return (
      <div>
        <Admonition type="info">
          <p>Checking endpoints... This may take a moment.</p>
        </Admonition>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Admonition type="danger">
          <p>{error}</p>
        </Admonition>
      </div>
    );
  }

  if (workingEndpoints.length === 0) {
    return (
      <div>
        <Admonition type="warning">
          <p>No working endpoints found. Please try again later.</p>
        </Admonition>
      </div>
    );
  }

  const renderEndpointList = (endpoints: Endpoint[]) => {
    return endpoints.map((endpoint, index) => (
      <React.Fragment key={index}>
        <h4>{endpoint.provider}:</h4>
        <pre>
          <code className="language-bash">{endpoint.url}</code>
        </pre>
      </React.Fragment>
    ));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Admonition type="success">
          <p>
            Showing only working endpoints ({workingEndpoints.length} of {endpoints.length} total). 
            Last checked: {lastChecked?.toLocaleString() || 'Unknown'}
          </p>
        </Admonition>
        
        <button 
          className="button button--primary" 
          onClick={refreshEndpoints}
          disabled={loading}
          style={{ marginLeft: '1rem', height: 'fit-content' }}
        >
          {loading ? 'Checking...' : 'Refresh Endpoints'}
        </button>
      </div>
      
      <Tabs groupId="endpoint-types">
        <TabItem value="api" label={`API (${apiEndpoints.length})`} default>
          {apiEndpoints.length > 0 ? (
            renderEndpointList(apiEndpoints)
          ) : (
            <Admonition type="warning">
              <p>No working API endpoints found. Please try again later.</p>
            </Admonition>
          )}
        </TabItem>
        
        <TabItem value="rpc" label={`RPC (${rpcEndpoints.length})`}>
          {rpcEndpoints.length > 0 ? (
            renderEndpointList(rpcEndpoints)
          ) : (
            <Admonition type="warning">
              <p>No working RPC endpoints found. Please try again later.</p>
            </Admonition>
          )}
        </TabItem>
        
        {grpcEndpoints.length > 0 && (
          <TabItem value="grpc" label={`gRPC (${grpcEndpoints.length})`}>
            {renderEndpointList(grpcEndpoints)}
          </TabItem>
        )}
        
        {websocketEndpoints.length > 0 && (
          <TabItem value="websocket" label={`WebSocket (${websocketEndpoints.length})`}>
            {renderEndpointList(websocketEndpoints)}
          </TabItem>
        )}
      </Tabs>
    </div>
  );
};

export default DynamicEndpoints;
