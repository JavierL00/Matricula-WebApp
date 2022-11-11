const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path: './.env'});

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

const bcrypt = require('bcryptjs');

const session = require('express-session');
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// const connection = require('./database');

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/register', (req, res) => {
  res.render('register');
})

app.post('/register', async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const rol = req.body.rol;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
  connection.query('INSERT INTO users SET ?', {
    user: user,
    name: name,
    rol: rol,
    pass: passwordHaash
  }, async (error) => {
    if (error) {
      console.log(error)
    } else {
      res.render('register', {
        alert: true,
        alertTitle: "Registration",
        alertMessage: "¡Registro completo!",
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 1500,
        ruta: ''
      });
    }
  });
});

app.post('/auth', async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  /*if (user && pass) {
    connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
      if (results.length === 0 || !(await bcrypt.compare(pass, results[0].pass))) {
        res.render('login', {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Usuario y/o Password incorrecta",
          alertIcon: 'error',
          showConfirmButton: true,
          timer: false,
          ruta: 'login'
        });
      } else {
        req.session.loggedin = true;
        req.session.name = results[0].name;
        res.render('login', {
          alert: true,
          alertTitle: "Login",
          alertMessage: "¡Logeado con exito!",
          alertIcon: 'success',
          showConfirmButton: false,
          timer: 1500,
          ruta: ''
        });
      }
      res.end();
    });
  } else {
    res.render('login', {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Por favor, ingrese un usuario y una password",
      alertIcon: 'error',
      showConfirmButton: true,
      timer: false,
      ruta: 'login'
    });
  }*/
  req.session.loggedin = true;
  res.render('login', {
    alert: true,
    alertTitle: "Login",
    alertMessage: "¡Logeado con exito!",
    alertIcon: 'success',
    showConfirmButton: false,
    timer: 1500,
    ruta: ''
  });
})

app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('index', {
      login: true,
      name: req.session.name
    });
  } else {
    res.render('index', {
      login: false
    });
  }
  res.end();
});

app.use(function (req, res, next) {
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.get('/logout', function (req, res) {
  req.session.destroy(() => {
    res.redirect('/')
  })
});

app.listen(3000, (req, res) => {
  console.log('SERVER IS RUN IN http://localhost:3000')
});
