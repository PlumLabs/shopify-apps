// const { ReactDOM, Polaris, Card, ResourceList, Stack, TextStyle } = window; // Acceso a Polaris desde el objeto global
// const { Polaris, TextStyle } = window.Shopify;
// console.log("window.Shopify ", window.Shopify);

const UserList = ({ products }) => {
  const [apiUrl, setApiUrl] = React.useState("");
  const [shopUrl, setShopUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [cartProducts, setCartProducts] = React.useState({});

  const fetchCredentials = async () => {
    try {
      const response = await fetch(
        "http://localhost:63276/api/organizations/2",
      );
      const data = await response.json();
      setApiUrl(data.api_url);
      setShopUrl(data.shop_url);
    } catch (error) {
      console.error("Error fetching Credentials:", error);
    }
  };

  const fetchCart = async () => {
    try {
      // const response = await fetch(
      //   "https://shopifyoola.azurewebsites.net/api/Checkout/FetchCart?cartToken=Z2NwLXVzLWVhc3QxOjAxSjA0OTdER0NDUkcwN0FZQU1XMjRBQjFF&shopUrl=424543.myshopify.com&silentLoginToken=null&referral=asdfas&rc=corporphan",
      // );
      const cartToken = "Z2NwLXVzLWVhc3QxOjAxSjA0OTdER0NDUkcwN0FZQU1XMjRBQjFF";
      const response = await fetch(
        `${apiUrl}/api/Checkout/FetchCart?cartToken=${cartToken}&shopUrl=${shopUrl}&silentLoginToken=null&referral=asdfas&rc=corporphan`,
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching Cart:", error);
    }
  };

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     if (products.length) {
  //       fetchCredentials();

  //       const updatedProducts = await Promise.all(
  //         products.map(async (product) => {
  //           const sku = product.variants[0].sku;
  //           if (sku) {
  //             try {
  //               const response = await fetch(
  //                 `https://shopifyoola.azurewebsites.net/api/context/getProductPrice?pricetype=1_usd&sku=${sku}&shopUrl=424543.myshopify.com`,
  //               );

  //               const data = await response.json();
  //               const newPrice = data.price;

  //               return { ...product, price: newPrice };
  //             } catch (error) {
  //               console.error("Error fetching product price:", error);
  //               return product; // Return original product if there's an error
  //             }
  //           } else {
  //             return product; // Return original product if SKU is missing
  //           }
  //         }),
  //       );

  //       setLoading(false);
  //       setCartProducts(updatedProducts);
  //     }
  //   };

  //   fetchData();
  // }, []);

  console.log("window ", window);

  return (
    <div>
      <h2>User List</h2>
      <button class="Polaris-Button" onClick={fetchCredentials}>
        Fetch Credentials
      </button>
      <button onClick={fetchCart}>Fetch Cart</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cartProducts.length &&
            cartProducts.map((product) => (
              <li key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Precio: {product.price}</p>
              </li>
            ))}
        </ul>
      )}

      <div class="Polaris-Page">
        <div class="Polaris-Page__Header">
          <h1 class="Polaris-DisplayText">Mi Aplicación con Polaris</h1>
        </div>
        <div class="Polaris-Page__Content">
          <div class="Polaris-Card">
            <div class="Polaris-Card__Header">
              <h2 class="Polaris-Heading">Mi Tarjeta</h2>
            </div>
            <div class="Polaris-Card__Section">
              <p class="Polaris-TextStyle--variationSubdued">
                Aquí va el contenido de la tarjeta.
              </p>
            </div>
            <div class="Polaris-Card__Section">
              <button class="Polaris-Button Polaris-Button--primary">
                Aceptar
              </button>
              <button class="Polaris-Button">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const reactComponent = document.getElementById("react-component");
const productsJson = reactComponent.getAttribute("data-products");
const products = JSON.parse(productsJson.replace(/'/g, '"'));

ReactDOM.render(<UserList products={products} />, reactComponent);
