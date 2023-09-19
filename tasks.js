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
function onDataReceived(text) {
  //make the text as an array
  let inputArray = text.split(" ");
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (inputArray[0].trim() === "hello") {
    // check if the inputArray's length is more than 1 which mean that the user enter his name take the rest elements of the array other than the command hello and pass it to hello
    inputArray.length > 1 ? hello(inputArray.slice(1)) : hello();
  } else if (text === "help\n") {
    help();
  } else {
    unknownCommand(text);
  }
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
function hello(inputs) {
  if (inputs !== undefined) {
    // map over the elements in the array to remove the white space and the new line which is /n
    entries = inputs.map((word) => word.trim().replace("/n", ""));
    console.log(`Hello ${entries.join(" ")}!`);
  } else {
    console.log("Hello!");
  }
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
  console.log("hello : will greet you back if you pass anything with it for example hello x it will return Hello x! ");
  console.log("quit or exit : to exit the application");
}

// The following line starts the application
startApp("Layla Hammoud");
