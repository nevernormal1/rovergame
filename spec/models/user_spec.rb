require 'spec_helper'

describe User do
  describe "#current_level" do
    before(:each) do
      @first_level = FactoryGirl.create(:level)
      @second_level = FactoryGirl.create(:level)
      @third_level = FactoryGirl.create(:level)
      @user = User.new
    end

    context "when the user has no solutions" do
      it "returns the first level" do
        @user.current_level.should == @first_level
      end
    end

    context "when the user has solved the first level" do
      it "returns the second level" do
        @user.solved_levels << @first_level
        @user.current_level.should == @second_level
      end
    end

    context "when the user has solved the first 2 levels" do
      it "returns the third level" do
        @user.solved_levels << @first_level
        @user.solved_levels << @second_level
        @user.current_level.should == @third_level
      end
    end

    context "when the user has solved all levels" do
      it "returns nil" do
        @user.solved_levels << @first_level
        @user.solved_levels << @second_level
        @user.solved_levels << @third_level
        @user.current_level.should be_nil
      end
    end
  end
end

