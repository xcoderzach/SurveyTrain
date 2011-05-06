class ResponsesController < ApplicationController
  respond_to :json
 
  def create
    respond_with @response = Response.create(params[:response])
  end 

  def update
    respond_with @response = Response.update(params[:id], params[:response])
  end  

  def show
    puts params[:id]
    respond_with @response = Response.find(params[:id])
  end  

end
