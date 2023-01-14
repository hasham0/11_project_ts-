import inquirer from "inquirer";
import { Users, allUsers } from "./members.js";

// register new user
async function newUser() {
  //taking info
  const newUserInfo = await inquirer.prompt([
    {
      name: "userName",
      type: "input",
      message: "Enter your Name:",
    },
    {
      name: "userFathename",
      type: "input",
      message: "Enter your Father Name:",
    },
    {
      name: "age",
      type: "number",
      message: "Enter your age:",
    },
    {
      name: "cnic",
      type: "number",
      message: "Enter your CNIC number:",
    },
    {
      name: "gender",
      type: "list",
      choices: ["male", "female"],
      message: "Enter your Gender:",
    },
    {
      name: "Amount",
      type: "number",
      message: "Enter your Amount:",
    },
    {
      name: "password",
      type: "number",
      message: "Enter your password:",
    },
  ]);

  //making object of new user from User class
  const u4 = new Users(
    newUserInfo["userName"],
    newUserInfo["userFathename"],
    newUserInfo["age"],
    newUserInfo["cnic"],
    newUserInfo["gender"],
    newUserInfo["Amount"],
    newUserInfo["password"]
  );

  //diaplay information
  console.log("------------------------------------");
  console.log("Account sussessfull creared");
  const myPro = new Promise((resolve) => {
    setTimeout(() => {
      resolve(u4);
    }, 3000);
  });
  const dis = async () => {
    const takes = await myPro;
    console.table(takes);
  };
  await dis();
  console.log("------------------------------------");

  //pushing into user array
  allUsers.push(u4);
}

export { newUser };
