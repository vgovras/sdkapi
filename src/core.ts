export const Str = '' as string;
export const Num = 0 as number;

export function nullable<T>(v?: T) {
    return v || null;
}

interface Scheme<Params, Returns> {
    params: Params;
    returns: Returns;
}

export interface Cfg {
    method: string;
    url: string;
    baseUrl: string;
    headers: Record<string, string>;
    handler: ApiFunction<any, any>;
}

type ApiFunction<Params, Returns> = (args: Params) => Promise<Returns>;

export function Api<T extends Record<string, any>>(v: T) {
    const api = <T extends Record<string, any>>(v: T, cfg: Cfg, url = '') => {
        // @ts-ignore
        return Object.entries(v).reduce((acc, [key, val]) => {
            const path = [url, key].filter(v => v !== '$').join('/');

            // @ts-ignore
            acc[key] = typeof val === 'function'             
                ? (...args: any[]) => val(...args, { ...cfg, path })
                :api(val, cfg, path);

            return acc;
        }, v);
    }

    return (cfg) => api(v, cfg);
}

export function Post<Params, Returns>(scheme: Scheme<Params, Returns>): ApiFunction<Params, Returns> {
    return async (body: Params, cfg?: Cfg) => {
        if (!cfg) {
            throw new Error('url is required!');
        }

        return cfg.handler({ ...cfg, body, method: 'post' });
    };
}
