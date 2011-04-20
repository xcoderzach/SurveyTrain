class Question
  include MongoMapper::EmbeddedDocument

  key :question,    String
  key :type,        String
end
