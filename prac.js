class Person{
    constructor(name, age){
      this.name = name,
      this.age = age
    }
    getDetails(){
      return `${this.name} ${this.age}`
    }
}
class Student extends Person{
  constructor(name, age, roll, marks){
    super(name, age)
    this.roll = roll
    this.marks = marks
  }
  getDetails(){
    return super.getDetails + `${this.roll} ${this.marks}`
  }
}
let s1 = new Student("Shivam", 19, 28, 8.5)
let s2 = new Student("Soham", 20, 30, 8.2)
s1.salary = 35
console.log(s1)
console.log(s2)