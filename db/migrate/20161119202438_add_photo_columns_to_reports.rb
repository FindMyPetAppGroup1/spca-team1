class AddPhotoColumnsToReports < ActiveRecord::Migration[5.0]
  def change
    remove_column :reports, :photo
    add_column :reports, :photo1, :string
    add_column :reports, :photo2, :string
    add_column :reports, :photo3, :string
  end
end
