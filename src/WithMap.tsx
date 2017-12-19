import * as React from "react";
import * as PropTypes from "prop-types";
import * as L from "leaflet";

export interface Context {
  map: L.Map;
}

export interface HOCProps {
  map: L.Map;
}

function connectMap<InitialProps>(
  Component: React.ComponentClass<InitialProps | HOCProps>
) {
  const WithMap: React.SFC = (props, context: Context) => (
    <Component map={context.map} {...props} />
  );

  WithMap.displayName = `WithMap(${Component.displayName})`;

  WithMap.contextTypes = {
    map: PropTypes.object
  };

  return WithMap;
}

export default connectMap;
