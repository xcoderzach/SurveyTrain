class Survey
  include MongoMapper::Document

  key :title, String
  key :participant_name, String

  key :first_question_id, ObjectId
  many :questions
end

