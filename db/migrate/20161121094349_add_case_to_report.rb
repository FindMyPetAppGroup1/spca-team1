class AddCaseToReport < ActiveRecord::Migration[5.0]
  def change
    add_column :reports, :related_id, :string
  end
end
