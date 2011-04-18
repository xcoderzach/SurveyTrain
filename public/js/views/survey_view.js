var SurveyView = function(data) {
  var question
    , i = 0

  data["survey_form"] = {
    "action": "/surveys.json"
  , "method": "POST"
  }

  for(question in data.questions) {
    data.questions[question]["question_input"] = { 
      "name": "survey[questions][" + i + "][response]" 
    }
    i++
  }
  console.log(data)
  this.view = new LiveView($("#survey"), data)
}
