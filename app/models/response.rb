class Response
  include MongoMapper::Document

  key  :title,            String
  key  :participant_name, String

  one  :survey
  many :questions
end
  
