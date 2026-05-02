import { Request, Response, NextFunction } from "express";
import * as itemService from "./item.service";

// Create new item (Admin) 
export const createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, inventory } = req.body;

        // Check name, price, and inventory are available
        if (!name || price === undefined || inventory === undefined) {
            const error: any = new Error("name, price, and inventory are required");
            error.statusCode = 400;
            return next(error);
        }

        const parsedPrice = Number(price);
        const parsedInventory = Number(inventory);

        // Validate numeric values
        if (isNaN(parsedPrice) || isNaN(parsedInventory)) {
            const error: any = new Error("price and inventory must be valid numbers");
            error.statusCode = 400;
            return next(error);
        }

        const item = await itemService.createItem({
            name,
            price: parsedPrice,
            inventory: parsedInventory
        });
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
};

// Get all items (Public)
export const getItems = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await itemService.getItems();
        res.json(items);
    } catch (error) {
        next(error);
    }
};

// Update item details (Admin)
export const updateItem = async (req: Request<{ id: string }, {}, any>, res: Response, next: NextFunction) => {
    try {
        const data: any = { ...req.body };

        if (data.price !== undefined) {
            const parsedPrice = Number(data.price);
            if (isNaN(parsedPrice)) {
                const error: any = new Error("price must be a number");
                error.statusCode = 400;
                return next(error);
            }
            data.price = parsedPrice;
        }

        if (data.inventory !== undefined) {
            const parsedInventory = Number(data.inventory);
            if (isNaN(parsedInventory)) {
                const error: any = new Error("inventory must be a number");
                error.statusCode = 400;
                return next(error);
            }
            data.inventory = parsedInventory;
        }

        const item = await itemService.updateItem(req.params.id, data);
        res.json(item);
    } catch (error) {
        next(error);
    }
};

//Delete item (Admin)
export const deleteItem = async (req: Request<{ id: string }, {}, any>, res: Response, next: NextFunction) => {
    try {
        await itemService.deleteItem(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Update inventory (Admin)
export const updateInventory = async (req: Request<{ id: string }, {}, any>, res: Response, next: NextFunction) => {
    try {
        const { inventory } = req.body;
        const parsedInventory = Number(inventory);

        if (inventory === undefined || isNaN(parsedInventory)) {
            const error: any = new Error("Valid inventory number is required");
            error.statusCode = 400;
            return next(error);
        }

        const item = await itemService.updateInventory(req.params.id, parsedInventory);
        res.json(item);
    } catch (error) {
        next(error);
    }
};