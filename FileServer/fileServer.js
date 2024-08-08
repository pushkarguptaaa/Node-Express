const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT= 3000;
const files= path.join(__dirname, 'files');

app.get('/files', (req,res)=>{
  fs.readdir(files, (err,files)=>{
    if(err){
      return res.status(500).send('Failed to retrieve files')
    }
    res.json(files);
  })
})

app.get('/file/:file', (req,res)=>{
  const file = req.params.file;
  const filepath = path.join(files, file);

  fs.readFile(filepath, 'utf8', (err,data)=>{

    if(err){
      if(err.code == 'ENOENT') res.status(404).send('File not found')
      else res.status(500).send('server error')
    }
    else res.status(200).send(data);
  })
})

app.use((req,res)=>{
  res.status(404).send('Route not found')
})

app.listen(PORT, ()=>{
  console.log('server running');
})



module.exports = app;