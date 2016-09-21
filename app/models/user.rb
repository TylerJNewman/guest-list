class User < ApplicationRecord
  validates :name, presence: true
  validates :contact, presence: true
end
