import * as React from "react";
import * as L from "leaflet";
import * as PropTypes from "prop-types";

const mapStyle = { height: "100%", width: "100%" };

const defaultValue = {
  center: [39.833333, -98.583333], // center of US
  zoom: 5,
  minZoom: 2,
  maxBounds: [[-85, -180], [85, 180]]
};

export interface Props {
  onChange: (
    options: { center: L.LatLng; zoom: number },
    event: L.LeafletEvent
  ) => void;
  options: L.MapOptions;
}

export interface State {
  map: L.Map | undefined;
}

class Map extends React.Component<Props, State> {
  private map: L.Map;

  private mapElement: HTMLElement | null;

  static childContextTypes = {
    map: PropTypes.object
  };

  static defaultProps = {
    value: defaultValue,
    onChange: () => {}
  };

  getChildContext() {
    return { map: this.map };
  }

  componentDidMount() {
    const options = this.props.options;
    if (this.mapElement === null) {
      throw new Error("map element doesn't exist");
    }
    this.map = L.map(this.mapElement, options);

    this.map.on("move", this.handleChange);
  }

  componentDidUpdate() {
    if (!this.props.options) return;

    L.Util.setOptions(this.map, this.props.options);

    const { zoom, center } = this.props.options;
    const newView = center.toString() + zoom;
    const prevView = this.map.getCenter().toString() + this.map.getZoom();

    if (newView === prevView) return;

    this.map.setView(L.latLng(center), zoom, { animate: true });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  handleChange: L.LeafletEventHandlerFn = event => {
    if (this.props.onChange === undefined) return;

    const center = this.map.getCenter();
    const zoom = this.map.getZoom();

    this.props.onChange({ center, zoom }, event);
  };

  render() {
    return (
      <div ref={el => (this.mapElement = el)} style={mapStyle}>
        {!!this.map && this.props.children}
      </div>
    );
  }
}

export default Map;
