class ResponsesController < ApplicationController
  respond_to :json
 
  def create
    respond_with @response = Response.create(params[:response])
  end 
 
end
