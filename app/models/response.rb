class Response
  include MongoMapper::Document

  key :survey_id, ObjectId
  belongs_to :survey
  timestamps!
end
