var Response = function() {}

Response.first = function(id, callback) {
  $.get("/responses/" + id + ".json", function(data) {
    callback(data)
  })
}

