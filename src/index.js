const app = require('./server');
const http = require('http');
//require('./database');
const axios = require('axios');
const xlsx = require('node-xlsx');
var rootCas = require('ssl-root-cas/latest').create();
 
rootCas
  .addFile('/Volumes/ANDRES/Universidad/Practica/Test/my_api/node_modules/ssl-root-cas/pems/globalsign-root-ca-r6.pem')
  ;
 
// will work with all https requests will all libraries (i.e. request.js)
require('https').globalAgent.options.ca = rootCas;
//certificates /Volumes/ANDRES/Universidad/Practica/Test/my_api/node_modules/ssl-root-cas/pems/
//require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

const fs = require('fs');
/* routes */
app.use('/api', (req, res) => {
  readData(req);
  res.json({ message: "Lanzamiento de proceso" })
});



const readData = async () => {
  //const { email , password } = data;
  //const login = { email , password  }
      const  loginData = {
        email: "responsable@tigoune.com",
        password: "123456"
      }

      const login = await axios.post('https://smartdatacontact.com/datacall/api/api_auth/login',loginData)
      console.log(login.data);

      const dataGetTranscription = {
        cmp_id: 19,
        initial_date: "2020-06-01",
          final_date: "2020-06-30",
          code: "Contracting>Failed>NoCoverage"
      }
      const config ={
        headers: {
          'Authorization': 'Bearer ' + login.data.token
        }
      }

      const transcriptions = await axios.post('https://smartdatacontact.com/datacall/api/api_sdc/practice', dataGetTranscription, config )

      let nomTranscription = transcriptions.data.data[0]._source.evg_nombre_grabacion.split('.xml')[0]
      console.log(nomTranscription);

      let params = {
        idfolder: transcriptions.data.data[0]._source.login_id,
        nameaudio: nomTranscription,
        idcampana: 19
      }
      let res = await axios.post('http://www.smartdatacontact.com/semantic/public/obtenertexto', params)
      console.log(res.data.textall);
      /* for await (const row of data) {
    if (row[2] && row[2] !== "Llamadas" && row[3] !== "Login PBX") {

      let idfolderXlsx = row[3].split(" ")[0];
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

 console.log(datacsvNew); */ 

}
readData();

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})