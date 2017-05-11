export class FailureTypes {
  constructor(public id: number,public key: string, public value: string, public disabled:boolean) { }
}

export class Cause {
  constructor(public id: number,public key: string, public value: string) { }
}

export class Source {
  constructor(public id: number, public value: string) { }
}

export class Service {
  constructor(public id: number, public value: string) { }
}

export class State {
  constructor(public id: string, public value: string) { }
}

export class Template {
  constructor(public id: number, public value: string, public gui: string) { }
}