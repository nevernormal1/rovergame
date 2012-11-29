class CreateLevels < ActiveRecord::Migration
  def up
    create_table :levels do |t|
      t.string :name
      t.integer :position
      t.timestamps
    end
  end

  def down
    drop_table :levels
  end
end
