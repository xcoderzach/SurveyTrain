class Response
  include MongoMapper::Document

  key :survey_id, Mongo::ObjectID
  belongs_to :survey
  timestamps!
end
