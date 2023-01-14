#! /usr/bin/env node
//import liberies
import inquirer from "inquirer";
import { checkUser } from "./perosn/members.js";
import { newUser } from "./perosn/newUsers.js";

async function main() {
  const userInput = await inquirer.prompt([
    {
      name: "options",
      type: "list",
      choices: ["Login into Account", "Register as new user", "exit"],
      message: "Select an option:",
    },
  ]);

  if (userInput["options"] === "Login into Account") {
    console.log("------------------------------------");
    checkUser();
  } else if (userInput["options"] === "Register as new user") {
    console.log("------------------------------------");
    await newUser();

    const ask = await inquirer.prompt([
      {
        name: "cont",
        type: "confirm",
        message: "Do you want to continue? Y/ N",
      },
    ]);

    if (ask["cont"] === true) {
      checkUser();
    } else {
      console.log("good bye");
    }
  } else {
    console.log("------------------------------------");
    console.log("have a nice day");
  }
}

main();
