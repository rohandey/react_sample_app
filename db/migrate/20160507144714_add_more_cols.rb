class AddMoreCols < ActiveRecord::Migration
  def change
    add_column :posts, :news, :boolean, default: false
    add_column :posts, :country, :string
  end
end
