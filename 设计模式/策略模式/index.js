const jobList = ['or', 'od']

// 常规写法
function getResult(options){
  return options.user === "" && options.level > 1 && jobList.findIndex[options.role] !== -1 && options.type === "吃瓜群众"
}


// 策略
const strategies = {
  checkUser: function(value){
    return value === "github用户";
  },
  checkLevel: function(value){
    return value > 1;
  },
  checkRole: function(value){
    return jobList.findIndex(value) != -1;
  },
  checkType: function(value){
    return value === "吃瓜群众"
  }
}

// 校验
const verification = function(){
  this.check = [];

  this.add = function(val, method){
    try {
      this.check.push(strategies[method](val))
    }catch(err){
      console.error("非法定义：", err)
    }
  };

  this.getResult = function(){
    for(let i=0; i<this.check.length; i++){
      if(!this.check) return false
    }
    return true
  }
}

// 案例
let user01 = new verification();
user01.add("github用户", "checkUser");
user01.add(3, "checkLevel");
user01.add("or", "checkRole");
user01.add("吃瓜群众", "checkType");
const result = user01.getResult();