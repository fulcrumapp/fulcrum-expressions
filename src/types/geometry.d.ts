import type { Feature, Point, Position, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon } from "./geojson";

export type Coord = Feature<Point> | Point | Position;

export type Id = string | number;

// Geometry has GeometryCollection, but we don't want that included.
export type GeoJSONGeometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;

export type Units = "meters" | "millimeters" | "centimeters" | "kilometers" | "acres" | "miles" | "nauticalmiles" | "inches" | "yards" | "feet" | "radians" | "degrees" | "hectares";