class User < ActiveRecord::Base
  has_many :solutions
  has_many :solved_levels, :through => :solutions, :source => :level

  acts_as_authentic do |c|
    c.require_password_confirmation = false
  end

  def current_level
    if solved_levels.any?
      Level.where("id NOT IN (?)", solved_levels).order(:position).first
    else
      Level.first
    end
  end
end
