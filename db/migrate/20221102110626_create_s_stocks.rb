class CreateSStocks < ActiveRecord::Migration[7.0]
  def change
    create_table :s_stocks do |t|
      t.datetime :date
      t.float :open
      t.float :high
      t.float :low
      t.float :close

      t.timestamps
    end
  end
end
