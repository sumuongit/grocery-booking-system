import { Router } from "express";
import * as orderController from "./order.controller";
import { mockAuth } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";

const router = Router();

// User places order
router.post("/user/orders", mockAuth(Role.USER), orderController.createOrder);

export default router;