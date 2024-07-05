const CartSubtotal = () => {
  const [apiUrl, setApiUrl] = React.useState("");
  const [shopUrl, setShopUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [orderTotal, setOrderTotal] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://shopifyoola.azurewebsites.net/api/Checkout/FetchCart?cartToken=Z2NwLXVzLWVhc3QxOjAxSjFSNFJFNjlDRzFLR0NSUFkwVjNRNlMy&shopUrl=424543.myshopify.com&silentLoginToken=null&referral=corporphan&rc=corporphan",
      );
      const data = await response.json();

      setOrderTotal(data.cart.orderTotal);
    };

    fetchData();
  }, []);

  return (
    <div class="custom-card">
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

const reactComponent = document.getElementById("cart-subtotal-component");

ReactDOM.render(<CartSubtotal />, reactComponent);
