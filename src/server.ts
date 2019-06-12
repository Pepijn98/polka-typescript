import settings from "../settings";
import send from "@polka/send-type";
import polka, { IncomingMessage, ServerResponse } from "polka";

const app = polka();
const port = settings.env.startsWith("dev") ? 8080 : 80;

app.get("/", (_req: IncomingMessage, res: ServerResponse) => {
    send(res, 200, {
        statusCode: 200,
        statusMessage: "OK",
        data: {
            message: "Request has been successfully completed",
            version: settings.version,
            env: settings.env
        }
    });
});

app.listen(port, (e: Error) => {
    if (e) throw e;
    console.info(`> Running on http://localhost:${port}`);
});
