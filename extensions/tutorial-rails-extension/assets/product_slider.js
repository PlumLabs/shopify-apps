const ProductSlider = ({ product }) => {
  return (
    <div class="Polaris-Page Polaris-Page--fullWidth">
      <div class="Polaris-Page__Content">
        <div class="Polaris-LegacyCard">
          <div class="Polaris-LegacyCard__Section Polaris-LegacyCard__FirstSectionPadding Polaris-LegacyCard__LastSectionPadding">
            <div
              class="Polaris-Grid"
              style={{
                "--pc-grid-columns-xs": 1,
                "--pc-grid-columns-sm": 4,
                "--pc-grid-columns-md": 4,
                "--pc-grid-columns-lg": 6,
                "--pc-grid-columns-xl": 6,
                "--pc-grid-areas-xs": "'product' 'sales' 'orders'",
                "--pc-grid-areas-sm":
                  "'product product product product' 'sales sales orders orders'",
                "--pc-grid-areas-md": "'sales product product orders'",
                "--pc-grid-areas-lg":
                  "'product product sales sales orders orders'",
                "--pc-grid-areas-xl":
                  "'product product sales sales orders orders'",
              }}
            >
              <div class="Polaris-Grid-Cell" style={{ gridArea: "product" }}>
                <div
                  style={{
                    background: "var(--p-color-text-info)",
                    height: "auto",
                    width: "auto",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    src="https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651"
                  />
                </div>
              </div>
              <div class="Polaris-Grid-Cell" style={{ gridArea: "sales" }}>
                <div
                  style={{
                    background: "var(--p-color-text-info)",
                    height: "60px",
                    width: "auto",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    src="https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651"
                  />
                </div>
              </div>
              <div class="Polaris-Grid-Cell" style={{ gridArea: "orders" }}>
                <div
                  style={{
                    background: "var(--p-color-text-info)",
                    height: "60px",
                    width: "auto",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    src="https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?v=1614559651"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
