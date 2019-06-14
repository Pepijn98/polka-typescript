declare module "polka" {
    import Trouter from "trouter";
    import { IncomingMessage, ServerResponse, Server } from "http";

    export type NextFunction = (err?: any) => void;
    export type OnErrorFunction = (err: string | Error, req: ServerRequest, res: ServerResponse, next: NextFunction) => void;
    export type OnNoMatchFunction = (req: ServerRequest, res: ServerResponse) => void;

    export class ServerRequest extends IncomingMessage {
        params: Record<string|number|symbol, any>;
        path: string;
        search: string | null;
        query: Record<string|number|symbol, any>;
        [x: string]: any | undefined;
    }

    export { ServerResponse };

    export interface PolkaOpts {
        server?: Server;
        onError?: OnErrorFunction;
        onNoMatch?: OnNoMatchFunction;
    }

    export class Polka<T = any> extends Trouter {
        apps: Record<string|number|symbol, T>;
        wares: T[];
        bwares: Record<string|number|symbol, T>;
        parse: Function;
        server: Server;
        onError: OnErrorFunction;
        onNoMatch: OnNoMatchFunction;

        [x: string]: any | undefined;

        constructor(opts?: PolkaOpts);

        add(method: Trouter.HTTPMethod, pattern: string, ...fns: T[]): this;

        use(base: string, ...fns: T[]): this;

        use(fn: (req: ServerRequest, res: ServerResponse, next: NextFunction) => any): this;

        listen(port: string | number, ...fns: T[]): this;

        handler(req: ServerRequest, res: ServerResponse, info: Record<string|number|symbol, T>): void;
    }

    export default function(opts?: PolkaOpts): Polka;
}
