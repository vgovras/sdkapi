// POST /user/register
// POST /user/block
// POST /user/block/all

import { nullable, Str, Num, Api, Post, Cfg } from "./core";

const createApi = Api(
  {
    user: {
      register: Post({
        params: {
          userName: nullable(Str),
          email: Str,
        },
        returns: {
          id: Num,
          userName: nullable(Str),
          email: Str,
        },
      }),
      block: {
        $: Post({
          params: {
            email: Str,
          },
          returns: {
            id: Num,
            userName: nullable(Str),
            email: Str,
          },
        }),
        all: Post({
          params: null,
          returns: [
            {
              id: Num,
              userName: nullable(Str),
              email: Str,
            },
          ],
        }),
      },
    },
  },
);

(async () => {
    const api = createApi({
        handler(cfg: Cfg) {
            
        }
    });

  const customer = await api.user.block.$({ email: "example.com" });
})();
