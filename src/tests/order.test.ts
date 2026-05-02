import request from "supertest";
import app from "../app";
import prisma from "../config/prisma";

describe("Order API", () => {  
  const TEST_USER_ID = "11111111-1111-1111-1111-111111111111";
  const TEST_ITEM_ID = "550e8400-e29b-41d4-a716-446655440000"; // Soap

  beforeAll(async () => {
    // Clean previous orders
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    // Reset inventory
    await prisma.item.update({
      where: { id: TEST_ITEM_ID },
      data: { inventory: 150 }
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create an order successfully and reduce inventory", async () => {
    const res = await request(app)
      .post("/api/user/orders")
      .send({
        items: [{ itemId: TEST_ITEM_ID, quantity: 2 }],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.userId).toBe(TEST_USER_ID);

    // Check inventory reduced
    const updatedItem = await prisma.item.findUnique({
      where: { id: TEST_ITEM_ID },
    });

    expect(updatedItem?.inventory).toBe(148);
  });

  it("should fail when inventory is insufficient", async () => {
    const res = await request(app)
      .post("/api/user/orders")
      .send({
        items: [{ itemId: TEST_ITEM_ID, quantity: 9999 }],
      });

    expect(res.status).toBe(400);
  });

  it("should fail for a non-existent item ID", async () => {
    const res = await request(app)
      .post("/api/user/orders")
      .send({
        items: [{ itemId: "00000000-0000-0000-0000-000000000000", quantity: 1 }],
      });

    expect(res.status).toBe(404);
  });
});