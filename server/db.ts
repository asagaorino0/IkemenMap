import { CosmosClient } from '@azure/cosmos';

if (!process.env.COSMOS_DB_ENDPOINT) {
  throw new Error(
    "COSMOS_DB_ENDPOINT must be set. Did you forget to configure Cosmos DB?",
  );
}

if (!process.env.COSMOS_DB_KEY) {
  throw new Error(
    "COSMOS_DB_KEY must be set. Did you forget to configure Cosmos DB?",
  );
}

if (!process.env.COSMOS_DATABASE_NAME) {
  throw new Error(
    "COSMOS_DATABASE_NAME must be set. Did you forget to configure Cosmos DB?",
  );
}

if (!process.env.COSMOS_CONTAINER_NAME) {
  throw new Error(
    "COSMOS_CONTAINER_NAME must be set. Did you forget to configure Cosmos DB?",
  );
}
const COSMOS = {
  conn: process.env.COSMOS_CONNECTION_STRING!,
  db: process.env.COSMOS_DATABASE_NAME!,
  loginUser: process.env.COSMOS_CONTAINER_NAME
};
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DATABASE_NAME;
const containerId = process.env.COSMOS_CONTAINER_NAME;

// Initialize Cosmos DB client
export const client = new CosmosClient({ endpoint, key });
// export const client = new CosmosClient(COSMOS.conn);
export const database = client.database(databaseId);
export const container = database.container("stores");
// export const container = database.container(containerId);
// export const container = "stores"
