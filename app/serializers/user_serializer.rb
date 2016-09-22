class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :contact, :created_at
end
