class CreateOrganization < ActiveRecord::Migration[7.0]
  def change
    create_table :organizations do |t|
      t.string :shop_url
      t.string :api_url
      t.string :checkout_url
      t.string :debug_checkout_url
      t.string :debug_api_url
      t.string :backoffice_url
      t.string :replicated_site_url
      t.string :referral_cookie_name
      t.string :rc_cookie_name
      t.string :login_cookie
      t.string :referral_parameter
      t.string :default_webalias
      t.string :enable_enroller_search
      t.string :retail_customer_type
      
      t.timestamps
    end
  end
end
