import express, { Express, Request, Response } from "express";
import routes from "./src/Routes";
import { ResponseBuilder } from "./src";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes config
app.use("/api/v1", routes);

// Api Health Check
app.get("/health", (req: Request, res: Response) => {
  try {
    const message = "API is working very fine fire on!!!";
    const successResponse = new ResponseBuilder(message, 200, null);
    res.status(200).json(successResponse.toJson());
  } catch (err) {
    res
      .status(400)
      .json(new ResponseBuilder("Api has Issues", 400, err).toJson());
  }
});

export { app };
