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

if (!process.env.COSMOS_DB_DATABASE_NAME) {
  throw new Error(
    "COSMOS_DB_DATABASE_NAME must be set. Did you forget to configure Cosmos DB?",
  );
}

if (!process.env.COSMOS_DB_CONTAINER_NAME) {
  throw new Error(
    "COSMOS_DB_CONTAINER_NAME must be set. Did you forget to configure Cosmos DB?",
  );
}

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE_NAME;
const containerId = process.env.COSMOS_DB_CONTAINER_NAME;

// Initialize Cosmos DB client
export const client = new CosmosClient({ endpoint, key });
export const database = client.database(databaseId);
export const container = database.container(containerId);
