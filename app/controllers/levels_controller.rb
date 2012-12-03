class LevelsController < ApplicationController
  before_filter :show_welcome_page_if_not_logged_in, :only => :index
  before_filter :require_user

  def index
    respond_to do |format|
      format.json do
        render :json => current_user.current_level.to_json(:only => [:name, :position])
      end
      format.html
    end
  end
end
