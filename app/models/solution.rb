class Solution < ActiveRecord::Base
  attr_accessible :level

  belongs_to :user
  belongs_to :level
end
