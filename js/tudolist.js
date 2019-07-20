// 入口函数
$(function () {
    // 第一步：当按下回车键的时候，就读取本地存储数据,on的监听事件
    $('#title').on('keydown', function (e) {
        // 判断下是否是按下了
        if (e.keyCode === 13) {
            // 检查下
            // console.log('按下了');
             //2---- 获取本地存储的数据
        var data = getData();
        //3---修改存储数据
        data.push({
            title: $(this).val(),
            done: false,
        });
        //4---在存储数据
        savaData(data);
        //5---渲染到页面
        load();
        }
       

    });

    //当点击a的时候，删除li里的某条数据,a是动态创建，用on事件绑定

    $('ol,ul').on('click', 'a', function () {
        // 回到动态创建结构里面去自定义a的index索引 index="index"
        // 获取index 给一个变量接收
        var i = $(this).attr('index');
        // 获取本地数据
        var data = getData();
        [{},{},{}]
        // 修改数据
        data.splice(i, 1);
        // 再次存储数据
        savaData(data);
        // 渲染到页面
        load();
    })
    //   此模块代码书写在获取本地数据前面
    // 勾选复选框移动到下面模块
      $('ol,ul').on('click','input',function(){
          var i = $(this).siblings('a').attr('index');
            //   获取数据
          var  data = getData();
        //   修改数据
           data[i].done=$(this).prop('checked');
        //    保存数据
        savaData(data);
        // 渲染页面
        load();
      })

    // 先读取本地存储的数据,需要重复调用的，封装成函数
    function getData() {
        // 获取本地存储数据,用一个变量接收下
        var local = localStorage.getItem('todolist');
        //  判断下存储的数据是否是为空值
        if (local !== null) {
            //   不为空就转成JSON.parse值
            return JSON.parse(local);
        } else {
            return [];
        }
    };
    //从新存储本地数据，因为多次复用，封装函数。
    function savaData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    //将数据渲染到页面，也是复用d代码封装成函数
    load();
    function load() {
        // 读取本地数据
        var data = getData();
        $('ol,ul').empty();
        var todoCount= 0;
        var doneCount=0;
        // 修改数据,需要遍历数据，创建动态结构 li的结构
        $.each(data, function (index, ele) {
            // 创建小li $('<li></li>'),追加li面的结构
            // console.log(ele);//ele---->每个对象
            // $('ol').prepend($('<li><input type="checkbox"><p>' + ele.title + '</p><a href="javascript:;" index=' + index + '></a></li>'))
            if (ele.done){
                $('ul').prepend($('<li><input type="checkbox" checked="checkded"><p>' + ele.title + '</p><a href="javascript:;" index=' + index + '></a></li>'))
                doneCount++;
            }else {
                $('ol').prepend($('<li><input type="checkbox"><p>' + ele.title + '</p><a href="javascript:;" index=' + index + '></a></li>'))
                todoCount++;
            }
        })
        // 防止重复渲染，在遍历前清空ol
            $('#todocount').text(todoCount);
            $('#donecount').text(doneCount);
    }




})