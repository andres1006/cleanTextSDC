const app = require('./server');
const http = require('http');
require('./database');
const axios = require('axios');
const xlsx = require('node-xlsx');


const fs = require('fs');
/* routes */
app.use('/api', (req, res) => {
  readData();
  res.json({ message: "Lanzamiento de proceso" })
});



const readData = async () => {
 let nameFile = "VentaHogares";
  var obj = xlsx.parse(fs.readFileSync(`./InData/${nameFile}.xlsx`)); // parses a buffer

  //console.log(obj[0].data);
  const data = obj[0].data
  let num = 0;

  let datacsvNew = [];
  let columns = {
    id: 'id',
    name: 'Name'
  };

  columns.id = "Tipo de tipificación";

  let textCsv = '';
  for await (const row of data) {
    if (row[2] && row[2] !== "Llamadas" && row[3] !== "Login PBX") {
      columns.name = null;
      //console.log(row[2])
      //console.log(row[3].split(" ")[0])
      let idfolderXlsx = row[3].split(" ")[0];
      let params = {
        idfolder: idfolderXlsx,
        nameaudio: row[2],
        idcampana: 19
      }
      let res = await axios.post('http://www.smartdatacontact.com/semantic/public/obtenertexto', params)
      columns.name = res.data;
      textCsv = textCsv + 'informacion, '+ '"'+res.data.textall+'"'+' \n';
      fs.appendFile(`./outData/VentaHogares/VentaHogares/${num++}.txt`, res.data.textall, function (err) {
        if (err) {
          console.log(err);
        } else {
          //console.log("File creado");
        }
        datacsvNew.push(columns);
      })
    }
  }

  fs.appendFile(`./outData/VentaHogares/VentaHogares/informacion.csv`, textCsv, function (err) {
    if (err) {
      console.log(err);
    } else {
      //console.log("File creado");
    }
    datacsvNew.push(columns);
  })

  console.log(datacsvNew);

}

readData();

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})