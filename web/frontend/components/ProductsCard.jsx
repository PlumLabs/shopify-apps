import { useState, useEffect } from "react";
import {
  Card,
  TextContainer,
  Text,
  FormLayout,
  TextField,
  Button,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

import axios from "axios";
import createApp from "@shopify/app-bridge";
import { getSessionToken } from "@shopify/app-bridge/utilities";

export function ProductsCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopifyAccessToken, setShopifyAccessToken] = useState("");

  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const productsCount = 5;

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  // useEffect(() => {
  //   // Actualiza el título del documento usando la API del navegador
  //   setShopifyAccessToken;

  //   const params = {
  //     client_id: "a350c3ccda1170dc5bdafce9bd8065d5",
  //     client_secret: "e6fdbe2374d1db545f9daecc87b1bb5a",
  //     code: "authorization_code_from_shopify",
  //   };

  //   const shop = "quickstart-24eb93de.myshopify.com  ";

  //   axios
  //     .post(`https://${shop}/admin/oauth/access_token`, params)
  //     .then((response) => {
  //       const accessToken = response.data.access_token;
  //       // Guarda este token para futuras solicitudes
  //       console.log("Access Token:", accessToken);
  //       setShopifyAccessToken(accessToken);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching access token:", error);
  //     });
  // }, [shopifyAccessToken]);

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const response = await fetch("/api/products", { method: "POST" });

    if (response.ok) {
      await refetchProductCount();
      setToastProps({
        content: t("ProductsCard.productsCreatedToast", {
          count: productsCount,
        }),
      });
    } else {
      setIsLoading(false);
      setToastProps({
        content: t("ProductsCard.errorCreatingProductsToast"),
        error: true,
      });
    }
  };

  // const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  // console.log("csrfToken ", csrfToken);
  // axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

  const handleSubmit = async (event) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ user: { name, email } }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
        "X-Shopify-Access-Token": shopifyAccessToken,
      },
    });

    if (response.ok) {
      await refetchProductCount();
      setToastProps({
        content: "user created",
      });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "user not created",
        error: true,
      });
    }
  };

  return (
    <>
      {toastMarkup}
      <Card
        title={t("ProductsCard.title")}
        sectioned
        primaryFooterAction={{
          content: t("ProductsCard.populateProductsButton", {
            count: productsCount,
          }),
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <p>{t("ProductsCard.description")}</p>
          <Text as="h4" variant="headingMd">
            {t("ProductsCard.totalProductsHeading")}
            <Text variant="bodyMd" as="p" fontWeight="semibold">
              {isLoadingCount ? "-" : data.count}
            </Text>
          </Text>
        </TextContainer>

        <FormLayout>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(value) => setName(value)}
              autoComplete="off"
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(value) => setEmail(value)}
              autoComplete="off"
            />
            <Button submit primary>
              Submit
            </Button>
          </form>
        </FormLayout>
      </Card>
    </>
  );
}
