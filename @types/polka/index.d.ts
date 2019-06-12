/// <reference types="trouter">
/// <reference types="http">

declare module "polka" {
    import Trouter from "trouter";
    import { IncomingMessage, ServerResponse } from "http";

    export {
        IncomingMessage,
        ServerResponse
    };

    export interface PolkaOpts {
        server: any;
        onError?: Function;
        onNoMatch?: Function;
    }

    export class Polka<T = any> extends Trouter {
        apps: Record<string|number|symbol, any>;
        wares: any[];
        bwares: Record<string|number|symbol, any>;
        parse: any; // TODO: Update to @polka/url parser
        server: any;
        onError: Function;
        onNoMatch: Function;

        constructor(opts?: PolkaOpts);

        add(method: Trouter.HTTPMethod, pattern: string, ...fns: T[]): this;

        use(base: string, ...fns: T[]): this;

        listen(port: string | number, ...fns: T[]): this;

        handler(req: IncomingMessage, res: ServerResponse, info: Record<string|number|symbol, any>): void;
    }

    function polka(opts?: PolkaOpts): Polka;

    export default polka;
}
