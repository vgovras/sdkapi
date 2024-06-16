const { Bool, Get, Num, Record, Str, Api, $id } = require("../core");

module.exports = Api({
  accounts: $id("accountId", {
    workers: {
      scripts: {
        $: Get({
          params: {
            accountId: Num,
          },
          returns: {
            errors: [Record],
            messages: [Str],
            success: Bool,
            result: [
              {
                created_on: Str,
                etag: Str,
                id: Str,
                logpush: Bool,
                modified_on: Str,
                placement_mode: Str,
                tail_consumers: [
                  {
                    environment: Str,
                    namespace: Str,
                    service: Str,
                  },
                ],
                usage_model: Str,
              },
            ],
          },
        }),
        delete: $id("scriptName", {
          $: Get({
            params: {
              accountId: Num,
              scriptName: Str,
            },
            returns: void 0,
          }),
        }),
      },
    },
  }),
});
