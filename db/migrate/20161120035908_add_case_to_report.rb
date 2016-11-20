class AddCaseToReport < ActiveRecord::Migration[5.0]
  def change
    add_reference :reports, :case, foreign_key: true
  end
end
