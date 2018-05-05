// 命名空间
var INDEX = {
    showSecondMenu : function (){
         // 获取main-select 下面的所有li标签
        var main_selects = getElement("main-select").getElementsByTagName("li");
        // 循环给每个li添加一个鼠标经过和离开事件
        for(var i=0; i<main_selects.length; i++){
            main_selects[i].onmouseenter = function() {
                this.className = "lihover";
            }
            main_selects[i].onmouseleave = function() {
                this.className = "";
            }
        }
    },  

    // 添加进度条，当页面所有数据加载完成后，在显示内容
    loading : function (){
        var loading = getElement("loading");
        // 调用 onreadyStatechange 事件
        document.onreadystatechange = function (){
            //http返回的状态为complete的时候，代表页面加载完成了，就吧进度条隐藏掉
            if(document.readyState == "complete") {
                loading.style.display = "none";
            }
        }
    },

    // 文字的间歇滚动
    facePlay : function (){
        // 获取元素
        var face_change = getElement("face-change");
        var face_change1 = getElement("face-change1");
        var timer = null; //保存定时器返回值
        var so_timer = null; //保存延时器返回值
        var time = 2000;
        // 克隆出另外一个ul对象
        var face_change2 = ctElement("ul","face_change2");
        // 添加内容
        face_change2.innerHTML = face_change1.innerHTML;
        face_change.appendChild(face_change2);
        var em_height = face_change.offsetHeight; //获取元素自身的高度
    
        // 页面加载完成两秒后，在执行定时器
        setTimeout(sval,time);
        // 吧定时器封装成一个函数
        function sval() {
            timer = setInterval(autoPlay,10);
        }
        function autoPlay() {
            face_change.scrollTop ++; //内容向上移动，相当于滚动条向下滚动
            if(face_change.scrollTop % em_height == 0) {
                // 清除定时器
                clearInterval(timer);
                // 两秒后在此此执行定时器
              so_timer =  setTimeout(sval,2000);
            }
            if(face_change.scrollTop >= face_change1.offsetHeight) {
                face_change.scrollTop = 0;
            }
        }
        // 鼠标经过
        face_change.onmouseenter = function() {
            clearInterval(timer); //清除定时器
            clearTimeout(so_timer); //清除延时器才对
        }
        face_change.onmouseleave = function() {
            so_timer =  setTimeout(sval,time);
        }
        function ctElement(emname,idname) {
            var new_element = document.createElement(emname);
            new_element.setAttribute("id",idname);
            return new_element;
        }
    }
};