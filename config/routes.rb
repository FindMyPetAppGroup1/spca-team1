Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'home#index'
  resources :users, only: [:new, :create] do
    resources :reports, only: [:show]
  end

  resources :sessions, only: [:new, :create] do
    delete :destroy, on: :collection
  end
  resources :reports do
    resources :messengers, only: [:create, :show]
    get :find_search
    get :rough_search
  end


  resources :messengers, only: [:create, :index, :show]

  get 'users/current_user_info' => 'users#current_user_info'
  get 'reports/user/lost' => 'reports#lost_reports'
  get 'reports/user/found' => 'reports#found_reports'
  get 'reports/case/linked' => 'reports#linked_reports'
  get '/auth/facebook', as: :sign_in_facebook
  get '/auth/facebook/callback' => 'callbacks#facebook'


end
