class ChangeOauthRawDataColumnInUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :oauth_raw_data_text
    add_column :users, :oauth_raw_data, :text
  end
end
