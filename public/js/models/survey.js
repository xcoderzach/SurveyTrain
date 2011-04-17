var Survey = function() {}

Survey.prototype.first = function(callback) {
  $.get("/surveys.json", function(data) {
    callback(data[0])
  })
}
