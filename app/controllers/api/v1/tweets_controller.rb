class Api::V1::TweetsController < ApplicationController
  def index
    @tweets = Tweet.includes(:user).page(params[:page]).per(5).order("created_at DESC")
  end

  def show
    @comments = Tweet.find(params[:id]).comments
  end
end
