import * as L from "leaflet";
import * as React from "react";
import * as WithMap from "./WithMap";

export type TileType = "osm" | "wiki";

export interface Props {
  map: L.Map;
  type: TileType;
  value: number;
  options: L.MapOptions;
}

class Layer extends React.Component<Props> {
  layer: L.TileLayer;

  componentDidMount() {
    const { type, value, options } = this.props;

    this.layer = L[type](value, options);
    this.layer.addTo(this.props.map);

    Object.keys(this.props).forEach(prop => {
      if (typeof this.layer[prop] === "function") {
        this.layer[prop](this.props[prop]);
      }
    });
  }

  componentWillUnmount() {
    this.layer.remove();
  }

  render() {
    return null;
  }
}

export default WithMap<Props>(Layer);
