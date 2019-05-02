import React from "react";
import ReactDom from "react-dom";
import Control from "./control";
import Model from "./model";
import View from "./view";

let model=new Model();
let view=new View();
let control=new Control(view,model);

ReactDom.render(< control.updateView/>,document.getElementById("root"));

