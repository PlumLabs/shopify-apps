Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:60214",
            "http://127.0.0.1:60214",
            "https://quickstart-24eb93de.myshopify.com",
            /\Ahttps:\/\/deploy-preview-\d{1,4}--yourwebsite\.domain\.app\z/

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      max_age: 86400
  end
end