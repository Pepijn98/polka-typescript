/// <reference types="http">

declare module "@polka/send-type" {
    import { ServerResponse } from "http";

    export default function(
        res: ServerResponse,
        code?: number,
        data?: string | ArrayBuffer | Record<string|number|symbol, any>,
        headers?: Record<string|number|symbol, any>
    ): void;
}

declare module "@polka/send" {
    import { ServerResponse } from "http";

    export default function(
        res: ServerResponse,
        code?: number,
        data?: string | ArrayBuffer | Record<string|number|symbol, any>,
        headers?: Record<string|number|symbol, any>
    ): void;
}

declare module "@polka/url" {
    import { IncomingMessage } from "http";

    export default function(req: IncomingMessage): Record<string|number|symbol, any> | undefined;
}
