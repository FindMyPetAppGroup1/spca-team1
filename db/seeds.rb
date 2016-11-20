# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
100.times do
 Report.create({
   name: Faker::Name.first_name,
   pet_type: %w(dog cat).sample,
   last_seen_date: Faker::Date.between(90.days.ago, Date.today),
   last_seen_address: Faker::Address.street_address,
   latitude: rand(49.2726202..49.2926202),
   longitude: rand(-123.1418923..-123.1218923),
   report_type: %w(lost sighted).sample
   })
end

puts Cowsay.say('Generated 100 reports','random')
