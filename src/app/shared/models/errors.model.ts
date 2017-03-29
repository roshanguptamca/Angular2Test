export class Errors {
  errors: {[key:string]: string} = {};
  timeOutError:String;
  apiError:any[] = [];

  setErrors(errors, timeOutError){
    this.errors = errors;
    this.timeOutError = timeOutError;
  }

  reset(){
    this.apiError =[];
    this.errors = {};
    this.timeOutError = "";
  }
}
