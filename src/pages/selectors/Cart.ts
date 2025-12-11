export const cartSelectors = {
    getCartItems: '.items',
    getCheckoutButton: '.subtotal button',
    getContinueShoppingButton: 'button[routerlink="/dashboard"]',
    getMyCart_hdr:'.heading h1',
    cartSubTotalPrice: 'xpath=(//li[@class="totalRow"] /span[@class="value"])[1]',
    cartTotalPrice: 'xpath=(//li[@class="totalRow"] /span[@class="value"])[2]',
}