# 图形化数据开发工作室API文档（Cosmo++ DDS Docs）

## Cosmo Api
> cosmo对象为全局对象，包含属性、方法如下：

### data
---
* 描述： 此方法提供用户访问数据源的能力。
* 类型： Function
* 参数：
``` javascript
    {
        key:'',                         // 数据库连接名称
        sql:'',                         // 要执行的SQL语句
        async:false                     // 是否异步请求，默认为false，只接受布尔类型，否则当作false
    }
```
或者
``` javascript
    {
        name:'',                        // 数据源名称
        async:false                     // 是否异步请求，默认为false，只接受布尔类型，否则当作false
    }
```
* 实例：
``` javascript
    $(function() {
        var case1 = cosmo.data({
            sql: 'select * from table',      // 要执行的SQL语句
            key: 'orcl'                     // 数据库连接名称（与添加数据源时选择的连接名称一样）
        });
        // 此处会阻塞主线程执行直到返回数据
        console.log(case1);

        var case2 = cosmo.data({
            name: '数据源名称'                // 数据源名称
        });
        // 此处会阻塞主线程执行直到返回数据
        console.log(case2);
        
        var case3 = cosmo.data({
            sql: 'select * from table',      // 要执行的SQL语句
            key: 'orcl',                     // 数据库连接名称（与添加数据源时选择的连接名称一样）
            async: true                      // 异步请求数据
        });
        // 此处不会阻塞主线程执行
        console.log(case3);
    });
```

## Echarts Api
---
> echarts对象为全局对象，是Echarts提供的，在此基础上我们扩展了一些易于使用的属性、方法如下：

### tooltip
---
* 描述： 此方法提供用户快速添加已有图表tooltip轮播的能力。
* 类型： Function
* 参数：
``` javascript
    // 渲染图表的dom节点id
    id:'',          可以传单个id，也可以传“,”逗号分隔开的字符串
    {
        interval    轮播时间间隔，单位毫秒，默认为2000
        loopSeries  boolean类型，默认为false。true表示循环所有series的tooltip，false则显示指定seriesIndex的tooltip
        seriesIndex 默认为0，指定某个系列（option中的series索引）循环显示tooltip，当loopSeries为true时，从seriesIndex系列开始执行
        updateData  自定义更新数据的函数，默认为null；用于类似于分页的效果，比如总数据有20条，chart一次只显示5条，全部数据可以分4次显示
    }
```
* 实例：
``` javascript
    $(function() {
        echarts.tooltip('cmpd119bf', {
            loopSeries: true
        });
    });
    或
    $(function() {
        echarts.tooltip('cmpd119bf,cmpa13243', {
            loopSeries: true
        });
    });
```

### update
---
* 描述： 此方法提供用户快速添加已有图表动态刷新数据源的能力。
* 类型： Function
* 参数：
``` javascript
    // 渲染图表的dom节点id
    id:'',          传入图表id，接受以','分隔的id集合
    interval:0      可选参数，轮播时间间隔，单位毫秒，不传或传递非整数不进行轮播
```
* 实例：
``` javascript
    $(function() {
        echarts.update('cmpe4a905,cmpa34236',1000);      
    })
```
