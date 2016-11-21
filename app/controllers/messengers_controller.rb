class MessengersController < ApplicationController

  def create
    @report           = Report.find params[:report_id]
    messenger_params  = params.require(:messenger).permit(:body)
    @messenger        = Messenger.new messenger_params
    @messenger.report = @report
    @messenger.user   = current_user
    @messenger.photo1 = @report.photo1
    if @messenger.save
      render json: {messenger: @messenger}
    else
      render 'reports/show'
    end
  end

  def index
      render json: { messenger: current_user.messengers}
  end



  def show
    @messenger = Messenger.find(params[:id])
    render json: { messenger: @messenger}
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
end
