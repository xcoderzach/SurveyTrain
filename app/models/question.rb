class Question
  include MongoMapper::EmbeddedDocument

  key :question_text, String
  key :response,      String
  key :type,          String
  key :options,       Array
end
