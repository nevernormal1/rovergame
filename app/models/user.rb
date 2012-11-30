class User < ActiveRecord::Base
  has_many :solutions

  acts_as_authentic do |c|
    c.require_password_confirmation = false
  end

  def current_level
    Level.first
  end
end
