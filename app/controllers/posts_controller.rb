class PostsController < ApplicationController

  def index
    @posts = Post.all
    render json: @posts
  end

  def create
    @post = Post.new(permit_params)
    @post.save
    render json: @post
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def update
    @post = Post.find(params[:id])
    @post.update_attributes(permit_params)
    render json: @post
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: @post
  end

  private

  def permit_params
    params.require(:post).permit(:title, :body, :news, :country)
  end

end
