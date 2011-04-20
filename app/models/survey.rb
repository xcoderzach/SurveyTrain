class Survey
  include MongoMapper::Document

  key :title, String
  key :participant_name, String

  many :questions
  many :surveys
end

