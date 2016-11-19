class Report < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy

  validates :name, presence: true
  validates :pet_type, presence: true
  validates :last_seen_date, presence: true
  validates :last_seen_address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :report_type, presence: true

  def user_full_name
    if user
      user.first_name + ' ' + user.last_name
    else
      'Anonyomous'
    end
  end

end
