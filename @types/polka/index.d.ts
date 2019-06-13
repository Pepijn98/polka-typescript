/// <reference types="trouter">
/// <reference types="http">

declare module "polka" {
    import Trouter from "trouter";
    import { IncomingMessage, ServerResponse, Server } from "http";

    export {
        IncomingMessage,
        ServerResponse
    };

    export interface PolkaOpts {
        server?: Server;
        onError?: Function;
        onNoMatch?: Function;
    }

    export class Polka<T = any> extends Trouter {
        apps: Record<string|number|symbol, T>;
        wares: T[];
        bwares: Record<string|number|symbol, T>;
        parse: Function;
        server: Server;
        onError: Function;
        onNoMatch: Function;

        constructor(opts?: PolkaOpts);

        add(method: Trouter.HTTPMethod, pattern: string, ...fns: T[]): this;

        use(base: string, ...fns: T[]): this;

        use(fn: Function): this;

        listen(port: string | number, ...fns: T[]): this;

        handler(req: IncomingMessage, res: ServerResponse, info: Record<string|number|symbol, T>): void;
    }

    export default function(opts?: PolkaOpts): Polka;
}
