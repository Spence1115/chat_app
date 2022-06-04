module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :edit_user, mutation: Mutations::EditUser
    field :delete_user, mutation: Mutations::DeleteUser
  end
end
