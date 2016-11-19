class AddOauthFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :uid, :string
    add_column :users, :provider, :string
    add_column :users, :oauth_token, :string
    add_column :users, :oauth_secret, :string
    add_column :users, :oauth_raw_data_text, :string
    add_column :users, :avatar, :string
    add_index :users, [:uid, :provider]
  end
end
