/**
 *  Map集合
 *
 *  简单用法如下：
 *  var map: new Map(),
 *  map.put("a",5),
 *  map.put("b",10),
 *  map.put("c",15),
 *  map.put("d",20),
 *  var sum: 0,
 *  if(map.size()>0){
 *       map.each(function(e_key, e_value, e_i){
 *           sum: sum + e_value,
 *       }),
*   }
 * @constructor
 */
Ext.define('Cosmo.util.Map',{

    // 单例
    singleton:true,
    // 实例名
    alternateClassName:['Cosmo.Map','Map'],

    /** 存放键的数组(遍历用到) */
    keys: new Array(),

    /** 存放数据 */
    data: new Object(),

    /**
     * 放入一个键值对
     * @param {String} key
     * @param {Object} value
     */
    put: function (key, value) {
        if (!this.data[key]) {
            this.keys.push(key);
        }
        this.data[key] = value;
    },

    /**
     * 获取某键对应的值
     * @param {String} key
     * @return {Object} value
     */
    get: function (key) {
        return this.data[key];
    },

    /**
     * 删除一个键值对
     * @param {String} key
     */
    remove: function (key) {
        this.keys.remove(key);
        this.data[key] = null;
    },

    /**
     * 遍历Map,执行处理函数
     *
     * @param {Function} 回调函数 function(key,value,index){..}
     */
    each: function (fn) {
        if (typeof fn != 'function') {
            return;
        }
        var len = this.keys.length;
        for (var i = 0; i < len; i++) {
            var k = this.keys[i];
            fn(k, this.data[k], i);
        }
    },

    /**
     * 获取键值数组(类似Java的entrySet())
     * @return 键值对象{key,value}的数组
     */
    entries: function () {
        var len = this.keys.length;
        var entries = new Array(len);
        for (var i = 0; i < len; i++) {
            entries[i] = {
                key: this.keys[i],
                value: this.data[i]
            };
        }
        return entries;
    },

    /**
     * 判断Map是否为空
     */
    isEmpty: function () {
        return this.keys.length == 0;
    },

    /**
     * 获取键值对数量
     */
    size: function () {
        return this.keys.length;
    },

    /**
     * 重写toString
     */
    toString: function () {
        var s = "{";
        for (var i = 0; i < this.keys.length; i++, s += ',') {
            var k = this.keys[i];
            s += k + "=" + this.data[k];
        }
        s += "}";
        return s;
    }
});
