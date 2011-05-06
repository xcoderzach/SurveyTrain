SurveyTest = TestCase('SurveyTest')

var sampleSurvey, sampleResponse

function regenerate() {
sampleSurvey = {
	_id: 5,
	title: 'Sample survey',
	questions: [{_id: 0,
				 text: 'What is your name?',
				 type: 'text',
				 next: 1},
				{_id: 1,
				 text: 'Where do you live?',
				 type: 'text', next: 2},
				{_id: 2,
				 text: 'What century do you think it is?',
				 type: 'radio',
				 options: ['18th', '19th', '20th', '21st', '22nd'],
				 next: {'18th': 3, '19th': 4, '20th': 5, '21st': 6, '22nd': 7}},
				{_id: 3,
				 text: 'What about \'em British?',
				 type: 'text',
				 next: 8},
				{_id: 4,
				 text: 'How do you feel about the injustice caused by the railroads?',
				 type: 'text',
				 next: 8},
				{_id: 5,
				 text: 'What will become of the USSR?',
				 type: 'text',
				 next: 8},
				{_id: 6,
				 text: 'What do you think of George Bush Jr.?',
				 type: 'text',
				 next: 8},
        {_id: 6,
				 text: 'What do you think of George Bush Jr.?',
				 type: 'text',
				 next: 8}, 
				{_id: 7,
				 text: 'How would you describe the 21st century?',
				 type: 'text',
				 next: 8},
				{_id: 8,
				 text: 'Any other comments?',
				 type: 'text',
				 next: undefined}],
	first_question: 0}

sampleResponse = {
	_id: 1337,
	done: false,
	responses: [],
	survey_id: 5
}
}

SurveyTest.prototype.testPointer = function () {
	regenerate()
	var sm = SurveyManager(sampleSurvey, sampleResponse)
	assertEquals(0, sm.pointer)
	assertEquals({text: 'What is your name?', type: 'text', options: undefined},
				 sm.getCurrentQuestion())
	sm.pushResponse('Brian')
	assertEquals(1, sm.pointer)
	sm.pushResponse('Morris')
	assertEquals(2, sm.pointer)
	sm.modifyResponse(0, 'Zach')
	assertEquals(2, sm.pointer)
	sm.pushResponse('21st')
	assertEquals(6, sm.pointer)
	sm.pushResponse('Terrible president')
	assertEquals(8, sm.pointer)
	sm.modifyResponse(2, '19th')
	assertEquals(4, sm.pointer)
	sm.pushResponse('The world is a terrible place...')
	sm.pushResponse('This was fun')
	assertEquals(undefined, sm.pointer)
}

SurveyTest.prototype.testResponses = function () {
	regenerate()
	var sm = SurveyManager(sampleSurvey, sampleResponse)
	assertEquals([], sm.getResponses())
	assertEquals(0, sm.getNumResponses())
	
	sm.pushResponse('Brian')
	sm.pushResponse('Morris')
	sm.pushResponse('21st')
	assertEquals(3, sm.getNumResponses())
	var res = [{text: 'What is your name?', type: 'text', options: undefined, response: 'Brian'},
			   {text: 'Where do you live?', type: 'text', options: undefined, response: 'Morris'},
			   {text: 'What century do you think it is?', type: 'radio', options: ['18th', '19th', '20th', '21st', '22nd'],
				response: '21st'}]
	assertEquals(res, sm.getResponses())
	assertEquals(res[2], sm.getResponseIdx(2))

	sm.pushResponse('Monkey.')
	assertEquals(4, sm.getNumResponses())
	
	sm.modifyResponse(2, '18th')
	assertEquals(3, sm.getNumResponses())

	sm.modifyResponse(0, 'Carrie')
	assertEquals(3, sm.getNumResponses())
}

SurveyTest.prototype.testFinalizeSerialize = function () {
	regenerate()
	var sm = SurveyManager(sampleSurvey, sampleResponse)

	assertEquals(false, sm.finalize())

	sm.pushResponse('Brian')
	assertEquals(false, sm.finalize())

	sm.pushResponse('Morris')
	assertEquals(false, sm.finalize())

	sm.pushResponse('21st')
	assertEquals(false, sm.finalize())

	sm.pushResponse('Weird')
	assertEquals(false, sm.finalize())

	assertEquals({_id: 1337, done: false, survey_id: 5, pointer: 8,
				  responses: [{q_id: 0, response: 'Brian'},
							  {q_id: 1, response: 'Morris'},
							  {q_id: 2, response: '21st'},
							  {q_id: 6, response: 'Weird'}]},
				 sm.serializeResponse())

	sm.pushResponse('Nothing')
	assertEquals(true, sm.finalize())
	assertEquals(true, sm.done)

	sm.modifyResponse(0, 'Carrie')
	assertEquals('Brian', sm.getResponseIdx(0).response)
}
