module Mutations
  class EditUser < BaseMutation
    null true
    argument :id, ID
    argument :first_name, String
    argument :last_name, String
    argument :email, String

    field :user, Types::UserType

    def resolve(id:, first_name:, last_name:, email:)
      user = User.find(id)

      user.update(
        first_name: first_name,
        last_name: last_name,
        email: email
      )

      {
        user: user
      }
    end
  end
end