# frozen_string_literal: true
class Api::OrganizationsController < ApplicationController
  def create
    Organization.create(organization_params)

    render(json: { success: true, error: nil })
  end

  def show
    organization = Organization.find(params[:id])

    render json: organization
  end

  private

  def organization_params
    params.require(:organization).permit(:shop_url, :api_url, :checkout_url,
                                         :debug_checkout_url, :debug_api_url,
                                         :backoffice_url, :replicated_site_url,
                                         :referral_cookie_name, :rc_cookie_name,
                                         :login_cookie, :referral_parameter,
                                         :default_webalias, :enable_enroller_search,
                                         :retail_customer_type)
  end
end
