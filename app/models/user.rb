class User < ApplicationRecord
  after_create :notify_graphql_of_update
  after_update_commit :notify_graphql_of_update
  after_destroy_commit :notify_graphql_of_delete

  def graphql_event_name(action)
    "#{self.class.to_s.camelize(:lower)}#{action.camelize}"
  end

  def notify_graphql_of_update
    ChatAppSchema.subscriptions.trigger(graphql_event_name('updated'), { }, self)
  end

  def notify_graphql_of_delete
    ChatAppSchema.subscriptions.trigger(graphql_event_name('deleted'), { }, self.id)
  end
end
