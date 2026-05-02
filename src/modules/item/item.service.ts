import prisma from "../../config/prisma";

// Create item
export const createItem = async (data: {
    name: string;
    price: number;
    inventory: number;
}) => {
    return prisma.item.create({ data });
};

// Get all items
export const getItems = async () => {
    return prisma.item.findMany();
};

// Update item
export const updateItem = async (id: string, data: {
    name?: string;
    price?: number;
    inventory?: number;
}) => {
    const exists = await prisma.item.findUnique({ where: { id } });

    if (!exists) {
        const error: any = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.item.update({
        where: { id },
        data: {
            ...(data.name !== undefined && { name: data.name }),
            ...(data.price !== undefined && { price: data.price }),
            ...(data.inventory !== undefined && { inventory: data.inventory, }),
        },
    });
};

// Delete item
export const deleteItem = async (id: string) => {
    const item = await prisma.item.findUnique({ where: { id } });

    if (!item) {
        const error: any = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.item.delete({
        where: { id },
    });
};

// Update inventory only
export const updateInventory = async (id: string, inventory: number) => {
    const exists = await prisma.item.findUnique({ where: { id } });
    if (!exists) {
        const error: any = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.item.update({
        where: { id },
        data: { inventory },
    });
};