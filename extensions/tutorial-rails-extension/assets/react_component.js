const UserList = () => {
  const [apiUrl, setApiUrl] = React.useState("");
  const [shopUrl, setShopUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const fetchCredentials = async () => {
    try {
      const response = await fetch(
        "http://localhost:58386/api/organizations/2",
      );
      const data = await response.json();
      // setUsers(data);
      // console.log(data);
      // setLoading(false);
      setApiUrl(data.api_url);
      setShopUrl(data.shop_url);
    } catch (error) {
      console.error("Error fetching users:", error);
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
      // setUsers(data);
      console.log(data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={fetchCredentials}>Fetch Credentials</button>
      <button onClick={fetchCart}>Fetch Cart</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ReactDOM.render(<UserList />, document.getElementById("react-component"));
