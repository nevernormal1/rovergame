class LevelsController < ApplicationController
  before_filter :show_welcome_page_if_not_logged_in, :only => :index

  def index

  end

end
