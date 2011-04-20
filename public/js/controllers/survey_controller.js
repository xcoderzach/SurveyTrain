var SurveyController = new Controller("/surveys", function(survey) {

  survey.post(function(params) {
    Survey.create(params["survey"], function(survey) {
      var surveyView = new SurveyView(survey)
    })
  })

  survey.get(function(params) {
    Survey.all(function(surveys) {
      var surveyView = new SurveyView(surveys)
    })
  }) 

  survey.get("/:id", function(params) {
    Survey.first(function(survey) {
      var surveyView = new SurveyView(survey)
    })
  }) 

})
