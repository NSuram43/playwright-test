import { test, expect, request, APIRequestContext } from "@playwright/test";
import { ApiUtils } from "@src/utils/apiUtils";
import { login } from "@src/utils/loginApi";

let token: any;
let apiContext: APIRequestContext;
let userId = "69196aae5008f6a90921edee";
let apiUtils: ApiUtils;
let baseUrl = "https://rahulshettyacademy.com";

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  token = await login(apiContext);
  apiUtils = new ApiUtils(baseUrl, apiContext, token);
});
test.beforeEach(async ({ page }) => {
  // Set the token in local storage before each test
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
});

test.describe("API Flow test", () => {
  test("Place order and verify in order history", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const productsResponse = await apiUtils.getAllProducts();
    const products = productsResponse.data;
    const selectedProduct = products.find(
      (product: any) => product.productName === "ADIDAS ORIGINAL"
    );

    if (!selectedProduct) {
      throw new Error("Product not found");
    }

    const addToCartResponseBody = await apiUtils.addToCart(
      userId,
      selectedProduct
    );
    expect(addToCartResponseBody.message).toBe("Product Added To Cart");

    const createOrderResponseBody = await apiUtils.createOrder(
      selectedProduct,
      "India"
    );
    const orderId = createOrderResponseBody.orders[0];
    expect(createOrderResponseBody.message).toBe("Order Placed Successfully");
    expect(createOrderResponseBody.productOrderId[0]).toBe(selectedProduct._id);

    const getOrderDetailsBody = await apiUtils.getOrderDetails(orderId);
    expect(getOrderDetailsBody.data._id).toBe(orderId);
    expect(getOrderDetailsBody.data.productOrderedId).toBe(selectedProduct._id);
    expect(getOrderDetailsBody.data.productName).toBe("ADIDAS ORIGINAL");
    expect(getOrderDetailsBody.message).toBe(
      "Orders fetched for customer Successfully"
    );

    const getAllOrdersBody = await apiUtils.getAllOrders(userId);
    const order = getAllOrdersBody.data.find(
      (order: any) => order._id === orderId
    );
    expect(order).toBeDefined();

    const deleteOrderResponseBody = await apiUtils.deleteOrder(orderId);
    expect(deleteOrderResponseBody.message).toBe("Orders Deleted Successfully");

    const getAllOrdersBody1 = await apiUtils.getAllOrders(userId);
    const order1 = getAllOrdersBody1.data.find(
      (order: any) => order._id === orderId
    );
    expect(order1).toBeUndefined();
  });
});
