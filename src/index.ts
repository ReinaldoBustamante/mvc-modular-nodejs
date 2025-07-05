import { AppRouter } from "./routes";
import { AppServer } from "./server";

const serverApp = new AppServer(3000, AppRouter.router());

serverApp.start();
