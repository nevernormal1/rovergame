module Builders
  class UserBuilder
    def initialize(params)
      @params = params
    end

    def build
      user = User.new
      user.email = params[:email]
      user.password = params[:password]
      user.name = params[:name]

      if user.save
        BuildResult.success(user)
      else
        BuildResult.fail(user)
      end
    end

    private
    def params
      @params
    end
  end
end

