Rails.application.routes.draw do
  root 'application#index'

  resources :posts

  get "/*path" => "application#index"

end
