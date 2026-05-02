import { Request, Response, NextFunction } from "express";
import * as orderService from "./order.service";
import { MOCK_USER_ID } from "../../constants/mockUser";

// Place order (User)
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        const error: any = new Error("Items are required");
        error.statusCode = 400;
        return next(error);
    }

    try {
        const order = await orderService.createOrder({
            userId: MOCK_USER_ID, // User authentication is simplified using a mock user ID
            items,
        });

        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};