// Context.js

import React, { createContext, useState } from "react";

// Crea el contexto
const TokenContext = createContext();

// Proveedor del contexto
const TokenProvider = ({ children, csrfToken }) => {
  const [mycsrfToken, setMycsrfToken] = useState("");

  return (
    <TokenContext.Provider value={{ csrfToken, setMycsrfToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
