class SurveysController < ApplicationController
  respond_to :json, :html

  def index
    respond_with @surveys = Survey.all
  end

  def show
    respond_with @survey = Survey.where(:id => params[:id])
  end 

  def new
    respond_with @survey = Survey.new
  end 
 
  def create
    respond_with @survey = Survey.create(params[:survey])
  end 

  def edit
    respond_with @survey = Survey.where(:id => params[:id])
  end 

  def update
    respond_with @survey = Survey.update(params[:id], params[:survey])
  end 

  def delete
    respond_with @survey = Survey.destroy(:id => params[:id])
  end 
end 
