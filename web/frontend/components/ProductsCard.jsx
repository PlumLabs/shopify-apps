import { useState, useEffect, useContext } from 'react';
import { Card, Text, FormLayout, TextField, Button } from '@shopify/polaris';
import { Toast } from '@shopify/app-bridge-react';
import { useTranslation } from 'react-i18next';
import { useAppQuery, useAuthenticatedFetch } from '../hooks';

import { TokenContext } from './providers/TokenProvider';

export function ProductsCard() {
  const [shopUrl, setShopUrl] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [debugCheckoutUrl, setDebugCheckoutUrl] = useState('');
  const [debugApiUrl, setDebugApiUrl] = useState('');
  const [backofficeUrl, setBackofficeUrl] = useState('');
  const [replicatedSiteUrl, setReplicatedSiteUrl] = useState('');
  const [referralCookieName, setReferralCookieName] = useState('');
  const [rcCookieName, setRcCookieName] = useState('');
  const [loginCookie, setLoginCookie] = useState('');
  const [referralParameter, setReferralParameter] = useState('');
  const [defaultWebalias, setDefaultWebalias] = useState('');
  const [enableEnrollerSearch, setEnableEnrollerSearch] = useState('');
  const [retailCustomerType, setRetailCustomerType] = useState('');

  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const productsCount = 5;

  const { csrfToken } = useContext(TokenContext);

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: '/api/products/count',
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
    { label: 'ShopUrl', value: shopUrl, setter: setShopUrl },
    { label: 'ApiUrl', value: apiUrl, setter: setApiUrl },
    { label: 'CheckoutUrl', value: checkoutUrl, setter: setCheckoutUrl },
    {
      label: 'DebugCheckoutUrl',
      value: debugCheckoutUrl,
      setter: setDebugCheckoutUrl,
    },
    { label: 'DebugApiUrl', value: debugApiUrl, setter: setDebugApiUrl },
    { label: 'BackofficeUrl', value: backofficeUrl, setter: setBackofficeUrl },
    {
      label: 'ReplicatedSiteUrl',
      value: replicatedSiteUrl,
      setter: setReplicatedSiteUrl,
    },
    {
      label: 'ReferralCookieName',
      value: referralCookieName,
      setter: setReferralCookieName,
    },
    { label: 'RcCookieName', value: rcCookieName, setter: setRcCookieName },
    { label: 'LoginCookie', value: loginCookie, setter: setLoginCookie },
    {
      label: 'ReferralParameter',
      value: referralParameter,
      setter: setReferralParameter,
    },
    {
      label: 'DefaultWebalias',
      value: defaultWebalias,
      setter: setDefaultWebalias,
    },
    {
      label: 'EnableEnrollerSearch',
      value: enableEnrollerSearch,
      setter: setEnableEnrollerSearch,
    },
    {
      label: 'RetailCustomerType',
      value: retailCustomerType,
      setter: setRetailCustomerType,
    },
  ];

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch('/api/products', { method: 'POST' });

    if (response.ok) {
      await refetchProductCount();
      setToastProps({
        content: t('ProductsCard.productsCreatedToast', {
          count: productsCount,
        }),
      });
    } else {
      setIsLoading(false);
      setToastProps({
        content: t('ProductsCard.errorCreatingProductsToast'),
        error: true,
      });
    }
  };

  const handleSubmit = async (event) => {
    const response = await fetch('/api/organizations', {
      method: 'POST',
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
        'Content-Type': 'application/json',
        'X-Csrf-Token': csrfToken,
      },
    });
  };

  return (
    <>
      {toastMarkup}
      <Card
        title={t('ProductsCard.title')}
        sectioned
        primaryFooterAction={{
          // content: t("ProductsCard.populateProductsButton", {
          //   count: productsCount,
          // }),
          // onAction: handlePopulate,
          content: 'Submit Credentials',
          onAction: handleSubmit,
          loading: isLoading,
        }}
      >
        <FormLayout>
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <TextField
                key={field.label}
                label={field.label}
                value={field.value}
                onChange={(value) => field.setter(value)}
                autoComplete='off'
              />
            ))}
          </form>
        </FormLayout>
      </Card>
    </>
  );
}
