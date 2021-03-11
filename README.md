# Quiz-API

Steps to execute
git clone

cd Quiz-API

npm install

npm run start

API end points:

http://localhost:8080/api/question/:question_id

http://localhost:8080/api/quiz/:quiz_id

http://localhost:8080/api/quiz-question/:quiz_id

POST: http://localhost:8080/api/quiz
     Sample payload:
     {
    "name":"new_quiz",
    "description":"new_desc" 
    }
    
      http://localhost:8080/api/questoin
      
     {
   "name":"new_question_name",
   "options":"abc,bcd", "correct_option":"abc", 
   "points": 10,
   "quiz":1
}
