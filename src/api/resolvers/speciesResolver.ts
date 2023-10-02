// TODO: speciesResolver
import imageFromWikipedia from '../../functions/imageFromWikipedia';
import {Animal} from '../../interfaces/Animal';
import {Species} from '../../interfaces/Species';
import speciesModel from '../models/speciesModel';

export default {
  Animal: {
    species: async (parent: Animal) => {
      console.log(parent);
      return await speciesModel.findById(parent.species);
    },
  },
  Query: {
    species: async () => {
      return await speciesModel.find();
    },
    speciesById: async (_parent: undefined, args: {id: String}) => {
      return await speciesModel.findById(args.id);
    },
  },
  Mutation: {
    addSpecies: async (_parent: undefined, args: Species) => {
      console.log(args);
      args.image = await imageFromWikipedia(args.species_name);
      const newSpecies = new speciesModel(args);
      return await newSpecies.save();
    },
    updateSpecies: async (_parent: undefined, args: Species) => {
      console.log(args);
      if (args.species_name) {
        args.image = await imageFromWikipedia(args.species_name);
      }
      return await speciesModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deleteSpecies: async (_parent: undefined, args: {id: String}) => {
      return await speciesModel.findByIdAndDelete(args.id);
    },
  },
};
