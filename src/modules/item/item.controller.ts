import { Request, Response } from "express";
import * as itemService from "./item.service";

// Create new item (Admin) 
export const createItem = async (req: Request, res: Response) => {
    const { name, price, inventory } = req.body;

    // Check name, price, and inventory are available
    if (!name === undefined || price === undefined || inventory === undefined) {
        return res.status(400).json({
            message: "name, price, and inventory are required",
        });
    }

    const parsedPrice = Number(price);
    const parsedInventory = Number(inventory);

    // Validate numeric values
    if (isNaN(parsedPrice) || isNaN(parsedInventory)) {
        return res.status(400).json({
            message: "price and inventory must be valid numbers",
        });
    }

    const item = await itemService.createItem({
        name,
        price: parsedPrice,
        inventory: parsedInventory
    });
    res.status(201).json(item);
};

// Get all items (Public)
export const getItems = async (_req: Request, res: Response) => {
    const items = await itemService.getItems();
    res.json(items);
};

// Update item details (Admin)
export const updateItem = async (req: Request<{ id: string }, {}, any>, res: Response) => {
    const data: any = { ...req.body };

    if (data.price !== undefined) {
        const parsedPrice = Number(data.price);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({ message: "price must be a number" });
        }
        data.price = parsedPrice;
    }

    if (data.inventory !== undefined) {
        const parsedInventory = Number(data.inventory);
        if (isNaN(parsedInventory)) {
            return res.status(400).json({ message: "inventory must be a number" });
        }
        data.inventory = parsedInventory;
    }

    const item = await itemService.updateItem(req.params.id, data);
    res.json(item);
};

//Delete item (Admin)
export const deleteItem = async (req: Request<{ id: string }, {}, any>, res: Response) => {
    await itemService.deleteItem(req.params.id);
    res.json({ message: "Item deleted successfully" });
};

// Update inventory (Admin)
export const updateInventory = async (req: Request<{ id: string }, {}, any>, res: Response) => {
    const { inventory } = req.body;

    if (inventory === undefined) {
        return res.status(400).json({ message: "inventory is required" });
    }

    const parsedInventory = Number(inventory);

    if (isNaN(parsedInventory)) {
        return res.status(400).json({ message: "inventory must be a number" });
    }

    const item = await itemService.updateInventory(
        req.params.id,
        parsedInventory
    );

    res.json(item);
};