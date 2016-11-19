class ReportsController < ApplicationController
  before_action :find_report, only: [:edit, :update, :show, :destroy]
  before_action :authenticate_user, except: [:index, :show]

  def new
    @report = Report.new
  end

  def create
    @report = Report.new report_params
    @report.user = current_user
    if @report.save
      redirect_to @report
    else
      render :new
    end
  end

  def show
    # find_report gets called here
  end

  def index
    # We are not making a index action on reports, because this would
    # render a list of all reports in the database.
    # Reports are associatied with users, so we will be making a custom
    # action on the user controller to find all reports associated with that user.

    # This index is for displaying 'List view' of all reports (in a certain area)
    @reports = Report.order(created_at: :DESC)
  end

  def edit
    # find_report action getting called
  end

  

  private

  def report_params
    params.require(:report).permit([:name,
                                    :breed,
                                    :pet_type,
                                    :age,
                                    :color,
                                    :sex,
                                    :photo,
                                    :last_seen_date,
                                    :last_seen_address,
                                    :latitude,
                                    :longitude,
                                    :note,
                                    :report_type])
  end

  def find_report
    @report = Report.find params[:id]
  end
end
