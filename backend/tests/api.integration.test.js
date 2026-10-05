import request from "supertest";
import { describe, expect, test, vi } from "vitest";

vi.setConfig({ testTimeout: 30000 });

const API_URL = "https://webdev-project-mgyi.onrender.com";

describe("Nordic Spices deployed API integration tests", () => {
  test("GET / returns API welcome message", async () => {
    const response = await request(API_URL).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to my REST API!");
  });

  test("GET /api/menu returns menu items", async () => {
    const response = await request(API_URL).get("/api/menu");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/menu/lunch returns lunch menu", async () => {
    const response = await request(API_URL).get("/api/menu/lunch");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/menu/fine-dining returns fine dining menu", async () => {
    const response = await request(API_URL).get("/api/menu/fine-dining");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/menu/13 returns one menu item", async () => {
    const response = await request(API_URL).get("/api/menu/13");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(Number(response.body.id)).toBe(13);
  });

  test("POST /api/menu without token returns 401", async () => {
    const response = await request(API_URL).post("/api/menu").send({
      name: "Integration Test Dish",
      price: 10,
      dayOfWeek: "Monday",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /api/reservations without admin token returns 401", async () => {
    const response = await request(API_URL).get("/api/reservations");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
