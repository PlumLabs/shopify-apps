// import { createApp } from "@shopify/app-bridge";
// import { getSessionToken } from "@shopify/app-bridge-utils";

const { createApp } = window["app-bridge"];
const { getSessionToken } = window["app-bridge"].utilities;
const { authenticatedFetch } = window["app-bridge"].utilities;
// const { getSessionToken } = window["app-bridge-utils"];

const { Axios } = window["axios"];

console.log("window ", window);

// const app = createApp({
//   apiKey: "a350c3ccda1170dc5bdafce9bd8065d5",
//   shopOrigin: "quickstart-24eb93de.myshopify.com",
// });

// console.log("window ", window);

// Obtén el token de sesión
// getSessionToken(app).then((token) => {
//   fetch("/api/users", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       response.json();
//       console.log("response ", response);
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// });

const UserList = () => {
  const [users, setUsers] = React.useState([]);
  const [mytoken, setMytoken] = React.useState("");
  const [shopifyAccessToken, setShopifyAccessToken] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const app = createApp({
    apiKey: "a350c3ccda1170dc5bdafce9bd8065d5",
    // shopOrigin: "quickstart-24eb93de.myshopify.com",
    // hostOrigin: "quickstart-24eb93de.myshopify.com",
  });

  // getSessionToken(app).then((token) => {
  //   console.log(token)
  // });

  React.useEffect(() => {
    const obtenerToken = async () => {
      try {
        const fetchFunction = authenticatedFetch(app);
        const uri = "http://localhost:58611/api/users";

        const response = await fetchFunction(uri);

        console.log("response ", response);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };
    obtenerToken();
  }, []);

  return (
    <div>
      <h2>User List</h2>
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
