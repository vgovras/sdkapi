const {
  Api,
  Get,
  Num,
  Patch,
  Post,
  Put,
  Str,
  nullable,
  $id,
} = require("../core");
const createApi = require("./api");

const api = createApi({
  handler(cfg) {
    console.log(cfg);
  },
  headers: {
    "X-Auth-Email": 123,
    "X-Auth-Key": 123,
  },
  baseUrl: "https://api.cloudflare.com/client/v4",
});

(async () => {
  const result = await api.accounts.workers.scripts.$({accountId: 1})
})();
