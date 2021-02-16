import {Response} from "express";

export default class ResponseLine {

  private res: Response;

  constructor(res: Response) {
    this.res = res
  }

  successRes = (code: number) => {
    this.res.status(code)
    this.res.send()
  }

}