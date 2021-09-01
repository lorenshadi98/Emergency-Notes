const express = require('express');
const upload = require('express-fileupload');
const cors = require('cors');
const url = require('url');
const fs = require('fs'); 
const path = require('path'); 
const app = express();
const port = 3000;
app.use(upload());
app.use(cors());

global.database = [];

global.userDatabase = [];
const File = require('./files');
const User = require('./users');
const sequelize = require("./database");

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  File.sync().then(() => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    fill();
  })
  User.sync().then(() => {
    userfill();
  })
app.get('/', (req, res) => {
    console.log("index.js app.get('/') aka HelloWorld"),
    res.send("Hello World");
});
app.get('/bye', (req, res) => {
    console.log("index.js app.get('/bye') aka GoodbyeWorld"),
    res.send('Goodbye World!');
});

app.get('/echo',function(req,res){
    console.log("echo query and params");
    console.log(req.query.filepath);
});


app.get('/download',function(req,res){
    console.log("download query and params");
    console.log(req.params);
    console.log(req.query);
    let filename = req.query.filname;
    let filepath = req.query.filepath;
    console.log(req.query);

    res.download(filepath,filename,function(err){
        if(err){
            res.status(400);
            res.send("Requested file not found");
        }
    });
});
app.get('/delete', function(req,res){
    let filename = req.query.filename;
    let filepath = req.query.filepath;
    deleted(filename, filepath);
    res.status(200);
    res.send("deleted\n");
});
async function deleted(filename,filepath){
    await File.destroy({
        where:{
            filename : filename,
            filepath : filepath
        }
      });
}

app.get('/report',function(req,res){
    let filename = req.query.filename;
    let filepath = req.query.filepath;
    console.log(req.query.filename);
    report(filename, filepath);
    res.status(200);
    res.send("reported\n");
 });

async function report(filename,filepath){
    await File.update({ reported: true }, {
        where:{
            filename : filename,
            filepath : filepath
        }
      });
}
app.get('/approve',function(req,res){
    let filename = req.query.filename;
    let filepath = req.query.filepath;
    console.log(req.query.filename);
    approve(filename, filepath);
    res.status(200);
    res.send("aprroved\n");
 });

async function approve(filename,filepath){
    await File.update({ reported: false }, {
        where:{
            filename : filename,
            filepath : filepath
        }
      });
}
app.get('/search',function(req,res){
    console.log("searching for file");
    let query = JSON.stringify(req.query.queryParams);
    console.log(query);    
    let arr = cleanquery(query);
    findFile(arr);
    console.log(arr[0]);    
    console.log(arr[1]);    
    console.log(arr[2]);    
    console.log(req.query);    
    res.json(global.database);
});
app.get('/adminsearch',function(req,res){
    console.log("searching for file");
    let a = false;
    let query = JSON.stringify(req.query.queryParams);
    console.log(query);    
    let arr = cleanquery(query);
    findFile(arr);
    console.log(arr[0]);    
    console.log(arr[1]);    
    console.log(arr[2]);    
    console.log(req.query);   
    admincheck(res);
}
);

async function admincheck(res){
    let username = await User.findOne({attributes: ['username'], where: { loggedin: true }, raw: true })
    username = username.username;
    console.log(username)
    if(username == 'Admin')
    {
        let arr = [];
        let a = global.database.length
        for(let i = 0; i < a; i++)
        {
            if(global.database[i].reported != 0)
            {
            arr.push(global.database[i]);
            }
        }
        console.log(arr);
        global.database = [];
        for(let i = 0; i < arr.length; i++)
        {
            global.database.push(arr[i]);
        }
            res.json(global.database);
        }
    else{
        res.json([]);
    }
}

