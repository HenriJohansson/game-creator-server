//module is in strict mode by default ;)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  try {
    const url = findUrls([process.env.DATABASE_URL, process.env.DB_URL]);
    const connection = await mongoose.connect(url as string);
    console.log('Connected to Database successfully');
    return connection;
  } catch (error) {
    const currentError: Error = error as Error;
    console.error('connection to the db failed: ', currentError);
  }
};
const findUrls = (databaseUrl: (string | undefined)[]) => {
  for (const url of databaseUrl) {
    if (url) {
      return url;
    }
  }
  throw new Error('No Valid Database URL found');
};

export default mongoConnect;
