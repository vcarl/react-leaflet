import * as React from "react";
import * as Layer from "./Layer";

const getAttribution = (x: string) => ({
  attribution: `Map data © ${x} contributors`
});

const value = {
  osm: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  wiki: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
};

const option = {
  osm: getAttribution('<a href="https://openstreetmap.org">OpenStreetMap</a>'),
  wiki: getAttribution('<a href="https://maps.wikimedia.org">WikiMedia</a>')
};

function Tile({ type }: { type: Layer.TileType }): React.SFC {
  return <Layer type="tileLayer" value={value[type]} options={option[type]} />;
}

export default Tile;
