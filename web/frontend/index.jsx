import App from "./App";
import { createRoot } from "react-dom/client";
import { initI18n } from "./utils/i18nUtils";

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  const root = createRoot(document.getElementById("app"));

  // String HTML recibido
  const htmlString = document.getElementById("app").getAttribute("content");

  // Crear un nuevo objeto DOMParser
  const parser = new DOMParser();

  // Parsear el string HTML a un objeto DOM
  const htmlDoc = parser.parseFromString(htmlString, "text/html");

  // Obtener las etiquetas <meta>
  const metaTags = htmlDoc.querySelectorAll("meta");

  // Crear un objeto para almacenar los pares clave-valor del contenido
  const contentMap = {};

  // Iterar sobre las etiquetas <meta> y almacenar el contenido
  metaTags.forEach((tag) => {
    const name = tag.getAttribute("name");
    const content = tag.getAttribute("content");
    if (name && content) {
      contentMap[name] = content;
    }
  });

  // Obtener el valor del csrf-token
  const csrfToken = contentMap["csrf-token"];
  console.log("CSRF Token:", csrfToken);

  root.render(<App csrfToken={csrfToken} />);
});
