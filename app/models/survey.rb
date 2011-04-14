class Survey
  include MongoMapper::Document

  key :title, String
  key :participant_name, String
  key :template,    Boolean

  many :questions
end

