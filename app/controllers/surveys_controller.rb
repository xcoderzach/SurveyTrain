class SurveysController < ApplicationController
  respond_to :json, :html

  def index
    respond_with @surveys = Survey.all
  end

  def show
    respond_with @survey = Survey.where(:id => params[:id])
  end 

  def create
    respond_with @survey = Survey.create(params[:survey])
  end 

  def update
    respond_with @survey = Survey.update(params[:id], params[:survey])
  end 
end 
