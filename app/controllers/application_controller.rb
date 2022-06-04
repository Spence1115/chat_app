class ApplicationController < ActionController::Base
  # Skip authenticity tokens for test purpose
  skip_before_action :verify_authenticity_token
  
  # => Define your current_user method <=
  def current_user
    # Devise/Custom logic for retrieving the current user
    # /!\ Here we stub it to the first user in database /!\
    User.first
  end
end