module Builders
  class BuildResult
    attr_reader :success, :object, :error_message

    def initialize(success, object, error_message=nil)
      @success, @object, @error_message = success, object, error_message
    end

    def self.success(object)
      self.new(true, object)
    end

    def self.fail(object, error_message=nil)
      self.new(false, object, error_message)
    end
  end
end

