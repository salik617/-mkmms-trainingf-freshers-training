class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.text :address
      t.date :dob
      t.string :gender

      t.timestamps
    end
  end
end
