import { useState, useEffect, useContext } from "react";
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

import { TokenContext } from "./providers/TokenProvider";

export function ProductsCard() {
  // const [csrfToken, setCsrfToken] = useState("");
  const [shopUrl, setShopUrl] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [debugCheckoutUrl, setDebugCheckoutUrl] = useState("");
  const [debugApiUrl, setDebugApiUrl] = useState("");
  const [backofficeUrl, setBackofficeUrl] = useState("");
  const [replicatedSiteUrl, setReplicatedSiteUrl] = useState("");
  const [referralCookieName, setReferralCookieName] = useState("");
  const [rcCookieName, setRcCookieName] = useState("");
  const [loginCookie, setLoginCookie] = useState("");
  const [referralParameter, setReferralParameter] = useState("");
  const [defaultWebalias, setDefaultWebalias] = useState("");
  const [enableEnrollerSearch, setEnableEnrollerSearch] = useState("");
  const [retailCustomerType, setRetailCustomerType] = useState("");

  const [shopifyAccessToken, setShopifyAccessToken] = useState("");

  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const productsCount = 5;

  const { csrfToken } = useContext(TokenContext);
  // console.log("csrfToken ", csrfToken);

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
  // const {
  //   data,
  //   refetch: refetchProductCount,
  //   isLoading: isLoadingCount,
  //   isRefetching: isRefetchingCount,
  // } = useAppQuery({
  //   url: "/api/products",
  //   reactQueryOptions: {
  //     onSuccess: () => {
  //       setIsLoading(false);
  //     },
  //   },
  // });

  const fields = [
    { label: "ShopUrl", value: shopUrl, setter: setShopUrl },
    { label: "ApiUrl", value: apiUrl, setter: setApiUrl },
    { label: "CheckoutUrl", value: checkoutUrl, setter: setCheckoutUrl },
    {
      label: "DebugCheckoutUrl",
      value: debugCheckoutUrl,
      setter: setDebugCheckoutUrl,
    },
    { label: "DebugApiUrl", value: debugApiUrl, setter: setDebugApiUrl },
    { label: "BackofficeUrl", value: backofficeUrl, setter: setBackofficeUrl },
    {
      label: "ReplicatedSiteUrl",
      value: replicatedSiteUrl,
      setter: setReplicatedSiteUrl,
    },
    {
      label: "ReferralCookieName",
      value: referralCookieName,
      setter: setReferralCookieName,
    },
    { label: "RcCookieName", value: rcCookieName, setter: setRcCookieName },
    { label: "LoginCookie", value: loginCookie, setter: setLoginCookie },
    {
      label: "ReferralParameter",
      value: referralParameter,
      setter: setReferralParameter,
    },
    {
      label: "DefaultWebalias",
      value: defaultWebalias,
      setter: setDefaultWebalias,
    },
    {
      label: "EnableEnrollerSearch",
      value: enableEnrollerSearch,
      setter: setEnableEnrollerSearch,
    },
    {
      label: "RetailCustomerType",
      value: retailCustomerType,
      setter: setRetailCustomerType,
    },
  ];

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    // const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
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

  // const scriptTag = document.querySelector(
  //   'script[data-serialized-id="server-data"]',
  // );
  // const jsonData = JSON.parse(scriptTag.textContent);
  // const csrfToken = jsonData.csrfToken;
  // Selecciona el script tag que contiene el JSON

  const handleSubmit = async (event) => {
    const response = await fetch("/api/organizations", {
      method: "POST",
      body: JSON.stringify({
        organization: {
          shop_url: shopUrl,
          api_url: apiUrl,
          checkout_url: checkoutUrl,
          debug_checkout_url: debugCheckoutUrl,
          debug_api_url: debugApiUrl,
          backoffice_url: backofficeUrl,
          replicated_site_url: replicatedSiteUrl,
          referral_cookie_name: referralCookieName,
          rc_cookie_name: rcCookieName,
          login_cookie: loginCookie,
          referral_parameter: referralParameter,
          default_webalias: defaultWebalias,
          enable_enroller_search: enableEnrollerSearch,
          retail_customer_type: retailCustomerType,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": csrfToken,
      },
    });

    // if (response.ok) {
    //   await refetchProductCount();
    //   setToastProps({
    //     content: "user created",
    //   });
    // } else {
    //   setIsLoading(false);
    //   setToastProps({
    //     content: "user not created",
    //     error: true,
    //   });
    // }
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
            {fields.map((field) => (
              <TextField
                key={field.label}
                label={field.label}
                value={field.value}
                onChange={(value) => field.setter(value)}
                autoComplete="off"
              />
            ))}
            <Button submit primary>
              Submit
            </Button>
          </form>
        </FormLayout>
      </Card>
    </>
  );
}
