const ProductCollection = ({ products }) => {
  const [apiUrl, setApiUrl] = React.useState("");
  const [shopUrl, setShopUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [cartProducts, setCartProducts] = React.useState([]);

  const fetchCredentials = async () => {
    try {
      const response = await fetch(
        "http://localhost:51970/api/organizations/2",
      );
      const data = await response.json();
      setApiUrl(data.api_url);
      setShopUrl(data.shop_url);
    } catch (error) {
      console.error("Error fetching Credentials:", error);
    }
  };

  function groupInThrees(collection) {
    return collection.reduce((acc, curr, index) => {
      if (index % 3 === 0) {
        acc.push(collection.slice(index, index + 3));
      }
      return acc;
    }, []);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      if (products.length) {
        // fetchCredentials();

        const updatedProducts = await Promise.all(
          products.map(async (product) => {
            const sku = product.variants[0].sku;
            if (sku) {
              try {
                const response = await fetch(
                  `https://shopifyoola.azurewebsites.net/api/context/getProductPrice?pricetype=1_usd&sku=${sku}&shopUrl=424543.myshopify.com`,
                );

                const data = await response.json();
                const newPrice = data.price;

                return { ...product, price: newPrice };
              } catch (error) {
                console.error("Error fetching product price:", error);
                return product; // Return original product if there's an error
              }
            } else {
              return product; // Return original product if SKU is missing
            }
          }),
        );

        setLoading(false);

        setCartProducts(groupInThrees(updatedProducts));
      }
    };

    fetchData();
  }, []);

  const ProductSlider = () => {
    console.log("cartProducts ", cartProducts);
    return (
      <div class="Polaris-Page Polaris-Page--fullWidth">
        <div class="Polaris-Page__Content">
          <div class="Polaris-LegacyCard">
            <div class="Polaris-LegacyCard__Section Polaris-LegacyCard__FirstSectionPadding Polaris-LegacyCard__LastSectionPadding">
              {cartProducts &&
                cartProducts.slice(0, 2).map((groupedProducts) => (
                  <div
                    class="Polaris-Grid"
                    style={{
                      "--pc-grid-columns-xs": 1,
                      "--pc-grid-columns-sm": 4,
                      "--pc-grid-columns-md": 4,
                      "--pc-grid-columns-lg": 6,
                      "--pc-grid-columns-xl": 6,
                      "--pc-grid-areas-xs": "'product0' 'product1' 'product2'",
                      "--pc-grid-areas-sm":
                        "'product0 product0 product0 product0' 'product1 product1 product2 product2'",
                      "--pc-grid-areas-md":
                        "'product1 product0 product0 product2'",
                      "--pc-grid-areas-lg":
                        "'product0 product0 product1 product1 product2 product2'",
                      "--pc-grid-areas-xl":
                        "'product0 product0 product1 product1 product2 product2'",
                    }}
                  >
                    {groupedProducts.map((product, index) => (
                      <div
                        class="Polaris-Grid-Cell"
                        style={{ gridArea: `product${index}` }}
                      >
                        <div
                          style={{
                            height: "auto",
                            width: "auto",
                          }}
                        >
                          <img
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              display: "block",
                            }}
                            src={`https:${product.featured_image}`}
                          />

                          <div class="product-card__info product-card__info--center">
                            <div class="v-stack gap-0.5 w-full justify-items-center">
                              <span class="product-card__title">
                                <a
                                  href="/products/trs?ref=asdfas"
                                  class="bold"
                                  data-instant=""
                                >
                                  <div class="Polaris-LegacyStack__Item">
                                    <h5 class="Polaris-Text--root Polaris-Text--headingLg">{`${product.title}`}</h5>
                                  </div>
                                </a>
                              </span>

                              <div
                                class="ProductMeta__PriceList Heading price-container"
                                data-sku="811"
                                data-pricetype="1_usd"
                              >
                                <div class="price-label">One time purchase</div>
                                <span class="ProductItem__Price Price this exigo-product-price-811">
                                  {`$${product.price}`}
                                </span>
                                <div class="price-label">
                                  Subscribe and Save
                                </div>
                                <span
                                  class="ProductMeta__Price Price  Text--subdued u-h4 preferred-product-price-811"
                                  style={{ color: "#d86b59" }}
                                >
                                  {`$${product.price}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{loading ? <p>Loading...</p> : ProductSlider()}</div>;
};

const reactComponent = document.getElementById("product-collection-component");
const productsJson = reactComponent.getAttribute("data-products");
const products = JSON.parse(productsJson.replace(/'/g, '"'));

ReactDOM.render(<ProductCollection products={products} />, reactComponent);
