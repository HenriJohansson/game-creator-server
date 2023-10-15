import {Marker} from '../../interfaces/Marker';
import {UserIdWithToken} from '../../interfaces/User';
import markerModel from '../models/markerModel';
import {GraphQLError} from 'graphql';

export default {
  Query: {
    markers: async () => {
      return await markerModel.find();
    },
    markersByUser: async (
      __parent: undefined,
      args: undefined,
      context: UserIdWithToken
    ) => {
      return await markerModel.find({owner: context.id});
    },
    markerById: async (_parent: undefined, args: {id: string}) => {
      return await markerModel.findById(args.id);
    },
  },
  Mutation: {
    addMarker: async (
      _parent: undefined,
      args: Marker,
      context: UserIdWithToken
    ) => {
      /* console.log(
        'A new marker was received with args: ',
        args,
        ' and context ',
        context
      ); */
      if (!context.id) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.owner = context.id;
      const marker = new markerModel(args);
      const result = await marker.save();
      console.log(result);
      return result;
    },
    updateMarker: async (
      _parent: undefined,
      args: {marker: Marker; token: string}
    ) => {
      return await markerModel.findOneAndUpdate(
        {id: args.marker.id},
        args.marker,
        {
          new: true,
        }
      );
    },
    deleteMarker: async (
      _parent: undefined,
      args: {id: string; token: string}
    ) => {
      return await markerModel.findOneAndDelete({id: args.id});
    },
  },
};
