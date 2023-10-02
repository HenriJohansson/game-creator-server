import {GraphQLError} from 'graphql';
import {Animal} from '../../interfaces/Animal';
import {UserIdWithToken} from '../../interfaces/User';
import animalModel from '../models/animalModel';
import {LocationInput} from '../../interfaces/Location';
import rectangleBounds from '../../utils/rectangleBounds';

// TODO: animalResolver
export default {
  Query: {
    animals: async () => {
      return await animalModel.find();
    },
    animalById: async (_parent: undefined, args: {id: string}) => {
      return await animalModel.findById(args.id);
    },
    animalsByArea: async (_parent: undefined, args: LocationInput) => {
      const bounds = rectangleBounds(args.topRight, args.bottomLeft);

      return await animalModel.find({
        location: {
          $geoWithin: {
            $geometry: bounds,
          },
        },
      });
    },
  },
  Mutation: {
    addAnimal: async (
      _parent: undefined,
      args: Animal,
      user: UserIdWithToken
    ) => {
      if (!user.id) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.owner = user.id;
      const animal = new animalModel(args);
      return await animal.save();
    },
    updateAnimal: async (_parent: undefined, args: Animal) => {
      return await animalModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deleteAnimal: async (_parent: undefined, args: {id: string}) => {
      return await animalModel.findByIdAndDelete(args.id);
    },
  },
};
