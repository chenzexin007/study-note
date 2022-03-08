// 观察者  任务厅
function Observer(){
	this.subList = [];
}
Observer.prototype.notify = function(renwu){
  this.subList.length && this.subList.forEach(item => {
      item.update(renwu);
  })
}

// 订阅者 猎手
function Subject(options){
  this.name = options.name
  this.level = options.level
  this.customFn = []
}
const level = {
  1: 100,
  2: 200,
  3: 300    
}
Subject.prototype.update = function(renwu){
  console.log(`${this.level}星猎手${this.name}请接收任务：${renwu},报酬：${level[this.level]}`);
  for(let i=0; i<this.customFn.length; i++){
      this.customFn[i]()
  }
  
}
Subject.prototype.addDosomting = function(fn){
  // 做点自己的事
  this.customFn.push(fn);
}

// 例子
// 创建任务厅  -- 创建订阅者
const home = new Observer();


// 一星猎手  -- 观察者1
const role01 = new Subject({name: 'lilei', level: 1});
// 接任务喜欢摸鱼
role01.addDosomting(function(){ console.log("开始摸鱼。"); });
home.subList.push(role01);

// 三星猎手  -- 观察者2
const role02 = new Subject({name: '马云', level: 3});
// 接支线任务
role01.addDosomting(function(){ console.log("接支线任务。"); });
home.subList.push(role02);

// 发布任务  -- 通知更细
home.notify("猎杀远古神兽")

// 打印结果
// 1星猎手lilei请接收任务：猎杀远古神兽，报酬：100。
// 开始摸鱼。
// 3星猎手马云请接收任务：猎杀远古神兽，报酬：300。
// 接支线任务。
