# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
Level.create(name: 'straight', position: 1)
Level.create(name: 'rotate', position: 2)
Level.create(name: 'zigzag', position: 3)

FactoryGirl.create(:user, {name: 'Default User', password: 'password', email: 'user@example.com'})

