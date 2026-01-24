import { APIRequestContext, expect } from "@playwright/test";
import { AddToCartResponse, AllProductsResponse, CreateOrderResponse, DeleteResponse, GetOrderDetails, GetOrdersDetail, LoginResponse, Product } from "@src/interfaces/apiInterfaces";

export class ApiUtils{

    apiContext:APIRequestContext;
    token:string;
    baseUrl:string;

    constructor(baseUrl:string,apiContext:APIRequestContext,token:string){
    this.baseUrl = baseUrl;
    this.apiContext = apiContext;
    this.token=token;
    }
    
    
    async getAllProducts():Promise<AllProductsResponse>{
        const productsResponse =  await this.apiContext.post(`${this.baseUrl}/api/ecom/product/get-all-products`, {
        data: {"productName":"","minPrice":null,"maxPrice":null,"productCategory":[],"productSubCategory":[],"productFor":[]},
        headers:{
            "Authorization":this.token,
            "Content-type":"application/json"
        }
    });
    expect(productsResponse.ok()).toBeTruthy();
    const productsResponseBody:AllProductsResponse = await productsResponse.json();
    return productsResponseBody;
}
async addToCart(userId:string, selectedProduct:Product):Promise<AddToCartResponse>{
    const addToCartResponse = await this.apiContext.post(`${this.baseUrl}/api/ecom/user/add-to-cart`, {
        data: {
            "_id": userId,
            product: selectedProduct,
        },
        headers:{
            "Authorization":this.token,
            "Content-type":"application/json"
        }
    });
    expect(addToCartResponse.ok()).toBeTruthy();
    const addToCartResponseBody:AddToCartResponse = await addToCartResponse.json();
    return addToCartResponseBody;
}
async createOrder(selectedProduct:Product,country:string):Promise<CreateOrderResponse>{
    const createOrderResponse = await this.apiContext.post(`${this.baseUrl}/api/ecom/order/create-order`, {
        data: {
            "orders":[
                {
                    "country":country,
                    "productOrderedId": selectedProduct._id
                }
            ]},
        headers:{
            "Authorization":this.token,
            "Content-type":"application/json"
        }
    });
    expect(createOrderResponse.ok()).toBeTruthy();
    const createOrderResponseBody:CreateOrderResponse = await createOrderResponse.json();
    return createOrderResponseBody;
}
async getAllOrders(userId:string):Promise<GetOrdersDetail>{
    const getAllOrders = await this.apiContext.get(`${this.baseUrl}/api/ecom/order/get-orders-for-customer/${userId}`, {
        headers:{
            "Authorization":this.token,
            "Content-type":"application/json"
        }
    });
    const getAllOrdersBody:GetOrdersDetail = await getAllOrders.json();
    return getAllOrdersBody;
}
async getOrderDetails(orderId:string):Promise<GetOrderDetails>{
    const getOrderDetails = await this.apiContext.get(`${this.baseUrl}/api/ecom/order/get-orders-details?id=${orderId}`, {
        headers:{
            "Authorization":this.token,
            "Content-type":"application/json"
        }
    });
    expect(getOrderDetails.ok()).toBeTruthy();
    const getOrderDetailsBody:GetOrderDetails = await getOrderDetails.json();
    return getOrderDetailsBody;
}
async deleteOrder(orderId:string):Promise<DeleteResponse>{
    const deleteOrderResponse = await this.apiContext.delete(`${this.baseUrl}/api/ecom/order/delete-order/${orderId}`, {
        headers:{
            "Authorization":this.token,
            "Content-type":"application/json"
        }
    });
    expect(deleteOrderResponse.ok()).toBeTruthy();
    const deleteOrderResponseBody:DeleteResponse = await deleteOrderResponse.json();
    return deleteOrderResponseBody;
}
}