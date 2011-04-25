class Survey
  include MongoMapper::Document

  key :title, String

  many :questions
end

