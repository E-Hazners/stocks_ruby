class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  validates :date, presence: true
  validates :open, presence: true
end
