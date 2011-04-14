class Question
  include MongoMapper::EmbeddedDocument

  key :template,    Boolean
  key :question,    String
  key :response,    String
  key :type,        String
  key :options,     Array
end
