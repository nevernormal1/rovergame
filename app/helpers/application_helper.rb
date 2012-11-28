module ApplicationHelper
  def error_class(f, attribute)
    'error' unless f.error_message_on(attribute).blank?
  end

  def inline_error_message(f, attribute)
    if f.error_message_on :email
      content_tag :span, :class => 'help-inline' do
        f.error_message_on attribute
      end
    end
  end
end
