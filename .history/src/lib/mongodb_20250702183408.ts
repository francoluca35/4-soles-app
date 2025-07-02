declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
  }
  
  import { MongoClient } from "mongodb";

  const uri = process.env.MONGODB_URI as string;
  const options = {};
  
  let client: MongoClient;
  
  
  declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
  }
  
  // Reutilizamos el cliente si ya está conectado en desarrollo
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  
  const clientPromiseFinal = global._mongoClientPromise!;
  export default clientPromiseFinal;
  