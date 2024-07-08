const ProductShow = ({ product }) => {
  const [apiUrl, setApiUrl] = React.useState("");
  const [shopUrl, setShopUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setApiUrl(api_url);
    setShopUrl(shop_url);
  }, [apiUrl, shopUrl]);

  return <div>Product Show</div>;
};

const reactComponent = document.getElementById("product-show-component");

const reactCredentialsComponent = document.getElementById(
  "backend-credentials",
);
const api_url = reactCredentialsComponent.getAttribute("data-api-url");
const shop_url = reactCredentialsComponent.getAttribute("data-shop-url");

ReactDOM.render(
  <ProductShow api_url={api_url} shop_url={shop_url} />,
  reactComponent,
);
