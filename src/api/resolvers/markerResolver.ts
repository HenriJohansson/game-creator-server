import CustomError from '../../classes/CustomError';
import { Marker } from '../../interfaces/Marker';
import { UserIdWithToken } from '../../interfaces/User';
import markerModel from '../models/markerModel';
import { GraphQLError } from 'graphql';

export default {
  Query: {
    markers: async () => {
      return await markerModel.find();
    },
    markerById: async (_parent: undefined, args: { id: string }) => {
      return await markerModel.findById(args.id);
    },
  },
  Mutation: {
    addMarker: async (
      _parent: undefined,
      args: Marker,
      user: UserIdWithToken
    ) => {
      console.log(
        'A new marker was received with args: ',
        args,
        ' and user ',
        user,
        ' Owner ',
        args.owner
      );
      if (!user.id) {
        throw new GraphQLError('Not authorized', {
          extensions: { code: 'NOT_AUTHORIZED' },
        });
      }
      args.owner = user.id;
      const marker = new markerModel(args);
      const result = await marker.save()
      console.log(result);
      return result;
    },
    updateMarker: async (
      _parent: undefined,
      args: { marker: Marker; token: string }
    ) => {
      if (args.token === 'greatest-secret-token') {
        return await markerModel.findByIdAndUpdate(
          args.marker.id,
          args.marker,
          {
            new: true,
          }
        );
      } else {
        return new CustomError('Forbidden', 401);
      }
    },
    deleteMarker: async (
      _parent: undefined,
      args: { id: string; token: string }
    ) => {
      if (args.token === 'greatest-secret-token') {
        return await markerModel.findByIdAndDelete(args.id);
      } else {
        return new CustomError('Forbidden', 401);
      }
    },
  },
};
