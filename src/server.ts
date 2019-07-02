import settings from "../settings";
import APIRouter from "./api/Router";
import bodyParser from "body-parser";
import morgan from "morgan";
import chalk from "chalk";
import RateLimit from "express-rate-limit";
import polka, { ServerRequest, ServerResponse } from "polka";

const app = polka(settings.polka);
const port = settings.env.startsWith("dev") ? 8080 : 80;
const api = new APIRouter();

/** Create an api ratelimiter to prevent spam */
const limiter = new RateLimit({
    windowMs: 5 * 1000,
    max: 10,
    handler: (_req, res) => res.status(429).json({
        statusCode: 429,
        statusMessage: "Too Many Requests",
        data: {
            message: "You hit the ratelimit, please calm down!"
        }
    })
});

/** Colored route type */
morgan.token("type-colored", (req) => {
    if (req.originalUrl && req.originalUrl.includes("/api")) {
        return chalk.bold.green("[ API ]");
    } else {
        return chalk.bold.red("[ Unknown ]");
    }
});

/** Colored status code */
morgan.token("status-colored", (_req, res) => {
    if (res.headersSent || Boolean(res.getHeaders())) {
        let status = "";
        const statusCode = res.statusCode.toString();
        switch (true) {
            case res.statusCode >= 500:
                status = chalk.red(statusCode);
                break;
            case res.statusCode >= 400:
                status = chalk.yellow(statusCode);
                break;
            case res.statusCode >= 300:
                status = chalk.cyan(statusCode);
                break;
            case res.statusCode >= 200:
                status = chalk.green(statusCode);
                break;
            default:
                status = chalk.gray(statusCode);
                break;
        }
        return status;
    }
    return "";
});

async function main(): Promise<void> {
    await api.loadRoutes();

    // Log each request that is made to /api routes
    app.use(morgan(":type-colored :req[cf-connecting-ip] :method :url :status-colored :response-time[0]ms \":user-agent\"", {
        skip: (req) => (!req.originalUrl.includes("/api") || req.originalUrl.includes("robots.txt"))
    }) as any); // Need to cast to any because express' Request class is different that the ServerRequest class from http
    app.use(limiter as any);
    app.use(bodyParser.json());
    app.use(api.path, api.router);

    app.get("/", (_req: ServerRequest, res: ServerResponse) => {
        res.writeHead(302, { "Location": "/api" });
        res.end();
    });

    app.listen(port, (e: Error) => {
        if (e) throw e;
        console.info(`> Running on http://localhost:${port}`);
    });
}

main().catch(console.error);
