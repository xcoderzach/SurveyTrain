var SurveyController = function() {}

SurveyController.prototype.show = function() {
  Survey.first(function(err, survey) {
    var surveyView = new SurveyView(survey)
  })
}
