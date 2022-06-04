module Mutations
  class DeleteUser < BaseMutation
    null true
    argument :id, ID

    field :id, ID

    def resolve(id:)
      user = User.find(id)

      user.destroy

      {
        id: id
      }
    end
  end
end