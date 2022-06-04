module Mutations
  class CreateUser < BaseMutation
    null true
    argument :first_name, String
    argument :last_name, String
    argument :email, String

    field :user, Types::UserType

    def resolve(first_name:, last_name:, email:)
      user = User.create(
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