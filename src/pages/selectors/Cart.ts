export const cartSelectors = {
    getCartItems: '.items',
    getCheckoutButton: '.subtotal button',
    getContinueShoppingButton: 'button[routerlink="/dashboard"]',
    getMyCart_hdr:'.heading h1',
    cartTotalPrice: 'li.totalRow .label:has-text("Total") + .value',
}