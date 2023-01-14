import inquirer from "inquirer";

interface Person {
  name: string;
  fathername: string;
  age: number;
  cnic: number;
  gender: "male" | "female";
  totalAmount: number;
  password: number;

  checkBalance(): void;
  withdrawAmount(val: number): number;
  depositeAmount(val: number): void;
}

type check = {
  name: string;
  fathername: string;
  age: number;
  cnic: number;
  gender: "male" | "female";
  totalAmount: number;
  password: number;
  checkBalance(): void;
  withdrawAmount(val: number): void;
  depositeAmount(val: number): void;
};

const allUsers: check[] = [];

// existing user

class Users implements Person {
  id: number;
  static id2 = 0;
  constructor(
    public name: string,
    public fathername: string,
    public age: number,
    public cnic: number,
    public gender: "male" | "female",
    public totalAmount: number,
    public password: number
  ) {
    this.name = name;
    this.fathername = fathername;
    this.age = age;
    this.cnic = cnic;
    this.gender = gender;
    this.totalAmount = totalAmount;
    this.password = password;
    this.id = ++Users.id2;
  }
  //check balance
  checkBalance(): void {
    console.log(`your account balance is ${this.totalAmount}`);
  }
  //withdraw amount
  withdrawAmount(val: number): number {
    return (this.totalAmount -= val);
  }
  //deposite amount
  depositeAmount(val: number): number {
    return (this.totalAmount += val);
  }
  //view info
  get TotalAmount() {
    return this.totalAmount;
  }
}

//dummy data
const u1 = new Users("ali", "saleem", 22, 422012323, "male", 5000, 1234);
const u2 = new Users("alia", "saleem", 28, 422012323, "female", 33000, 3456);
const u3 = new Users("aliza", "saleem", 28, 422012323, "female", 33000, 5678);

allUsers.push(u1, u2, u3);

async function checkUser() {
  const userName = await inquirer.prompt([
    {
      name: "curUser",
      type: "input",
      message: "Enter your user-name:",
    },
  ]);

  //verifying user name

  function checking<T>(cName: T) {
    if (typeof cName === "string") {
      return allUsers.findIndex((val) => val.name === cName);
    }
    if (typeof cName === "number") {
      return allUsers.findIndex((val) => val.password === cName);
    }
  }

  let userNameCheck = checking(userName["curUser"])!;
  if (userNameCheck >= 0) {
    const userPass = await inquirer.prompt([
      {
        name: "curPass",
        type: "number",
        message: "Enter your password:",
      },
    ]);

    //verifying password
    const userPassCheck = checking(userPass["curPass"])!;
    if (userPassCheck >= 0) {
      console.log("valid");
      while (true) {
        const options = await inquirer.prompt([
          {
            name: "userOptions",
            type: "list",
            choices: [
              "checkBalance",
              "withdrawAmount",
              "depositeAmount",
              "viewInfo",
            ],
            message: "select your options:",
          },
        ]);
        const balance = checking(userName["curUser"])!;
        //current balance
        if (options["userOptions"] === "checkBalance") {
          console.log("\n\tTotal balance:");
          console.log("---------------------------------------------");
          `\t${allUsers[balance].checkBalance()}`;
          console.log("\n");
        } else if (options["userOptions"] === "withdrawAmount") {
          console.log("---------------------------------------------");
          //withdraw amount
          console.log("\n\tWithdraw Amount:");
          console.log("---------------------------------------------");
          console.log(`your current amount : ${allUsers[balance].totalAmount}`);
          const withAm = await inquirer.prompt([
            {
              name: "userWithAm",
              type: "number",
              message: "select your withdraw amount:",
            },
          ]);
          console.log("---------------------------------------------");
          const wdAmt = allUsers[balance].withdrawAmount(withAm["userWithAm"]);
          console.log(`your withdraw amount :${withAm["userWithAm"]}`);
          console.log(`Now your account balance : ${wdAmt}`);

          console.log("\n");
        } else if (options["userOptions"] === "depositeAmount") {
          //deposite amount
          console.log("---------------------------------------------");
          console.log("\n\tDeposite Amount:");
          console.log("---------------------------------------------");
          console.log(`your current amount : ${allUsers[balance].totalAmount}`);
          const depAm = await inquirer.prompt([
            {
              name: "userDepAm",
              type: "number",
              message: "select your deposite amount:",
            },
          ]);
          console.log("---------------------------------------------");
          const dpAmt = allUsers[balance].depositeAmount(depAm["userDepAm"]);
          console.log(`your withdraw amount :${depAm["userDepAm"]}`);
          console.log(`Now your account balance : ${dpAmt}`);
          console.log("\n");
        } else if (options["userOptions"] === "viewInfo") {
          console.log("\n\tView Info:");
          console.log("---------------------------------------------");
          console.table(allUsers[balance]);
          console.log("---------------------------------------------");
          break;
        }
      }
    } else {
      console.log("invalide");
    }
  } else {
    console.log("invalid user name");
  }
}

export { checkUser, allUsers, Users };
