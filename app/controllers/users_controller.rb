class UsersController < ApplicationController
  layout 'login'

  def new
    @user = User.new
  end

  def create
    result = Builders::UserBuilder.new(params[:user]).build
    if result.success
      redirect_to root_path
    else
      @user = result.object
      render :action => :new
    end
  end
end

