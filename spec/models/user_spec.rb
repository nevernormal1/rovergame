require 'spec_helper'

describe User do
  describe "#current_level" do
    before(:each) do
      @first_level = FactoryGirl.create(:level)
    end

    context "when the user has no solutions" do
      it "returns the first level" do
        User.new.current_level.should == @first_level
      end
    end
  end
end

