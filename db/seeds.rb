# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
%w(zigzagup straight rotate blocked zigzag).each_with_index do |name, index|
  Level.create(name: name, position: index + 1)
end

FactoryGirl.create(:user, {name: 'Default User', password: 'password', email: 'user@example.com'})

