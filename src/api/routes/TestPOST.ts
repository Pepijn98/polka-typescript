import send from "@polka/send-type";
import APIRouter from "../Router";
import BaseRoute from "../BaseRoute.ts";
import { Polka } from "polka";
import { IncomingMessage, ServerResponse } from "http";

export default class TestPOST extends BaseRoute {
    public method: string;
    public path: string;
    public router: Polka;

    public constructor(api: APIRouter) {
        super();

        this.method = "post";
        this.path = "/test";
        this.router = api.router;

        this.router.post(this.path, this.run.bind(this));
    }

    async run(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const body = (req as any).body;
        if (body) {
            send(res, 200, {
                statusCode: 200,
                statusMessage: "OK",
                data: {
                    message: "Request successfully completed",
                    requestBody: body
                }
            });
        } else {
            send(res, 400, {
                statusCode: 400,
                statusMessage: "Bad Request",
                data: {
                    message: "Missing request body"
                }
            });
        }
    }
}
