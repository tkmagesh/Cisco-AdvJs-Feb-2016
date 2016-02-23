function Employee(id, name, salary){
    if (this.constructor.name !== 'Employee')
        return new Employee(id, name, salary);
    //this.id = id;
    this.__id = id;

    this.name = name;
    this.salary = salary;
}
Employee.prototype.display = function(){
   console.log(this.id, this.name, this.salary);
};
Employee.prototype.getId = function(){
  return this.__id;
};
