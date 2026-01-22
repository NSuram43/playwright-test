import { test, expect,request, APIRequestContext } from "@playwright/test";

let token:any;
let apiContext:APIRequestContext;

test.beforeAll( async ()=>{
    apiContext = await request.newContext({
        ignoreHTTPSErrors: true
    });
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: {
            userEmail: process.env.EMAIL,
            userPassword: process.env.PASSWORD
        }
    })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseBody = await loginResponse.json();
    token = loginResponseBody.token;
})
test.beforeEach( async ({page})=>{
    // Set the token in local storage before each test
    await page.addInitScript( value => {
        window.localStorage.setItem('token', value);
    }, token);
});

test.describe("API Flow test", () => {
    test("Place order and verify in order history", async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

        const getAllProducts = await apiContext.post("https://rahulshettyacademy.com/api/ecom/product/get-all-products", {
            data: {"productName":"","minPrice":null,"maxPrice":null,"productCategory":[],"productSubCategory":[],"productFor":[]},
            headers:{
                "Authorization":token,
                "Content-type":"application/json"
            }
    });

    expect(getAllProducts.ok()).toBeTruthy();
    const productsResponse = await getAllProducts.json();
    const products = productsResponse.data;
    const selectedProduct = products.find((product:any)=>product.productName === "ADIDAS ORIGINAL");

    const addToCartResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
        data: {
            "_id": "69196aae5008f6a90921edee",
            product: selectedProduct,
        },
        headers:{
            "Authorization":token,
            "Content-type":"application/json"
        }
    });
    expect(addToCartResponse.ok()).toBeTruthy();
    const addToCartResponseBody = await addToCartResponse.json();
    expect(addToCartResponseBody.message).toBe("Product Added To Cart");

    const createOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: {
            "orders":[
                {
                    "country":"India",
                    "productOrderedId": selectedProduct._id
                }
            ]},
        headers:{
            "Authorization":token,
            "Content-type":"application/json"
        }
    });
    expect(createOrderResponse.ok()).toBeTruthy();
    const createOrderResponseBody = await createOrderResponse.json();
    const orderId = createOrderResponseBody.orders[0];
    expect(createOrderResponseBody.message).toBe("Order Placed Successfully");
    expect(createOrderResponseBody.productOrderId[0]).toBe(selectedProduct._id);
});
});