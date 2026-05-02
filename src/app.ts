import express from 'express';
import cors from 'cors';
import itemRoutes from "./modules/item/item.routes";
import orderRoutes from "./modules/order/order.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", itemRoutes);
app.use("/api", orderRoutes);

export default app;