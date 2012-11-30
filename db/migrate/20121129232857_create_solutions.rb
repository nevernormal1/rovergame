class CreateSolutions < ActiveRecord::Migration
  def change
    create_table :solutions do |t|
      t.integer :user_id
      t.integer :level_id

      t.timestamps
    end

    add_index :solutions, :user_id
    add_index :solutions, :level_id
  end
end
