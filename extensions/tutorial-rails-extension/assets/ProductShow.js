const ProductShow = ({ product }) => {
  const [apiUrl, setApiUrl] = React.useState("");
  const [shopUrl, setShopUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [currentProduct, setCurrentProduct] = React.useState({});

  React.useEffect(() => {
    setApiUrl(api_url);
    setShopUrl(shop_url);

    const fetchData = async () => {
      const sku = product.variants[0].sku;
      if (sku) {
        try {
          const response = await fetch(
            `${apiUrl}/api/context/getProductPrice?pricetype=1_usd&sku=${sku}&shopUrl=${shopUrl}`,
          );

          const data = await response.json();
          const newPrice = data.price;

          setCurrentProduct({ ...product, price: newPrice });
        } catch (error) {
          console.error("Error fetching product price:", error);
          setCurrentProduct(product); // Return original product if there's an error
        }
      } else {
        setCurrentProduct(product); // Return original product if SKU is missing
      }
      setLoading(false);
    };

    if (apiUrl !== "" && shopUrl !== "") {
      fetchData();
    }
  }, [apiUrl, shopUrl]);

  return (
    <div class="product product--large product--left product--stacked product--mobile-hide grid grid--1-col grid--2-col-tablet">
      <div class="grid__item product__media-wrapper">
        <img
          src={currentProduct.featured_image}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      <div class="product__info-wrapper grid__item">
        <h1 class="product__text inline-richtext">{currentProduct.title}</h1>
        <p class="product-price">${currentProduct.price}</p>
        <div class="product-form__buttons">
          <button class="product-form__submit button button--full-width button--secondary">
            <span>Add to cart</span>
          </button>
          <button class="shopify-payment-button__button shopify-payment-button__button--unbranded BUz42FHpSPncCPJ4Pr_f jjzYeefyWpPZLH9pIgyw RWJ0IfBjxIhflh4AIrUw">
            <span>Buy it now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const reactComponent = document.getElementById("product-show-component");
const productJson = reactComponent.getAttribute("data-product");
const parsedProduct = JSON.parse(productJson.replace(/'/g, '"'));

const reactCredentialsComponent = document.getElementById(
  "backend-credentials",
);
const api_url = reactCredentialsComponent.getAttribute("data-api-url");
const shop_url = reactCredentialsComponent.getAttribute("data-shop-url");

ReactDOM.render(
  <ProductShow api_url={api_url} shop_url={shop_url} product={parsedProduct} />,
  reactComponent,
);
