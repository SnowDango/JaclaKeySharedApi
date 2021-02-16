import {Response} from "express";

export class ResponseLine {

  private res: Response;

  constructor(res: Response) {
    this.res = res
  }

  successRes = (code: number) => {
    this.res.status(code)
    this.res.send()
  }

}