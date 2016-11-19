class CreateReports < ActiveRecord::Migration[5.0]
  def change
    create_table :reports do |t|
      t.string :name
      t.string :pet_type
      t.string :breed
      t.string :age
      t.string :color
      t.string :sex
      t.string :photo
      t.string :last_seen_date
      t.string :last_seen_address
      t.float :latitude
      t.float :longitude
      t.text :note
      t.string :report_type
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
