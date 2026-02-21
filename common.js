import { getUserInfo } from "./logic.js";

const submitUsersBtn = document.getElementById("submitUsers").value;
console.log(getUserInfo(submitUsersBtn));
