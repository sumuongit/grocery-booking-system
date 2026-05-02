import { Request, Response } from "express";
import * as orderService from "./order.service";
import { MOCK_USER_ID } from "../../constants/mockUser";

export const createOrder = async (req: Request, res: Response) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items are required" });
  }

  try {
    const order = await orderService.createOrder({
      userId: MOCK_USER_ID, // User authentication is simplified using a mock user ID
      items,
    });

    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};