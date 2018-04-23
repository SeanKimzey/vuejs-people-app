class PeopleController < ApplicationController
  def index
    people = Person.all
    render json: people.as_json
  end

  def create
    person = Person.new(
      name: params[:inputName],
      bio: params[:inputBio]
    )
    if person.save
      render json: person.as_json
    else
      render json: {errors: person.errors.full_messages}, status: :bad_request
    end
  end
end
