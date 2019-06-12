/// <reference types="http">

declare module "@polka/send-type" {
    import { ServerResponse } from "http";

    function fn(
        res: ServerResponse,
        code?: number,
        data?: string | ArrayBuffer | Record<string|number|symbol, any>,
        headers?: Record<string|number|symbol, any>
    ): void;

    export = fn;
}
