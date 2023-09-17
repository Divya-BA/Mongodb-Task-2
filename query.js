//1)Find all the topics and tasks which are thought in the month of October
db.topics.find({date:{$gte:ISODate('2022-10-01'),$lt:ISODate('2022-11-01')}})
db.tasks.find({date:{$gte:ISODate('2022-10-01'),$lt:ISODate('2022-11-01')}})



//2)Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.find({
    'date': {
      '$gte': new Date('Thu, 15 Oct 2020 00:00:00 GMT'), 
      '$lte': new Date('Sat, 31 Oct 2020 00:00:00 GMT')
    }
  })

//3)Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate([
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'id', 
        'foreignField': 'company_drve', 
        'as': 'result'
      }
    }
  ])

//4)Find the number of problems solved by the user in codekata
db.codekata.find({},{user_id:1,problem_solved:1,_id:0})

//5)Find all the mentors with who has the mentee's count more than 15

db.mentor.find({"mentee_count":{$gt:15}})

//6)Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([
    {
      '$match': {
        'date': {
          '$gte': new Date('Thu, 15 Oct 2020 00:00:00 GMT'), 
          '$lte': new Date('Sat, 31 Oct 2020 00:00:00 GMT')
        }
      }
    }, {
      '$project': {
        '_id': 0, 
        'date': 1, 
        'no_of_absents': {
          '$size': '$absent'
        }
      }
    }
  ])