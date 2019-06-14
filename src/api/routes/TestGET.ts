import send from "@polka/send-type";
import APIRouter from "../Router";
import BaseRoute from "../BaseRoute";
import { Polka } from "polka";
import { IncomingMessage, ServerResponse } from "http";

export default class TestPOST extends BaseRoute {
    public method: string;
    public path: string;
    public router: Polka;

    public constructor(api: APIRouter) {
        super();

        this.method = "get";
        this.path = "/test";
        this.router = api.router;

        this.router[this.method](this.path, this.run.bind(this));
    }

    public async run(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const request = req as any;
        if (request.query && Object.entries(request.query).length !== 0) {
            send(res, 200, {
                statusCode: 200,
                statusMessage: "OK",
                data: {
                    message: "Request successfully completed",
                    requestQueries: request.query
                }
            });
        } else {
            send(res, 400, {
                statusCode: 400,
                statusMessage: "Bad Request",
                data: {
                    message: "Missing request queries"
                }
            });
        }
    }
}
