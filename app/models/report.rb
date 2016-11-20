class Report < ApplicationRecord
  geocoded_by :last_seen_address
  belongs_to :user
  has_many :messages, dependent: :destroy

  validates :name, presence: true
  validates :pet_type, presence: true
  validates :last_seen_date, presence: true
  validates :last_seen_address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :report_type, presence: true

  after_validation :geocode

  mount_uploader :photo1, ImageUploader
  mount_uploader :photo2, ImageUploader
  mount_uploader :photo3, ImageUploader


  def user_full_name
    if user
      user.first_name + ' ' + user.last_name
    else
      'Anonymous'
    end
  end

  def self.markers_near(lat, long, radius)
    reports = Report.near([lat, long], radius)
    result = Gmaps4rails.build_markers(reports) do |rep, marker|
      marker.lat rep.latitude
      marker.lng rep.longitude
    end
    result
  end

end
