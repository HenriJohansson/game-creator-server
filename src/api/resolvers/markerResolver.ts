//import {GraphQLError} from 'graphql';
import {Marker} from '../../interfaces/Marker';
//import {UserIdWithToken} from '../../interfaces/User';
import markerModel from '../models/markerModel';

// TODO: animalResolver
export default {
  Query: {
    markers: async () => {
      return await markerModel.find();
    },
    markerById: async (_parent: undefined, args: {id: string}) => {
      return await markerModel.findById(args.id);
    },
  },
  Mutation: {
    addMarker: async (
      _parent: undefined,
      args: Marker
      /* user: UserIdWithToken */
    ) => {
      /*
      if (!user.id) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      */
      args.owner = null; /*user.id*/
      const marker = new markerModel(args);
      return await marker.save();
    },
    updateMarker: async (_parent: undefined, args: Marker) => {
      return await markerModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deleteMarker: async (_parent: undefined, args: {id: string}) => {
      return await markerModel.findByIdAndDelete(args.id);
    },
  },
};
