import {Document, Types} from 'mongoose';
import {Point} from 'geojson';

export default interface Marker extends Document {
  id: String;
  marker_name: String;
  description: String;
  creation_date: Date;
  location: Point;
  owner: Types.ObjectId | string | null;
}

export {Marker};
