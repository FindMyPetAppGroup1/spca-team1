class HomeController < ApplicationController

  def index
    # this will render views/home/index.html.erb and it will use
    # views/layouts/application.html.erb
    @markers = Report.markers_near(49.2827291, -123.12073750000002, 1)
  end
end
