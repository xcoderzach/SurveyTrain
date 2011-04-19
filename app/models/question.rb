class Question
  include MongoMapper::EmbeddedDocument

<<<<<<< Updated upstream
  key :question_text, String
  key :response,      String
  key :type,          String
  key :options,       Array
=======
  key :question,    String
  key :type,        String
>>>>>>> Stashed changes
end
