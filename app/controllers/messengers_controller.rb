class MessengersController < ApplicationController

  def create
    @report           = Report.find params[:report_id]
    messenger_params  = params.require(:messenger).permit(:body, :photo1)
    @messenger        = Messenger.new messenger_params
    @messenger.report = @report
    @messenger.user   = current_user
    @messenger.photo1 = @report.photo1
    if @messenger.save
      redirect_to report_path(@report), notice: 'Message created!'
    else
      render 'reports/show'
    end
  end

  def show
    
  end

  def destroy
    @messenger = Messenger.find params[:id]
    report = @messenger.report
  if @messenger.destroy
   redirect_to report notice:"Message deleted"
  else
   redirect_to root_path, alert: "access denied"
  end
end
