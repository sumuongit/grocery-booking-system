import express from 'express';
import cors from 'cors';
import itemRoutes from "./modules/item/item.routes";
import orderRoutes from "./modules/order/order.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", itemRoutes);
app.use("/api", orderRoutes);

app.use(errorHandler);

export default app;