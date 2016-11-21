class ReportsMailer < ApplicationMailer
  def notify_pet_owner(user)
      @user = user
      @report = @user.reports.first
      if @user && @user.email
        mail(to: @user.email, subject:'You got an new report')
      end
    end
end
