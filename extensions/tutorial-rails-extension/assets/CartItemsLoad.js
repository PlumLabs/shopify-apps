const CartItemsLoad = ({ items, cartToken, api_url, shop_url }) => {
  const [apiUrl, setApiUrl] = React.useState("");
  const [shopUrl, setShopUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [cartProducts, setCartProducts] = React.useState([]);
  const [orderTotal, setOrderTotal] = React.useState("");

  React.useEffect(() => {
    setApiUrl(api_url);
    setShopUrl(shop_url);
  }, [apiUrl, shopUrl]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (items.length) {
        const updatedItems = await Promise.all(
          items.map(async (product) => {
            return setCartPrice(product);
          }),
        );
        setLoading(false);

        setCartProducts(updatedItems);
      }
    };

    fetchData();
  }, []);

  const setCartPrice = async (item, priceType = "1_usd") => {
    const sku = item.sku;
    const quantity = item.quantity;

    if (sku) {
      try {
        const response = await fetch(
          `${apiUrl}/api/context/calculateCartItem?pricetype=1_usd&sku=${sku}&quantity=${quantity}&shopUrl=${shopUrl}`,
        );

        const data = await response.json();
        const newPrice = data.price;

        return { ...item, price: newPrice };
      } catch (error) {
        console.error("Error fetching product price:", error);
        return item; // Return original product if there's an error
      }
    } else {
      return item; // Return original product if SKU is missing
    }
  };

  const increaseQuantity = async (item) => {
    const updatedItems = await Promise.all(
      cartProducts.map(async (product) => {
        if (product.id == item.id) {
          const sku = item.sku;
          const quantity = item.quantity + 1;

          const response = await fetch(
            `${apiUrl}/api/context/calculateCartItem?pricetype=1_usd&sku=${sku}&quantity=${quantity}&shopUrl=${shopUrl}`,
          );

          const data = await response.json();
          const newPrice = data.finalPrice;

          return { ...item, price: newPrice, quantity: quantity };
        } else {
          return product;
        }
      }),
    );

    setCartProducts(updatedItems);
  };

  const decreaseQuantity = async (item) => {
    const updatedItems = await Promise.all(
      cartProducts.map(async (product) => {
        if (product.id == item.id) {
          console.log("item ", item);
          console.log("product ", product);
          const sku = item.sku;
          const quantity = item.quantity - 1;

          const response = await fetch(
            `${apiUrl}/api/context/calculateCartItem?pricetype=1_usd&sku=${sku}&quantity=${quantity}&shopUrl=${shopUrl}`,
          );

          const data = await response.json();
          const newPrice = data.finalPrice;

          return { ...item, price: newPrice, quantity: quantity };
        } else {
          return product;
        }
      }),
    );

    setCartProducts(updatedItems);
  };

  return (
    <div class="custom-card">
      <div class="Polaris-Card">
        <div class="Polaris-Card__Header">
          <h2 class="Polaris-Heading">Mi Carrito</h2>
        </div>
        <div class="Polaris-Card__Section">
          <table class="cart-items">
            <thead>
              <tr>
                <th class="caption-with-letter-spacing" colspan="2" scope="col">
                  Product
                </th>
                <th
                  class="medium-hide large-up-hide right caption-with-letter-spacing"
                  colspan="1"
                  scope="col"
                >
                  Total
                </th>
                <th
                  class="cart-items__heading--wide small-hide caption-with-letter-spacing"
                  colspan="1"
                  scope="col"
                >
                  Quantity
                </th>
                <th
                  class="small-hide right caption-with-letter-spacing"
                  colspan="1"
                  scope="col"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cartProducts &&
                cartProducts.map((item) => (
                  <tr class="cart-item">
                    <td class="product-image">
                      <img src={item.image} alt="Product Image" height="100" />
                    </td>
                    <td>
                      <div class="cart-item__name h4 break">
                        {item.product_title}
                      </div>
                      <div class="product-option">${item.price}</div>
                    </td>

                    <td class="cart-item__quantity">
                      <div class="cart-item__quantity-wrapper">
                        <label class="visually-hidden" for="Quantity-1">
                          Quantity
                        </label>
                        <quantity-input class="quantity cart-quantity">
                          <button
                            class="quantity__button no-js-hidden disabled"
                            name="minus"
                            type="button"
                            onClick={() => {
                              decreaseQuantity(item);
                            }}
                          >
                            <span class="visually-hidden">
                              Decrease quantity for The Collection Snowboard:
                              Liquid
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              focusable="false"
                              class="icon icon-minus"
                              fill="none"
                              viewBox="0 0 10 2"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                          <input
                            class="quantity__input"
                            data-quantity-variant-id="45555561169120"
                            type="number"
                            name="updates[]"
                            value={item.quantity}
                            data-cart-quantity="1"
                            min="1"
                            step="1"
                            aria-label="Quantity for The Collection Snowboard: Liquid"
                            id="Quantity-1"
                            data-index="1"
                          />
                          <button
                            class="quantity__button no-js-hidden"
                            name="plus"
                            type="button"
                            onClick={() => {
                              increaseQuantity(item);
                            }}
                          >
                            <span class="visually-hidden">
                              Increase quantity for The Collection Snowboard:
                              Liquid
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              focusable="false"
                              class="icon icon-plus"
                              fill="none"
                              viewBox="0 0 10 10"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                        </quantity-input>

                        <cart-remove-button id="Remove-1" data-index="1">
                          <a
                            href="/cart/change?id=45555561169120:a5a4a443b8b601294a9c52016bf4e8dc&amp;quantity=0"
                            class="button button--tertiary"
                            aria-label="Remove The Collection Snowboard: Liquid"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                              focusable="false"
                              class="icon icon-remove"
                            >
                              <path
                                d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </a>
                        </cart-remove-button>
                      </div>
                      <div
                        class="cart-item__error"
                        id="Line-item-error-1"
                        role="alert"
                      >
                        <small class="cart-item__error-text"></small>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          class="icon icon-error"
                          viewBox="0 0 13 13"
                        >
                          <circle
                            cx="6.5"
                            cy="6.50049"
                            r="5.5"
                            stroke="white"
                            stroke-width="2"
                          ></circle>
                          <circle
                            cx="6.5"
                            cy="6.5"
                            r="5.5"
                            fill="#EB001B"
                            stroke="#EB001B"
                            stroke-width="0.7"
                          ></circle>
                          <path
                            d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                            fill="white"
                          ></path>
                          <path
                            d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                            fill="white"
                            stroke="#EB001B"
                            stroke-width="0.7"
                          ></path>
                        </svg>
                      </div>
                    </td>

                    <td>
                      <div class="product-option">${item.price}</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div class="Polaris-Card">
        <div class="Polaris-Card__Section">
          <div class="Polaris-Stack Polaris-Stack--distributionTrailing">
            <div class="Polaris-Stack__Item custom-subtotal">
              Subtotal: ${orderTotal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const reactComponent = document.getElementById("cart-items-component");
const itemsJson = reactComponent.getAttribute("data-items");
const items = JSON.parse(itemsJson.replace(/'/g, '"'));

const cartTokenJson = reactComponent.getAttribute("data-cart-token");
const cartToken = JSON.parse(cartTokenJson.replace(/'/g, '"'));

const reactCredentialsComponent = document.getElementById(
  "backend-credentials",
);
const api_url = reactCredentialsComponent.getAttribute("data-api-url");
const shop_url = reactCredentialsComponent.getAttribute("data-shop-url");

ReactDOM.render(
  <CartItemsLoad
    items={items}
    cartToken={cartToken}
    api_url={api_url}
    shop_url={shop_url}
  />,
  reactComponent,
);
