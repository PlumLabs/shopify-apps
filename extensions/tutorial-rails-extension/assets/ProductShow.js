const ProductShow = ({ product }) => {
  const [apiUrl, setApiUrl] = React.useState("");
  const [shopUrl, setShopUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  return <div>Product Show</div>;
};

const reactComponent = document.getElementById("react-component");

ReactDOM.render(<ProductShow />, reactComponent);