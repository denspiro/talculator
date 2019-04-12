import {Button, View} from "gui"
import Controller from "../Boundaries/Controller";

class Keypad {
  private controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  getKeyPad (): View[] {
    let digits = ["0","1","2","3","4","5","6","7","8","9"]
    let operators = ["+", "-", "/", "x", "=", "."]
    let keys = digits.concat(operators)
    let buttons :View[] = []

    keys.map((key) => {
      let button = Button.create(key)
      button.onClick = () => this.updateExpression(key)
      button.setStyle({width: "20%", margin: "10px"})
      buttons.push(button)
    })
    
    return buttons
  }

  //external method calls 
  private updateExpression (val: string) {
    return this.controller.updateExpression(val)
  }
}

export default Keypad 