function cleanquery(query){
    query = query.replace(/\\/g,'');
    query = query.replace('{','');
    query = query.replace(/"/g,'');
    query = query.replace('}','');
    query = query.replace('school','');
    query = query.replace('course','');
    query = query.replace('professor','');
    query = query.replace('username','');
    query = query.replace(/,/g,'');
    query = query.replace(':','');
    let arr = query.split(":"); 
    return arr;
}
async function fill() {
    const { count, rows } = await File.findAndCountAll({raw: true});
    console.log(count);
    console.log(rows);
   // global.database = [];
    //for(let i = 0; i < count; i++)
   //{
    //global.database.push(rows[i]);
   // }
}
async function userfill() {
    const { count, rows } = await User.findAndCountAll({raw: true});
    console.log(count);
    console.log(rows);
    global.database = [];
    for(let i = 0; i < count; i++)
    {
    global.userDatabase.push(rows[i]);
    }
}
async function findFile(arr){
    if(arr[3] != 'Public')
    {
        const { count, rows } = await User.findAndCountAll({
            where: { 
              loggedin: true
            },
            raw: true
        });
        if(count < 1){
            arr[3] = ' ';
        }
        else{
        arr[3] = await User.findOne({attributes: ['username'], where: { loggedin: true }, raw: true });
        arr[3] = arr[3].username;
        }
        console.log(arr[3]);
    }
    if(arr[0] != '' && arr[1] != '' && arr[2] != '' && arr[0] != 'null' && arr[1] != 'null' && arr[2] != 'null')
    {
        const { count, rows } = await File.findAndCountAll({
            where: { 
                school : arr[0],
                course : arr[1],
                professor : arr[2],
                username : arr[3]
            },
            raw: true
        });
        global.database = [];
        for(let i = 0; i < count; i++)
        {
        global.database.push(rows[i]);
        }
        console.log(rows);
    }
    else if(arr[0] != '' && arr[1] != '' && arr[0] != 'null' && arr[1] != 'null')
    {
        const { count, rows } = await File.findAndCountAll({
            where: { 
                school : arr[0],
                course : arr[1],
                username : arr[3]
            },
            raw: true
        });
        global.database = [];
        for(let i = 0; i < count; i++)
        {
        global.database.push(rows[i]);
        }
        console.log(rows);
    }
    else if(arr[0] != '' && arr[2] != '' && arr[0] != 'null' && arr[2] != 'null')
    {
        const { count, rows } = await File.findAndCountAll({
            where: { 
                school : arr[0],
                professor : arr[2],
                username : arr[3]
            },
            raw: true
        });
        global.database = [];
        for(let i = 0; i < count; i++)
        {
        global.database.push(rows[i]);
        }
        console.log(rows);
    }
    else if(arr[1] != '' && arr[2] != '' && arr[1] != 'null' && arr[2] != 'null')
    {
        const { count, rows } = await File.findAndCountAll({
            where: { 
                course : arr[1],
                professor : arr[2],
                username : arr[3]
            },
            raw: true
        });
        global.database = [];
        for(let i = 0; i < count; i++)
        {
        global.database.push(rows[i]);
        }
        console.log(rows);
    }
    else if(arr[1] != '' && arr[1] != 'null')
    {
        const { count, rows } = await File.findAndCountAll({
            where: { 
                course : arr[1],
                username : arr[3]
            },
            raw: true
        });
        global.database = [];
        for(let i = 0; i < count; i++)
        {
        global.database.push(rows[i]);
        }
        console.log(rows);
    }
    else if(arr[2] != ''  && arr[2] != 'null')
    {
        const { count, rows } = await File.findAndCountAll({
            where: { 
                professor : arr[2],
                username : arr[3]
            },
            raw: true
        });
        global.database = [];
        for(let i = 0; i < count; i++)
        {
        global.database.push(rows[i]);
        }
        console.log(rows);
    }
    else if(arr[0] != '' && arr[0] != 'null')
    {
        const { count, rows } = await File.findAndCountAll({
            where: { 
                school : arr[0],
                username : arr[3]
            },
            raw: true
        });
        global.database = [];
        for(let i = 0; i < count; i++)
        {
        global.database.push(rows[i]);
        }
        console.log(rows);
    }
    else
    {
        const { count, rows } = await File.findAndCountAll({
            where: { 
                username : arr[3]
            },
            raw: true
        });
        global.database = [];
        for(let i = 0; i < count; i++)
        {
        global.database.push(rows[i]);
        }
        console.log(rows);
    }
}

// When testing be sure postman key uses "file" as the key
app.post("/upload",function(req,res){
    let school = req.body.school;
    let course = req.body.course;
    let professor = req.body.professor;
    let username = req.body.username;
    console.log("school: " + school);
    console.log("course: " + course);
    console.log("professor: " + professor);
    console.log("username: " + username);
    if(req.files){
        if(school.length > 0  && professor.length >0 && course.length >0){
            file = req.files.file;
            filename = file.name;
            if(username != "Public")
            {
                getusername(school,course,professor,filename);
            }
            else
            {
                file.mv('./Upload/'+ username + '/' + filename,function(err){
                    if(err){
                        res.status(400);
                        res.send("Failed to upload File\n");
                        return -1;
                    }
                }); 
                addFile(school,course,professor,filename,username);
            }
            res.status(200);
            res.send("File uploaded to server\n");
            return 0;
        }
        else{
            res.status(400);
            res.send("Not Enough File Data\n");
            return -1;
        }
    } 
    else {
        res.status(400);
        res.send("No file to upload");
        return -1;
    }
});

async function getusername(school,course,professor,filename){
    let username = await User.findOne({attributes: ['username'], where: { loggedin: true }, raw: true })
    username = username.username;
    console.log("school: " + school);
    console.log("course: " + course);
    console.log("professor: " + professor);
    console.log("username: " + username);
    file.mv('./Upload/'+ username + '/' + filename,function(err){
        if(err){
            return -1;
        }
    });
    addFile(school,course,professor,filename,username);    
}

app.post("/addAccount",function(req,res){
    let userName = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let emailUsed = false;
    
    for(let i = 0;i<global.userDatabase.length;i++)
    {
        if(email == global.userDatabase[i].email)
            emailUsed = true;
    }
    
    if(!emailUsed){
    addUser(email,userName,password);
    res.status(200);
    res.send("User Added To Database");
    }
    else{

        res.status(422);
        res.send("Email previously used");
    }
});

app.post("/login",function(req,res){
    let userName = req.body.username;
    let password = req.body.password;    
    let body = JSON.stringify(req.body);
    console.log(body);    
    body = body.replace(/\\/g,'');
    body = body.replace('{','');
    body = body.replace(/"/g,'');
    body = body.replace('}','');
    body = body.replace('school','');
    body = body.replace('course','');
    body = body.replace(/,/g,'');
    body = body.replace(':','');
    let arr = body.split(":"); 
    let a = findUser(userName,password);
    console.log(a);
    if(findUser(userName,password))
    {
        res.status(200);
        res.send("User Logged on");
    }
    else{

        res.status(422);
        res.send("Invalid Username or Password");
    }
});
async function findUser(username, password){

    const { count, rows } = await User.findAndCountAll({
        where: { 
            username : username,
            password : password
        },
            raw: true
        });
    if(count<1)
        return false;
    else {
        await User.update({ loggedin: false }, {
            where:{
                loggedin : true
            }
          });
        await User.update({ loggedin: true }, {
            where: {
                username : username,
                password : password
            }
        });
    console.log(rows);
    return true;
    }

}

app.post('/logoff', function(req, res){
    logoff();
    res.status(200);
    res.send("logged off\n");
});
async function logoff(){
    await User.update({ loggedin: false }, {
        where:{
            loggedin : true
        }
      });
}

function addFile(school,course,professor,filename,username){
    File.create({ 
        school: school,
        course: course,
        professor: professor,
        filename: filename,
        filepath: './Upload/'+ username + '/' + filename,
        username: username,
        reported: false
    }).then(filename => {
        console.log("Files auto-generated ID:", filename.id)
    })

    return;
}

function addUser(email, username, password){
    User.create({ 
        username: username,
        email: email,
        password: password,
        loggedin: false
    }).then(username => {
        console.log("User auto-generated ID:", username.id)
    })
    fs.mkdir(path.join(__dirname, './Upload/'+ username), (err) => { 
        if (err) { 
            return console.error(err); 
        } 
        console.log('Directory created successfully!'); 
    }); 
    return;
}