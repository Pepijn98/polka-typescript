import { IncomingMessage, ServerResponse } from "http";

export interface IRoute {
    method: "get" | "post", // Add more if needed, e.g. update, patch.....
    path: string,
    fn: (req: IncomingMessage, res: ServerResponse) => any
}
