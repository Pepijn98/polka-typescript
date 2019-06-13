import settings from "../settings";
import polka, { IncomingMessage, ServerResponse } from "polka";
import APIRouter from "./api/Router";

const app = polka();
const port = settings.env.startsWith("dev") ? 8080 : 80;
const api = new APIRouter();

async function main(): Promise<void> {
    await api.loadRoutes();

    app.use(api.path, api.router);

    app.get("/", (_req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(302, { "Location": "/api" });
        res.end();
    });

    app.listen(port, (e: Error) => {
        if (e) throw e;
        console.info(`> Running on http://localhost:${port}`);
    });
}

main().catch(console.error);
