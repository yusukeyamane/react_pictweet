Rails.application.routes.draw do
  devise_for :users
  root to: "tweets#index"
  namespace :api, format: 'json' do
    namespace :v1  do
      resources :tweets do
        resources :comments
      end
    end
  end
  resources :tweets, only: [:index, :show, :new, :create, :destroy, :edit, :update] do
  resources :comments, only: [:create]
  end
  resources :users, only: [:show]
end
