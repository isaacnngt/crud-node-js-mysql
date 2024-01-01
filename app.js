// Importa os módulos necessários
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon"); // Middleware para servir o favicon
var logger = require("morgan"); // Middleware para log de requisições HTTP
var cookieParser = require("cookie-parser"); // Middleware para manipulação de cookies
var bodyParser = require("body-parser"); // Middleware para analisar corpos de requisição

// Importa os arquivos de rotas
var index = require("./routes/index");
var users = require("./routes/users");
var produtos = require("./routes/produtos");

// Cria uma instância do aplicativo Express
var app = express();

// Configurações do banco de dados
var mysql = require("mysql");
pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});

// Configuração do mecanismo de visualização (usando o EJS neste caso)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Descomente a linha abaixo após colocar o ícone de favoritos em /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Configuração de middlewares para processar requisições
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configuração de rotas para diferentes caminhos
app.use("/", index);
app.use("/users", users);
app.use("/produtos", produtos);

// Captura erros 404 e encaminha para o manipulador de erros
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Manipulador de erros
app.use(function (err, req, res, next) {
  // Define variáveis locais, fornecendo informações sobre o erro apenas durante o desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Renderiza a página de erro
  res.status(err.status || 500);
  res.render("error");
});

// Exporta o aplicativo para ser usado em outros módulos
module.exports = app;
