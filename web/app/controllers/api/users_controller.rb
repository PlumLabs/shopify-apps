class Api::UsersController < AuthenticatedController
  # protect_from_forgery with: :exception

  def index
    @users = User.all

    puts "*"*50
    puts "*"*50
    puts @users.count
    puts "*"*50
    puts "*"*50
    render json: @users
  end

  def create
    User.create(user_params)

    render(json: { success: true, error: nil })
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end