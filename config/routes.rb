Rails.application.routes.draw do
  root "stocks#index"


  get "/stocks", to: "stocks#index"
end
