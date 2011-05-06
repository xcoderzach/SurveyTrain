if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

var SurveyManager = function () {
	function nextPointer(sm, q_id, response) {
		var next = sm.questions[q_id].next
		if (typeof(next) !== "object") {
			return next
		} else if (next) {
			return next[response]
		} else {
      return undefined
    }
	}

	var proto = {
		serializeResponse: function () {
			return {
				_id: this.id,
				survey_id: this.survey.id,
				responses: this.responses,
				done: this.done,
				pointer: this.pointer
			}
		},
		getTitle: function () {
			return this.survey.title
		},
		getCurrentQuestion: function () {
			if (this.pointer === undefined) {
				return undefined
			}
			var q = this.questions[this.pointer]
			return {
				text: q.text,
				type: q.type,
        options: q.options ? q.options.concat([]) : undefined
			}
		},
		getResponses: function () {
			var res = []
			var i
			for (i = 0; i < this.getNumResponses(); i++) {
				res.push(this.getResponseIdx(i))
			}
			return res
		},
		getResponseIdx: function (idx) {
			var res = this.responses[idx]
			var q = this.questions[this.responses[idx].q_id]
			return {
				text: q.text,
				type: q.type,
				options: q.options ? q.options.concat([]) : undefined,
				response: res.response
			}
		},
		getNumResponses: function () {
			return this.responses.length
		},
		pushResponse: function (response) {
			if (this.pointer === undefined) {
				return
			}
			this.responses.push({q_id: this.pointer, response: response})
			this.pointer = nextPointer(this, this.pointer, response)
		},
		modifyResponse: function (num, response) {
			if (this.done) {
				return
			}
			var currentNext
			if (num+1 === this.responses.length) {
				currentNext = this.pointer
			} else {
				currentNext = this.responses[num+1].q_id
			}
			var computedNext = nextPointer(this, this.responses[num].q_id,
										   response)
			this.responses[num].response = response
			if (currentNext !== computedNext) {
				this.responses = this.responses.slice(0, num+1)
				this.pointer = computedNext
			}
		},
		finalize: function () {
			if (this.pointer === undefined) {
				this.done = true
				return true
			} else {
				return false
			}
		}
	}
	
	function ctor(survey, responses) {
		var res = Object.create(proto)
		var questions = {}
		var i
		res.survey = survey
		res.id = responses.id
		res.done = responses.done
		res.responses = responses.responses
		
		for (i = 0; i < survey.questions.length; i++) {
			questions[survey.questions[i].id] = survey.questions[i]
		}
		res.questions = questions
		res.pointer = responses.pointer || survey.first_question

		return res
	}
	
	return ctor
}()
