class CreateMessengers < ActiveRecord::Migration[5.0]
  def change
    create_table :messengers do |t|
      t.text :body
      t.string :photo1
      t.references :report, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
