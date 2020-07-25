const mysql = require("mysql");
const dotenv = require("dotenv");
const inquirer = require("inquirer");

//set password to mySQL DB
dotenv.config();
const sqlPass = process.env.secret

