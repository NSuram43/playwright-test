export interface LoginResponse {
    token: string;
    userId: string;
    message: string;
}

export interface Product {
    _id: string;
    productName: string;
    productCategory: string;
    productSubCategory: string;
    productPrice: number;
    productDescription: string;
    productImage: string;
    productRating: string;
    productTotalOrders: string;
    productStatus: boolean;
    productFor: string;
    productAddedBy: string;
    __v: number;
}

export interface AllProductsResponse {
    data: Product[];
    count: number;
    message: string;
}

export interface AddToCartResponse {
    message:string;
}

export interface DeleteResponse {
    message:string;
}

export interface CreateOrderResponse {
        "orders": string[];
        "productOrderId": string[];
        "message":string;
}

export interface OrderDetails {
    _id: string;
    orderById: string;
    orderBy: string;
    productOrderedId: string;
    productName: string;
    country: string;
    productDescription: string;
    productImage:string;
    orderDate: null,
    orderPrice: string;
    __v: number
}

export interface GetOrdersDetail {
data:OrderDetails[];
count:number;
message:string;
}

export interface GetOrderDetails{
    data:OrderDetails;
    message:string;
}

