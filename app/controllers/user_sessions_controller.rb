class UserSessionsController < ApplicationController
  layout 'login'

  def new
    @user_session = UserSession.new
  end

  def create
    @user_session = UserSession.new(params[:user_session])

    if @user_session.save
      redirect_back_or_default root_path
    else
      render :action => :new
    end
  end

  def destroy
    if current_user_session
      current_user_session.destroy
    end
    flash[:notice] = "See you next time!"
    redirect_to root_path
  end
end


