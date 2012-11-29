class LevelsController < ApplicationController
  before_filter :show_welcome_page_if_not_logged_in, :only => :index

  def index
    respond_to do |format|
      format.json do
        render :json => {level: 'straight'}.to_json
      end
      format.html
    end
  end
end
