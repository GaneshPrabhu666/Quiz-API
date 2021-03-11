const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jsonparser=bodyParser.json();
const port = 8080;

Quiz=[{"id":1,"name":"quiz1","description":"desc_quiz1"}]
Question=[{"id":10,"name":"quiz1","options":"one,two","correct_option":"two","quiz":1,"points":10},{"id":11,"name":"quiz1","options":"one,two","correct_option":"two","quiz":1,"points":10}]


app.get('/api/quiz/:id',(req,res)=> {
    const quiz=Quiz.find(x=> x.id ==req.params.id)
    if(!quiz) {
        return res.json({}).sendStatus(404)
    }
    res.json({quiz});
})

app.get('/api/question/:id',(req,res)=> {
    const question=Question.find(x=> x.id ==req.params.id)
    if(!question) {
        return res.json({}).sendStatus(404)
    }
    res.json({question});
})

app.get('/api/quiz-question/:id',(req,res)=> {
    const quiz=Quiz.find(x=> x.id ==req.params.id)
    if(!quiz) {
        return res.json({}).sendStatus(404)
    }
    const question=Question.filter(x=> x.quiz ==req.params.id)
    res.json({"name":quiz.name,"description":quiz.description,"questions":question});
})

app.post('/api/quiz',jsonparser,(req,res)=> {
    const {name,description} = req.body;
    const existing_quiz=Quiz.find(x=> x.name== name)
    if(!name) {
        return res.status(400).send('name is required')
    }
    else if(!description) {
        return res.status(400).send('description is required')
    }
    else if(existing_quiz) {
        return res.status(400).send('Quiz Already Exists')
    }
    const curr_id = Quiz.length
    Quiz.push({'id':curr_id+1,'name':name,'description':description})

    res.json({'id':curr_id+1,'name':name,'description':description})
})

app.post('/api/question',jsonparser,(req,res)=> {
    const {name,options,correct_option,points,quiz} = req.body;
    const existing_quiz=Quiz.find(x=> x.id == quiz)
    const existing_question=Question.find(x=> x.name== name)
    if(!name) {
        return res.status(400).send('name is required')
    }
    else if(existing_question) {
        return res.status(400).send('Question Already Exists')
    }
    else if(!options) {
        return res.status(400).send('options is required')
    }
    else if(!correct_option) {
        return res.status(400).send('correct_option is required')
    }
    else if(!points) {
        return res.status(400).send('points is required')
    }
    else if(!quiz || !existing_quiz) {
        return res.status(400).send('quiz is required')
    }
    const curr_id = Question.length
    Question.push({'id':curr_id+1,'name':name,'options':options, 'correct_option':correct_option, 'points':points,'quiz':quiz})

    res.json({'id':curr_id+1,'name':name,'options':options, 'correct_option':correct_option, 'points':points,'quiz':quiz})
})

app.listen(port, ()=> {
    console.log("listening on ",port);
})