/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
let tasks = ["buy batata", "buy bread", "buy car"];
function onDataReceived(text) {
  //make the text as an array
  let inputArray = text.trim().split(" ");
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (inputArray[0].trim() === "hello") {
    // check if the inputArray's length is more than 1 which mean that the user enter his name take the rest elements of the array other than the command hello and pass it to hello
    inputArray.length > 1 ? hello(inputArray.slice(1)) : console.log("Hello!");
  } else if (text === "help\n") {
    help();
  } else if (text === "list\n") {
    list(tasks);
  } else if (inputArray[0] === "edit") {
    inputArray.length > 1
      ? edit(inputArray.slice(1))
      : console.log("error you have to enter the edited task");
  } else if (inputArray[0] === "add") {
    inputArray.length > 1
      ? add(inputArray.slice(1))
      : console.log("Error you can not add empty tesk");
  } else if (inputArray[0] === "remove") {
    inputArray.length > 1 ? remove(inputArray[1].trim()) : tasks.pop();
  } else {
    unknownCommand(text);
  }
}
function edit(input) {
  if (Number.isNaN(Number(input[0]))) {
    tasks[tasks.length - 1] = input.join(" ");
  } else {
    if (Number(input[0]) < 0 || Number(input[0]) > tasks.length - 1) {
      return console.log("task not exist");
    } else {
      let subTasks = input.slice(1);
      tasks[Number(input[0])] = subTasks.join(" ");
      return console.log("task edited");
    }
  }
}

function remove(index) {
  index = Number(index);
  if (index < 0 || index > tasks.length - 1) {
    return console.log("task number is not exist");
  } else {
    tasks.splice(index, 1);
    return console.log("task is removed");
  }
}
function add(task) {
  let stringTask = task.join(" ");
  tasks.push(stringTask);
  return console.log("task added");
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function removeNewLineAndWhiteSace(text) {
  return text.trim().replace("/n", "");
}
function hello(inputs) {
  console.log(`Hello ${inputs.join(" ").replace("\n", "")}!`);
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}
/**
 * This function will list all the commands that we have in the application till now
 *
 * @returns {void}
 */
function help() {
  console.log("Our possible commands are");
  console.log("-------------------------------");
  console.log(
    "hello : will greet you back if you pass anything with it for example hello x it will return Hello x! "
  );
  console.log("list : will show you all the tasks");
  console.log(
    "add with the task that you will add : will add your new task to your tasks without task will show an error"
  );
  console.log(
    "remove without anything will remove the last task, remove with the number of task will remove the specific task"
  );
  console.log("quit or exit : to exit the application");
}

function list(tasks) {
  toDolist = tasks.map((task, index) => `${index} ${task}`);
  console.log(toDolist.join("\n"));
}

// The following line starts the application
startApp("Layla Hammoud");
