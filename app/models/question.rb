class Question
  include MongoMapper::EmbeddedDocument

  key :question,    String
  key :response,    String
  key :type,        String
  key :options,     Array
end
