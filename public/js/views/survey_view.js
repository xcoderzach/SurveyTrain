var SurveyView = function(data, response) {
  var question
    , options
    , i = 0
    , that = this

  var manager = new SurveyManager(data, response)

    data["survey_id"] = { "name": "response[survey_id]", "value": data.id }
    data["survey_form"] = {
      "action": "/responses.json"
    , "method": "POST"
    }
  data.questions = manager.getResponses()

  console.log(data.questions)

  function mapQuestion(question) {
    question["question_id"] = { 
      "name": "response[answers][" + i + "][question_id]" 
    , "value": question.id
    }
    question["question_text"] = question["text"]

    question["index"] = {value: i}
    delete question["text"]
    if(question.type == "text") {
      question["respon"] = { 
        "name": "response[answers][" + i + "][response]" 
      , "value": question.response
      }
    }
    if(question.type === "radio") {
      question["respon"] = { 
        "name": "response[answers][" + i + "][response]"  
      }
      console.log(question.options)
      for(index in question.options) {
        var val = question.options[index] 
        console.log(val)
        question.options[index] = {
          "value": val
        , "respon": { "value": val }
        }
      }
    }
    i++
    return question
  }

  $("#survey input").not(":last").live("change", function() {
    var index = $(".index", this).val()
    manager.modifyResponse(index, $("input", this).val())
  })

  $("#survey button").click(function() {
    var questions = $(".question:last")
      , val
      , inputs = $("input[type!=hidden]", questions)
    if(inputs.length > 1) {
      val = inputs.filter(":checked").val()
    } else {
      console.log("b")
      val = inputs.val()
    }
    manager.pushResponse(val)

    that.view.questions.removeAll()

    manager.getResponses().forEach(function(question) {
      that.view.questions.append(mapQuestion(question))
      if(question.type === "radio") {
        $(".question:last input[value=" + question.response + "]").attr("checked", true)
      }
    })
    if(manager.getCurrentQuestion() !== undefined) {
      that.view.questions.append(mapQuestion(manager.getCurrentQuestion()))
    }
  })

  this.view = new LiveView($("#survey"), data)
  this.view.questions.append(mapQuestion(manager.getCurrentQuestion()))
}
