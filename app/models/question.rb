class Question
  include MongoMapper::EmbeddedDocument

  key :question,    String
  key :type,        String
  key :next
  key :survey_id, ObjectId
  belongs_to :survey
end
