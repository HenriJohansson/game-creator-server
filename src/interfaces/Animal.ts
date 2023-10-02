import {Document, Types} from 'mongoose';
import {Species} from './Species';
import {Point} from 'geojson';

interface Animal extends Document {
  animal_name: string;
  species: Species;
  birthdate: Date;
  gender: 'Female' | 'Male';
  image: string;
  thumbnail: string;
  location: Point;
  owner: Types.ObjectId | string;
}

interface TestAnimal {
  id?: string;
  animal_name: string;
  species: string;
  birthdate: Date;
}

export {Animal, TestAnimal};
