var SurveyModel = function() {
}

SurveyModel.all = function(callback) {
  $.get("/surveys.json", function(data) {
    callback(data)
  })
}

SurveyModel.first = function(id, callback) {
  $.get("/surveys/" + id + ".json", function(data) {
    callback(data)
  })
}

SurveyModel.create = function(id, callback) {
  $.post("/surveys/" + id + ".json", function(data) {
    callback(data)
  })
}
