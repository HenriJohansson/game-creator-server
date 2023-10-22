import { Point } from 'geojson';
import { Document, Types } from 'mongoose';

export default interface TestMarker extends Document {
  id: String;
  marker_name: String;
  description: String;
  creation_date: Date;
  location: Point;
  owner: Types.ObjectId | string | null;
}
