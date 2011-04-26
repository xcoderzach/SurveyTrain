var SurveyView = function(data) {
  var question
    , options
    , i = 0
                      
  data["survey_id"] = { "name": "response[survey_id]", "value": data.id }
  data["survey_form"] = {
    "action": "/responses.json"
  , "method": "POST"
  }

  for(question in data.questions) {
    question = data.questions[question]
    question["question_id"] = { 
      "name": "response[answers][" + i + "][question_id]" 
    , "value": question.id
    }
    question["response"] = { 
      "name": "response[answers][" + i + "][response]" 
    }
    if(question.type === "radio") {
      for(index in question.options) {
        question.options[index] = {
          "value": question.options[index]
        , "response": { "value": index }
        }
      }
    }
    i++
  }
  this.view = new LiveView($("#survey"), data)
}
