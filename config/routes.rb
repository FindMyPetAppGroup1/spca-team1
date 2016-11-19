Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'home#index'
  resources :users, only: [:new, :create]
  resources :sessions, only: [:new, :create] do
    delete :destroy, on: :collection
  end
  get '/auth/facebook', as: :sign_in_facebook
  get '/auth/facebook/callback' => 'callbacks#facebook'

end
