import { APIRequestContext, expect } from "@playwright/test";
import { LoginResponse } from "@src/interfaces/apiInterfaces";

export async function login(apiContext:APIRequestContext):Promise<string>{

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: {
            userEmail: process.env.EMAIL,
            userPassword: process.env.PASSWORD
        }
    })

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseBody:LoginResponse = await loginResponse.json();
    if (!loginResponseBody.token) {
        throw new Error("Login failed, token not received");
    }
    return loginResponseBody.token;
    }