module Types 
  class SubscriptionType < BaseObject
    field :user_updated, Types::UserType, null: false, description: "An user was added"
    field :user_deleted, ID, null: false
  end
end