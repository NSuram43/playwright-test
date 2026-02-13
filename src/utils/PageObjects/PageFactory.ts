import { LoginPage } from "./LoginPage";
import { Dashboard } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { OrderPage } from "./OrderPage";
import { OrderConfirmationPage } from "./OrderConfirmation";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { OrderDetailsPage } from "./OrderDetailsPage";
import { Page } from "@playwright/test";

export class PageFactory {
  constructor(private page: Page) {}

  getLoginPage(): LoginPage {
    return new LoginPage(this.page);
  }
  getDashboardPage(): Dashboard {
    return new Dashboard(this.page);
  }
  getCartPage(): CartPage {
    return new CartPage(this.page);
  }
  getOrderPage(): OrderPage {
    return new OrderPage(this.page);
  }
  getOrderConfirmationPage(): OrderConfirmationPage {
    return new OrderConfirmationPage(this.page);
  }
  getOrderHistoryPage(): OrderHistoryPage {
    return new OrderHistoryPage(this.page);
  }
  getOrderDetailsPage(): OrderDetailsPage {
    return new OrderDetailsPage(this.page);
  }
}
