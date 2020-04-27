const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://connor:Peppet12@cluster0-lmisd.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useUnifiedTopology: true}, {useCreateIndex: true} );
const http = require('http');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var results;
var server = http.Server(app);
app.use(express.static('client'));




  client.connect(err=>{
    const collection = client.db("superhero").collection("leaderboard");
    
      

      app.get('/get', function(req,res){
        
    
    
  
        var css = "<html> <head><style> body{background-image: linear-gradient(45deg, #8895ac 0%, #FFFFFF 100%);background-attachment:fixed;height:100%;} h1{padding-left: 2%;text-align:center;padding-top: 50px;padding-right:2%; padding-bottom: 0 !important;position: static; z-index: 100;  color: #363CD2;}.leaderboard{text-align: center;border: 1px solid black;  position:relative;  margin-left:auto;margin-right:auto;color: #363CD2;} </style></head>"
        var html = "<body><h1>LEADERBOARD</h1>"

        var obj = collection.find({}).toArray(function(err, result) {
          if (err) throw err;
          result.sort(function (a,b){
            return  b.wins-a.wins;
          });
          console.log(result);
          
          var tbl = '<table cellpadding="1" id="table" class="leaderboard">'
          tbl = tbl +'<tr class="leaderboard" >'
          +'<th class="leaderboard">Superhero Name</th>'
          +'  <th class="leaderboard">Wins</th>'
           +'<tr class="leaderboard">';
          for(var i = 0; i<result.length; i++)
                        {
                            tbl = tbl+ "<td class='leaderboard'>"+result[i].name+"</td>"
                            + "<td class='leaderboard'>"+result[i].wins+"</td></tr>" 
                        }


            tbl = tbl + "</table> </body></html>"
          res.send(css+ html +tbl );
          //client.close();
      });
     
        
      
      
      });
      
      app.post('/post', function(req,res){
        var supename = req.query.name
       
      
       
        
          collection.updateOne({"name":supename, "wins":{$gte:1}}, {$inc : {"wins":1}}, {upsert:true},function(err,rest){
            if (err) throw err;
            res.send('updated database');
          });
        });





      server.listen(PORT,function() {
        console.log("server is running");
        });
    
    });





   

    









