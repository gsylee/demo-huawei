/* 该文件存放一些公用的方法 */

/* 
 * getElement : 通过用户id 获取对应的html元素
 * @param   id:  给元素设置的id值
 * @return  obj: 对应的元素 
 *          false: 没有找到
 */

//  function getElement(id){
//     //  对象检查
//     if(!document.getElementById || !document.getElementsByTagName){
//         return false;
//     }
//     var targetElement = document.getElementById(id);
//     if(!targetElement){return false;}
//     return targetElement;
//  }

 /* 
  * addLoadEvent函数：在window.onload里面绑定多个要同时执行的函数
  * @param: funcName 要执行的函数的名称
  */

  function addLoadEvent(func){
      var old_onload = window.onload;
      if(typeof window.onload != "function"){
          window.onload = func();
      }else {
          window.onloaad = function(){
              old_onload();
              func();
          }
      }
  }

