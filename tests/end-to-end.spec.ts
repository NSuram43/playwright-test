// import { test, expect,request } from "@playwright/test";
// import { LoginPage } from "../src/PageObjects/LoginPage";
// import { Dashboard } from "../src/PageObjects/DashboardPage";
// import { CartPage } from "../src/PageObjects/CartPage";
// import { OrderPage } from "../src/PageObjects/OrderPage";
// import { ProductDetails } from "../src/utils/constants";
// import { URLS } from "../src/utils/Urls";
// import { productTestCases } from "@src/fixtures/ProductDetails";
// import {OrderConfirmationPage} from "../src/PageObjects/OrderConfirmation";
// import { OrderHistoryPage } from "@src/PageObjects/OrderHistoryPage";
// import { OrderDetailsPage } from "@src/PageObjects/OrderDetailsPage";

//     let loginPage:LoginPage;
//     let dashboardPage:Dashboard;
//     let cartPage:CartPage;
//     let orderPage:OrderPage;
//     let orderConfirmationPage:OrderConfirmationPage;
//     let orderHistoryPage:OrderHistoryPage;
//     let orderDetails:OrderDetailsPage;
//     let token:any;

//     test.beforeAll( async ()=>{
//         const apiContext = await request.newContext({
//             ignoreHTTPSErrors: true
//         });
//         const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
//             data: {
//                 userEmail: process.env.EMAIL,
//                 userPassword: process.env.PASSWORD
//             }
//         })
//         expect(loginResponse.ok()).toBeTruthy();
//         const loginResponseBody = await loginResponse.json();
//         token = loginResponseBody.token;
//     })
//     test.beforeEach( async ({page})=>{
//         // Set the token in local storage before each test
//         await page.addInitScript( value => {
//             window.localStorage.setItem('token', value);
//         }, token);
//     });

// test.describe("end-to-end test", () => {
//     test.describe.configure({ timeout:60000 });
//     test.beforeEach(async ({ page }) => {
//         loginPage = new LoginPage(page);
//         dashboardPage = new Dashboard(page);
//         cartPage = new CartPage(page);
//         orderPage = new OrderPage(page);
//         orderConfirmationPage = new OrderConfirmationPage(page);
//         orderHistoryPage = new OrderHistoryPage(page);
//         orderDetails = new OrderDetailsPage(page);

//         await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
//         const email = process.env.EMAIL;
//         const password = process.env.PASSWORD;
        
//         if (!email || !password) {
//             throw new Error('Email or password is not defined in the environment variables.');
//         }

//         // await loginPage.login(email, password);
//         await expect(page).toHaveURL(URLS.DASHBOARD_URL); 

//     });

//         productTestCases.forEach(data=>{
//             test(`E2E - ${data.testName}`, async ({page}) => {
//             await dashboardPage.validateDashboardPage();
//             const productsForValidation:ProductDetails[] = [];
//             let calculatedTotal = 0;
//             for(const productName of data.products){
//                 const addToCartResponsePromise = page.waitForResponse('**/api/ecom/user/add-to-cart');
//                 await dashboardPage.addProductToCart(productName);
//                 const addToCartResponse = await addToCartResponsePromise;
//                 expect(addToCartResponse.status()).toBe(200);
//                 const responseBody = await addToCartResponse.json();
//                 expect(responseBody.message).toBe('Product Added To Cart');
//                 const price = await dashboardPage.getProductValue(productName);
//                 if(price){
//                     calculatedTotal += parseFloat(price);
//                     productsForValidation.push({name:productName, price:price, quantity:1});

//                 }else{
//                     throw new Error(`Could Not find price for product: ${productName}`);
//                 }
//             }
        
//             await dashboardPage.navigateToCart();
//             await expect(page).toHaveURL(URLS.CART_URL);
    
//             const cartItemsCount = await cartPage.getCartItemsCount();
//             expect(cartItemsCount).toBe(data.products.length);

//             await cartPage.validateCartItems(data.products);
//             const cartTotalPriceString = await cartPage.getCartTotalPrice();
//             const cartTotalPrice = parseFloat(cartTotalPriceString.replace(/[$\s,]/g, ''));
//             expect(cartTotalPrice).toBeCloseTo(calculatedTotal);
        
//             await cartPage.proceedToCheckout();

//             const email = process.env.EMAIL as string;
//             await orderPage.validateProductDetails(productsForValidation);
//             await orderPage.validateShippingInfoForm(email);
//             await orderPage.selectCountry('India');
//             await orderPage.paymentWithCreditCard('4542993192922293', 'Test User', '123');
//             await orderPage.placeOrder();

//             await orderConfirmationPage.validateOrderConfirmationMessage('Thankyou for the order.');
//             const orderId = await orderConfirmationPage.getOrderId();
//             expect(orderId).not.toBeNull();
//             await dashboardPage.navigateToOrders();

//             await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/myorders');
//             await orderHistoryPage.validateOrderHistoryHeaderText('Your Orders');
//             const orderIdIndex = await orderHistoryPage.getOrderIdIndex(orderId as string);
//             await orderHistoryPage.validateOrderIdInOrderHistory(orderId as string,orderIdIndex);
//             await orderHistoryPage.getOrderDetails(orderId as string,orderIdIndex);
//             await orderDetails.validateOrderDetailsPage();
//             await orderDetails.validateOrderId(orderId as string);
// });
// })
// });
