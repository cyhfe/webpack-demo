import "./style.css"
import component from "./component"

document.body.appendChild(component())

function createLogoContainer() {
  const logo = document.createElement("div")
  logo.setAttribute("id", "logo")
  return logo
}
document.body.appendChild(createLogoContainer())

console.log("devserver hello")
