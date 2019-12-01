// Digitalocean Spaces
const spaces = require("aws-sdk");

/**
 * Create new spaces instance
 * 
 * @return {Object} spaces instance
 */
exports.createNewInstance = () => {
  const spacesEndpoint = new spaces.Endpoint(process.env.SPACES_URL);
  return new spaces.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_API_KEY,
    secretAccessKey: process.env.SPACES_API_SECRET
  });
};

/**
 * Check existance of object in bucket
 * 
 * @param {String} bucket name
 * @param {String} object name
 * @return {Object}
 */
exports.checkObjectExists = async (bucket, key) => {
  const space = this.createNewInstance();
  const params = {
    Bucket: bucket, 
    Key: `${key}.png`
  };
  try {
    await space.headObject(params).promise();
    return true;
  } catch (err) {
    return false;
  }
};

