import {whereKey} from "./src/domain/usercase/KeyStatus";


const key = () => {
  whereKey("部室借りました。").then(data => {console.log(data)})
}

key()