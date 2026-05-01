import { Router } from "express";
import * as itemController from "./item.controller";
import { mockAuth } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";

const router = Router();

// Public
router.get("/items", itemController.getItems);

// Admin
router.post("/admin/items", mockAuth(Role.ADMIN), itemController.createItem);
router.patch("/admin/items/:id", mockAuth(Role.ADMIN), itemController.updateItem);
router.delete("/admin/items/:id", mockAuth(Role.ADMIN), itemController.deleteItem);
router.patch("/admin/items/:id/inventory", mockAuth(Role.ADMIN), itemController.updateInventory);

export default router;