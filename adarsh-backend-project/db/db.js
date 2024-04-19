const CosmosClient = require("@azure/cosmos").CosmosClient;

const client = new CosmosClient({
  endpoint: "https://cosmosdbcapstone.documents.azure.com:443/",
  key: "wIs79Ylgf8xFS6ZVSTkMV59ars5ih6LJ8hdyM4eDr6E5xl1U7roNL7xi2UktkhwAC7P1xIE93JrJACDbL1AO6w==",
});

const database = client.database("knowledgesharingcosmos");
const queryContainer = database.container("querry");
const userContainer = database.container("users");
const commentContainer = database.container("comments");
const replyContainer = database.container("replies");
module.exports = {
  queryContainer,
  userContainer,
  commentContainer,
  replyContainer,
};
