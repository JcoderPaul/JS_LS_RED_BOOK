'use strict';

class User {
  role = "user";

  /* Тут мы возвращаем строку */
  getRole() {
    return this.role;
  }
}

function logRole(user) {
  console.log("Role: " + user.getRole().toUpperCase());
}

logRole(new User()); // Role: USER

/* И тут у нас появился ADMIN */
class Admin extends User{
        role = ['user', 'admin']; 
        /* Значит и тут в методе getRole() мы дожны возвращать строку*/
}

/* logRole(new Admin()); - TypeError: user.getRole(...).toUpperCase is not a function */

/* И тогда либо через прототип */
Admin.prototype.getRole = function() {
    return this.role.join(',');
}

logRole(new Admin());

/* 
Либо переопределение метода:

class Admin extends User{
        #role = ['user', 'admin']; 
        
        getRole() {
                return this.role.join(',');
        }
*/