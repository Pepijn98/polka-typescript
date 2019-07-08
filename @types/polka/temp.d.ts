/// <reference types="node" />
/// <reference types="trouter" />

import { IncomingMessage, ServerResponse } from "http";
import { Server } from "net"
import Trouter from "trouter";

declare function polka(options?: polka.Options): polka.Polka;

declare namespace polka {
    type NextHandler = (err?: Error | string) => void;
    type RequestHandler = (req: IncomingMessage, res: ServerResponse, next?: NextHandler) => void;
    type Middleware = Polka | RequestHandler;

    type ErrorHandler = (err: Error | string, req: IncomingMessage, res: ServerResponse, next: NextHandler) => void;

    export class ServerRequest extends IncomingMessage {
        params: Record<string | number | symbol, any>;
        path: string;
        search: string | null;
        query: Record<string | number | symbol, any>;
        [x: string]: any | undefined;
    }

    export interface Options {
        server?: typeof Server;
        onError?: ErrorHandler;
        onNoMatch?: RequestHandler;
    }

    interface URLDescription {
        _raw: string;
        href: string;
        path: string;
        pathname: string;
        query: string | null;
        search: string | null;
    }

    export class Polka extends Trouter<RequestHandler> {
        readonly server: Server;
        readonly onError: ErrorHandler;
        readonly onNoMatch: RequestHandler;
        readonly [x: string]: any | undefined;

        attach: (req: IncomingMessage, res: ServerResponse) => void;
		parse: (req: IncomingMessage) => URLDescription | void;

        add(method: Trouter.HTTPMethod, pattern: string, ...fns: Middleware[]): this;

        use(...handlers: Middleware[]): this;
        use(pattern: string, ...handlers: Middleware[]): this;

        // Request and Response from express are different than the ones from http
        // to still use middleware from express without errors we need to use type any
        // everything still works as expected
        use(fn: (req: any, res: any, next: NextHandler) => any): this;

        readonly handler: RequestHandler

        listen: Server["listen"];
    }
}

export = polka;
