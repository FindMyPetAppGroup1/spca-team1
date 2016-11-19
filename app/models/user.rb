class User < ApplicationRecord
  # if you want to store a temporary value in an ActiveRecord object then you
  # can add an attr_accessor. This won't go to the database if there is no
  # matching column name in the database table.
  # attr_accessor :password, :password_confirmation

  # More info: http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html
  # has_secure_password will take the `password` given to the user object and
  # it will generate `password_digest`. So you must have `password_digest`
  # column in your users table.
  has_secure_password



  # Rails allows us to store Hashes and Arrays and other objects as TExt in the database
  # Rails will ad special meta data about the objects being stored which will make come back
  # in the same fashion when you retrieve it within Rails from the database
  # serialize :oauth_raw_data, Hash




  before_validation :downcase_email
  # before_create :generate_api_key

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates :first_name, presence: true
  validates :last_name, presence: true

  validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    format: VALID_EMAIL_REGEX #,
                    # unless: :from_oauth?

  def full_name
    "#{first_name} #{last_name}".strip.squeeze(' ').titleize
  end

  #
  # def from_oauth?
  #   provider.present? && uid.present?
  # end

  # def self.find_from_oauth(oauth_data)
  #   User.where(provider: oauth_data['provider'],
  #   uid: oauth_data['uid']).first
  # end
  #
  # def signed_in_with_twitter?
  #   uid.present? && provider == 'twitter'
  # end


  # def self.create_from_oauth(oauth_data)
  #
  #   full_name = oauth_data['info']['name'].split
  #   user = User.create first_name:    full_name[0],
  #                   last_name:   full_name[1],
  #                   email:   oauth_data['info']['email'],
  #                   password:    SecureRandom.hex(32),
  #                   provider:    oauth_data['provider'],
  #                   uid:   oauth_data['uid'],
  #                   oauth_token:   oauth_data['credentials']['token'],
  #                   oauth_secret:    oauth_data['credentials']['secret']
  #
  # end

  private

  def downcase_email
    self.email.downcase! if email.present?
  end

  def generate_api_key
    loop do
      self.api_key = SecureRandom.hex(32)
      break unless User.exists?(api_key: api_key)
    end
  end



end
