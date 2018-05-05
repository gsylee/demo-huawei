// SAME 命名空间
var SAME = {
    /* 
     * closeAD : 关闭页面广告，该函数在项目的几个页面都会用到
     * 因此我们可以在这几个页面，使用相同的id值就能同时有效果了
     * 
     */
    closeAD :  function (){
        //  获取目标元素
        var close_ad = getElement("close-ad");
        var top_ad = getElement("top-ad");
        var em_img = top_ad.getElementsByTagName("img")[0];
        // console.log(em_img.height);
        // 添加点击事件
        close_ad.onclick = function (){
            top_ad.style.display = "none";
        }
     },

    /* 
    * searchForm函数：点击输入框，让索引消失
    * 失去焦点 重新显示索引信息  这个函数在几个页面也会用到，
    * 只需要让这几个页面的表单输入框的id值和索引的id值都保持一致就行了
    */
    searchForm : function (){
        var search = getElement("search");
        var search_tip = getElement("search-tip");
        // 添加输入框得到焦点事件
        search.onfocus = function (){
            search_tip.style.display = "none";
        }
        search.onblur = function (){
            search_tip.style.display = "block";
        }
    },

    /* 
     * showOrHidden : 下拉菜单和下拉购物车实现原理都是一样的；
     *          这个函数在几个页面都会用到，只要传递两个id值就行了
     * @param evenID: 要绑定事件的元素id值
     * @param targetID: 目标元素id值
     */
    showOrHidden : function (evenID,targetID){
        // 获取需要的html元素
        var evenElement = getElement(evenID);
        var targetElement = getElement(targetID);
        // 添加鼠标经过事件
        evenElement.onmouseenter = function (){
            targetElement.style.display = "block";
        }
        evenElement.onmouseleave = function (){
            targetElement.style.display = "none";
        }
    },

    // 轮播图效果
    marquee : function (fatherElement) {
        var cur_index = 0; //用来保存鼠标经过的元素的order值
        var old_index = 0; //保存上一个鼠标经过的元素的order值
        var timer = null; //保存定时器返回的值
        // 获取样绑定事件的元素和目标元素
        var marquee = document.getElementById(fatherElement);
        // 获取事件元素和目标元素
        var as = marquee.getElementsByTagName("a");
        var buttons = marquee.getElementsByTagName("span");
        if(as.length != buttons.length){
            return ;
        }
        // 循环给每个span添加鼠标经过事件
        for(var i=0; i<buttons.length; i++){
            buttons[i].setAttribute("order",i); //添加order属性
            buttons[i].onmouseenter = function() {
                // 清空定时器
                if(timer){
                    clearInterval(timer);
                    timer = null;
                }
                cur_index = this.getAttribute("order");
                // 循环清除每个a元素上面的class值
                common(cur_index);
            }
            // 鼠标放在每个a元素上面的时候，就取消定时器
            as[i].onmouseenter = function() {
                clearInterval(timer);
            }
            as[i].onmouseleave = function() {
                timer = setInterval(autoPlay,2000);
            }
        }
        timer = setInterval(autoPlay,2000);
        function autoPlay(){
            cur_index ++;
            if(cur_index > 4){
                cur_index = 0;
            }
            common(cur_index);
    
        }
        // 吧相同代码抽离出来
        function common(index) {
            for(var j=0; j<as.length; j++) {
                    buttons[j].className = ""; //先清空span元素的class值
                    as[j].className = "no"; // 隐藏
                }
                 // 给上一个鼠标经过的元素添加lucency 属性值
                //  as[index].className = "hidden";
                as[index].className = "show";
                buttons[index].className = "high-color";
                // 保存上一个用户鼠标经过的元素的下表
                // old_index = index;
        }
    },

    // 返回页面顶部
    returnTop : function (){
        // 获取要绑定事件的元素
        var return_top = getElement("return-top");
        var timer = null; //保存定时器返回值
        var speed = 0; //保存滚动条向上移动的值
        var status = true; //状态
        var os_top = 0; //保存滚动条距离顶部的值
        // 获取浏览器的有效高度
        var dm_height = document.documentElement.clientHeight || window.innerHeight;
        // 添加滚动条滚动事件
        $(window).scroll(function() {
            os_top = document.body.scrollTop || document.documentElement.scrollTop;
            if(os_top >= dm_height) {
                // 显示返回顶部的点击按钮
                return_top.style.display = "block";
            }else {
                return_top.style.display = "none";
            }
            if(!status) {
                clearInterval(timer);
            }
            status = false;
        });
        // 给点击按钮绑定点击事件
        return_top.onclick = function() {
            // 清除定时器
            if(timer) {
                clearInterval(timer);
            }
            timer = setInterval(function() {
                status = true;
                os_top = document.body.scrollTop || document.documentElement.scrollTop;
                if(os_top == 0){
                    clearInterval(timer);
                    return;
                }
                speed = Math.ceil(os_top / 5);
                if(document.body.scrollTop > 0){
                    document.body.scrollTop -= speed;
                }else {
                    document.documentElement.scrollTop -= speed;
                }
            },30);
        }
    },
    
    /* 
     * changeContent: 点击切换按钮，显示不同的内容
     * @param: {elementid} 元素id
     */
    changeContent :  function (elementid){
        //  获取目标元素
        var t_element = getElement(elementid) ;
        var change_content = getElement("change-content");
        // 获取按钮
        var prev_element = getElement("prev");
        var next_element = getElement("next");
    
        var index = 1; //表示当前显示的第一屏的内容
        var all_width = change_content.offsetWidth;
        var t_width = t_element.offsetWidth;
        var all_page = all_width / t_width ;
        // 获取当前的style值
        var cur_left = 0;
        prev_element.onclick = function () {
            if(index == 1){
                return;
            }
            cur_left = parseInt(change_content.style.left);
            change_content.style.left  = cur_left + t_width +"px";
            change_content.style.transition = "left .5s";
            index --;
        }
        next_element.onclick = function () {
            if(index == all_page) {
                return;
            }
            cur_left = parseInt(change_content.style.left);
            change_content.style.left =  cur_left - t_width +"px";
            change_content.style.transition = "left .5s";
            index ++;
        }
     }    
};