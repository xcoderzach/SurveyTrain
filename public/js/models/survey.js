var Survey = function() {}

Survey.first = function(callback) {
  $.get("/surveys.json", function(data) {
    callback(data[0])
  })
}

Survey.all = function(callback) {
  $.get("/surveys.json", function(data) {
    callback(data)
  })
} 
