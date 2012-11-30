FactoryGirl.define do
  factory :level do
    sequence :name do |n|
      "Level #{n}"
    end

    sequence :position do |n|
      n
    end
  end
end

