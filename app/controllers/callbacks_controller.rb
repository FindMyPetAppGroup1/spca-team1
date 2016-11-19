class CallbacksController < ApplicationController
  def facebook
    # STEP 1: search for a user with the given provider/uid
    oauth_data = request.env['omniauth.auth']

    user = User.where(provider: oauth_data['provider'],
                           uid: oauth_data['uid']).first

    # STEP 2: Create the user if the user is not found.
    if user.nil?
      fullname = oauth_data['info']['name'].split
      user = User.create first_name: fullname[0],
                       last_name: fullname[1],
                           email: oauth_data['info']['email'],
                        password: SecureRandom.hex(32),
                          avatar: oauth_data['info']['image'],
                        provider: oauth_data['provider'],
                             uid: oauth_data['uid'],
                     oauth_token: oauth_data['credentials']['token'],
                    oauth_secret: oauth_data['credentials']['secret'],
                  oauth_raw_data: oauth_data
    end

    # Step 3: Sign in the user.
    session[:user_id] = user.id
    redirect_to root_path, notice: 'Thanks for signing in with Facebook!'
    # render json: request.env['omniauth.auth']
  end
end
