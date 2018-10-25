const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/form.html');
});

app.post('/data', function (req, res) {
  //Данные с формы req.body хэш
  console.log(req.body);
  //Отображение адреса смарт контракта
  res.send('Тут будет адрес смарт контракта')
});
