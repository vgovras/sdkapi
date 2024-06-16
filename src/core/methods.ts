import { Scheme, Cfg, ApiFunction } from "./core";

function validate(path: string, cfg: any) {
    return path.split('/').map(v => {
        const [, key] = v.startsWith(':') && v.split(':') || [];
        return key ? cfg[key] : v;
    }).join('/');
}

export function Post<Params, Returns>(scheme: Scheme<Params, Returns>): ApiFunction<Params, Returns> {
    return async (body: Params, cfg?: Cfg) => {
        if (!cfg) {
            throw new Error('url is required!');
        }

        return cfg.handler({ ...cfg, body, method: 'post', path: validate(cfg.path, body) });
    };
}

export function Get<Params, Returns>(scheme?: Scheme<Params, Returns>): ApiFunction<Params, Returns> {
    return async (params: Params, cfg?: Cfg) => {
        if (!cfg) {
            throw new Error('url is required!');
        }

        return cfg.handler({ ...cfg, body: params, method: 'get', path: validate(cfg.path, params) });
    };
}

export function Put<Params, Returns>(scheme: Scheme<Params, Returns>): ApiFunction<Params, Returns> {
    return async (body: Params, cfg?: Cfg) => {
        if (!cfg) {
            throw new Error('url is required!');
        }

        return cfg.handler({ ...cfg, body, method: 'put', path: validate(cfg.path, body) });
    };
}

export function Patch<Params, Returns>(scheme: Scheme<Params, Returns>): ApiFunction<Params, Returns> {
    return async (body: Params, cfg?: Cfg) => {
        if (!cfg) {
            throw new Error('url is required!');
        }

        return cfg.handler({ ...cfg, body, method: 'patch', path: validate(cfg.path, body) });
    };
}
