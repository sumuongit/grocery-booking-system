import prisma from "../../config/prisma";

export const createOrder = async (data: {
    userId: string;
    items: { itemId: string; quantity: number }[];
}) => {
    return prisma.$transaction(async (tx) => {
        let totalPrice = 0;

        // Fetch items
        const itemIds = data.items.map((i) => i.itemId);

        const dbItems = await tx.item.findMany({
            where: { id: { in: itemIds } },
        });

        // Validate items and calculate total price
        for (const orderItem of data.items) {
            const dbItem = dbItems.find((i) => i.id === orderItem.itemId);

            if (!dbItem) {
                const error: any = new Error(`Item not found: ${orderItem.itemId}`);
                error.statusCode = 400;
                throw error;
            }

            if (dbItem.inventory < orderItem.quantity) {
                const error: any = new Error(`Insufficient stock for item: ${dbItem.name}`);
                error.statusCode = 400;
                throw error;
            }

            totalPrice += dbItem.price * orderItem.quantity;
        }

        // Create order
        const order = await tx.order.create({
            data: {
                userId: data.userId,
                totalPrice,
            },
        });

        // Create order items and update inventory
        for (const orderItem of data.items) {
            const dbItem = dbItems.find((i) => i.id === orderItem.itemId)!;

            await tx.orderItem.create({
                data: {
                    orderId: order.id,
                    itemId: dbItem.id,
                    quantity: orderItem.quantity,
                    price: dbItem.price,
                },
            });

            await tx.item.update({
                where: { id: dbItem.id },
                data: {
                    inventory: dbItem.inventory - orderItem.quantity,
                },
            });
        }

        return tx.order.findUnique({
            where: { id: order.id },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
            }
        });
    });
};