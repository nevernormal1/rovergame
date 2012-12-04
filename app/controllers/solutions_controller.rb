class SolutionsController < ApplicationController
  before_filter :require_user

  def create
    level = Level.where(:position => params[:position]).first
    solution = current_user.solutions.build(:level => level)
    solution.save!
    respond_to do |format|
      format.json do
        render :json => solution.to_json(:only => :id)
      end
    end
  end
end

