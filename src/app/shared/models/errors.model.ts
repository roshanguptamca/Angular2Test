export class Errors {
  errors: {[key:string]: string} = {};
  timeOutError:String;


  setErrors(errors, timeOutError){
    this.errors = errors;
    this.timeOutError = timeOutError;
  }
}
