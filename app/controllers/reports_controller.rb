class ReportsController < ApplicationController
  before_action :find_report, only: [:edit, :update, :show, :destroy]
  before_action :authenticate_user, except: [:index, :show]

  def new
    @report = Report.new
  end

  def create
    byebug
    report_params
    @report = Report.new(report_params)
    @report.user = current_user
    @report.save

    render json: { report: @report}
  end


  def show
    # find_report gets called here
    @report = Report.find(params[:id])

      render json: { report: @report}

  end

  def lost_reports
    user = current_user
    @reports = user.reports.where(report_type: 'Lost')
    render json: { reports: @reports}
  end

  def found_reports
    user = current_user
    @reports = user.reports.where(report_type: 'Found')
    render json: { reports: @reports}
  end

  def linked_reports
    # p params[:case_id]
    # @reports = Report.where(case_id: nil)
    @reports = Report.where(case_id: params[:case_id])
    render json: { reports: @reports}
  end
  def index
    # We are not making a index action on reports, because this would
    # render a list of all reports in the database.
    # Reports are associatied with users, so we will be making a custom
    # action on the user controller to find all reports associated with that user.

    # This index is for displaying 'List view' of all reports (in a certain area)
    @reports = Report.order(created_at: :DESC)


    render json: { reports: @reports}

  end

  def edit
    # find_report action getting called
  end

  def update
    # find report is called
    if @report.update report_params
      redirect_to report_path(@report)
    else
      render :edit
    end
  end

  def destroy
    @report.destroy
    redirect_to reports_path
  end

  #this is a custom action, it will be used to enable searching for reports in the immediate area
  def find_search
    typetar = params[]
    reports = Report.join(:report).where("report.type in (?) AND last_seen_date IN (?)",typetar,datetar)
    render json: reports.to_json
  end

  def rough_search(typetar, datetar)
   reports = Report.join(:report).where("report.type in (?) OR last_seen_date IN (?)",typetar,datetar)
  end

  def create_report_with_new_case_id
    # @report = Report.new
    # @report = report.case_id
  end

  def create_report_with_current_case_id
    # @report = Report.new
    # @report = report.current_case_id
    # current_case_id must be a method in ApplicationController
  end

  private

  def report_params
    params.require(:report).permit([:name,
                                    :breed,
                                    :pet_type,
                                    :age,
                                    :color,
                                    :sex,
                                    :photo1,
                                    :photo2,
                                    :photo3,
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
