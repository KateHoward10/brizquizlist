class QuizzesController < ApplicationController
  before_action :search_quizzes, only: [:index, :map]
  before_action :set_quiz, only: [:show, :edit, :update, :destroy, :toggle_favorite]
  before_action :authenticate_user!, except: [:index, :map, :show]
  before_action :require_same_user!, only: [:update, :edit, :destroy]

  def index
  end

  def map
  end

  def my_quizzes
    @quizzes = current_user.try(:admin?) ? Quiz.all.sort_by { |q| q.venue.gsub("The ", "").upcase } : current_user.quizzes
  end

  def calendar
    @events = current_user.events.where("date >= ?", Date.today).sort_by { |e| e.date }
  end

  def show
    @events = @quiz.events.where("date >= ?", Date.today).sort_by { |e| e.date }
  end

  def new
    @quiz = Quiz.new
  end

  def edit
  end

  def create
    @quiz = Quiz.new(quiz_params)
    @quiz.user = current_user
    @quiz.hue = helpers.getRandomHue(@quiz.day)

    respond_to do |format|
      if @quiz.save
        format.html { redirect_to @quiz, notice: "Your quiz has been created! You can also add dates for upcoming quizzes by clicking on 'Events'" }
        format.json { render :show, status: :created, location: @quiz }
      else
        format.html { render :new }
        format.json { render json: @quiz.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @quiz.hue = helpers.getRandomHue(quiz_params[:day]) unless helpers.hueMatches(quiz_params[:day], @quiz.hue)
    respond_to do |format|
      if @quiz.update(quiz_params)
        format.html { redirect_to @quiz, notice: 'Quiz was successfully updated.' }
        format.json { render :show, status: :ok, location: @quiz }
      else
        format.html { render :edit }
        format.json { render json: @quiz.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @quiz.destroy
    respond_to do |format|
      format.html { redirect_to quizzes_url, notice: 'Quiz was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  def toggle_favorite
    current_user.favorited?(@quiz) ? current_user.unfavorite(@quiz) : current_user.favorite(@quiz)
  end

  private
    def search_quizzes
      @query = params[:q]
      @search = Quiz.ransack(@query)
      if @query && @query[:sorts].present?
        location = get_coords(@query[:sorts])
        @quizzes = @search.result.sort_by { |q| get_distance(q.latitude, q.longitude, location) }
      else
        @quizzes = @search.result.sort_by { |q| q.venue.gsub("The ", "").upcase }
      end
      @filters = @query ? @query.select { |key, value| key != "sorts" && value != "" } : {}
    end

    def get_coords(postcode)
      Geokit::Geocoders::GoogleGeocoder.api_key = ENV['GOOGLE_MAPS']
      Geokit::Geocoders::GoogleGeocoder.geocode(postcode, :bias => 'uk').ll
    end

    def get_distance(lat, lng, location)
      current_location = Geokit::LatLng.new(lat, lng)
      current_location.distance_to(location)
    end

    def set_quiz
      @quiz = Quiz.find_by!(slug: params[:slug])
    end

    def require_same_user!
      if !current_user.try(:admin?) && current_user != @quiz.user
        redirect_to @quiz
        flash[:alert] = "You can only edit or delete your own quizzes."
      end
    end
  
    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.require(:quiz).permit(:venue, :day, :frequency, :time, :price, :prize, :status, :link, :postcode, :latitude, :longitude, :address, :user_id)
    end
end
