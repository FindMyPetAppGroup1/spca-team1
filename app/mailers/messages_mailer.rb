class MessagesMailer < ApplicationMailer
  def notify_reporter(report)
      @report = report
      @user = report.user
      if @user && @user.email
        mail(to: @user.email, subject:'Report')
      end
    end
end
