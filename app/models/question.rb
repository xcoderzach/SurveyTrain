class Question
  include MongoMapper::Document

  key :question,    String
  key :type,        String

  key :survey_id, ObjectId
  belongs_to :survey
end
