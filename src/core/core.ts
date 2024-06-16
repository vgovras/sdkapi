export const Str = '' as string;
export const Num = 0 as number;
export const Bool = true as boolean;
export const Record = {} as Record<string, any>;

export function nullable<T>(v?: T) {
    return v || null;
}

export interface Scheme<Params, Returns> {
    params: Params;
    returns: Returns;
}

export interface Cfg {
    method: string;
    path: string;
    baseUrl: string;
    headers: Record<string, string>;
    handler: ApiFunction<any, any>;
}

export type ApiFunction<Params, Returns> = (args: Params) => Promise<Returns>;

export function $id<T>(name: string, v: T): T {
    return { ...v, $id: name };
}

export function Api<T extends Record<string, any>>(v: T) {
    const paths: string[] = [];
    const api = <T extends Record<string, any>>(v: T, cfg: Partial<Cfg>, url = '') => {
        // @ts-ignore
        return Object.entries(v).reduce((acc, [key, val]) => {
            if (key !== '$' && key.startsWith('$')) {
                return acc;
            }
            
            let path: string;

            if (typeof val?.$id === 'string') {
                path = [url, key, `:${val.$id}`].filter(v => v !== '$').join('/');
            } else {
                path = [url, key].filter(v => v !== '$').join('/');
            }


            // @ts-ignore
            acc[key] = typeof val === 'function'             
                ? (...args: any[]) => val(...args, { ...cfg, path })
                : api(val, cfg, ((path) => { paths.push(path); return path; })(path));

            return acc;
        }, v);
    }

    return (cfg: Partial<Cfg>) => api(v, cfg);
}
