import { Marker } from './Marker';

export default interface ServerResponse extends Record<string, unknown> {
  data: {
    markers: Marker[];
  };
}
