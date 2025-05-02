const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    msg: { type: "string" },
    imei: { type: "string" },
    data: { type: "object" }
  },
  required: ["msg", "imei", "data"],
  additionalProperties: true
};

module.exports = {
  validateData: ajv.compile(schema)
};