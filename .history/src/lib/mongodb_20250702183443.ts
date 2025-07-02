declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
  }
  
  import { MongoClient } from "mongodb";

  const uri = process.env.MONGODB_URI as string;
  const options = {};
  
  declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
  }
  
  // Reutilizamos el cliente si ya está conectado en desarrollo
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  
  const clientPromise = global._mongoClientPromise!;
  export default clientPromise;
  