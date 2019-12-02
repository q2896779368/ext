/**
 * ECharts--增强流动图
 */
Ext.define('Cosmo.util.component.echarts.ECharts-GL-Flow', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-GL-Flow'],

    requires: ['Ext.dom.Helper'],

    /** 构造函数 */
    constructor: function () {
        var _config = {
            /** 元件ID */
            id: "",
            /** 标识 */
            marking: '',
            /** 元件显示/隐藏 */
            display: true,
            /** 元件锁定/解锁 */
            lock: false,
            /** 元件类型 */
            type: 'ECharts-GL-Flow',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-GL-Flow',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-GL-Flow',
            /** 元件创建时的初始化样式 */
            iconCls: '',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            code:  "",

            optionJs: "$.getScript('resources/plugin/echarts/examples/simplex.js').done(function () {" +
            "var noise = new SimplexNoise(Math.random);" +
            "var noise2 = new SimplexNoise(Math.random);" +
            "function generateData() {" +
            "    var data = [];" +
            "    for (var i = 0; i <= 50; i++) {" +
            "        for (var j = 0; j <= 50; j++) {" +
            "            var dx = noise.noise2D(i / 30, j / 30);" +
            "            var dy = noise2.noise2D(i / 30, j / 30);" +
            "            var mag = Math.sqrt(dx * dx + dy * dy);" +
            "            valMax = Math.max(valMax, mag);" +
            "            valMin = Math.min(valMin, mag);" +
            "            data.push([i, j, dx, dy, mag]);" +
            "        }" +
            "    }" +
            "    return data;" +
            "}" +
            "var valMin = Infinity;" +
            "var valMax = -Infinity;" +
            "var data = generateData();" ,

            /** Echarts配置项 */
            option: "myChart.setOption({" +
            "    visualMap: {" +
            "        show: false," +
            "        min: valMin," +
            "        max: valMax," +
            "        dimension: 4," +
            "        inRange: {" +
            "            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']" +
            "        }" +
            "    }," +
            "    xAxis: {" +
            "        type: 'value'," +
            "        axisLine: {" +
            "            lineStyle: {" +
            "                color: '#fff'" +
            "            }" +
            "        }," +
            "        splitLine: {" +
            "            show: false," +
            "            lineStyle: {" +
            "                color: 'rgba(255,255,255,0.2)'" +
            "            }" +
            "        }" +
            "    }," +
            "    yAxis: {" +
            "        type: 'value'," +
            "        axisLine: {" +
            "            lineStyle: {" +
            "                color: '#fff'" +
            "            }" +
            "        }," +
            "        splitLine: {" +
            "            show: false," +
            "            lineStyle: {" +
            "                color: 'rgba(255,255,255,0.2)'" +
            "            }" +
            "        }" +
            "    }," +
            "    series: [{" +
            "        type: 'flowGL'," +
            "        data: data," +
            "        particleDensity: 64," +
            "        particleSize: 5," +
            "        itemStyle: {" +
            "            opacity: 0.5" +
            "        }" +
            "    }, {" +
            "        type: 'custom'," +
            "        data: data," +
            "        encode: {" +
            "            x: 0," +
            "            y: 0" +
            "        }," +
            "        renderItem: function (params, api) {" +
            "            var x = api.value(0), y = api.value(1), dx = api.value(2), dy = api.value(3);" +
            "            var start = api.coord([x - dx / 2, y - dy / 2]);" +
            "            var end = api.coord([x + dx / 2, y + dy / 2]);" +
            "            return {" +
            "                type: 'line'," +
            "                shape: {" +
            "                    x1: start[0], y1: start[1]," +
            "                    x2: end[0], y2: end[1]" +
            "                }," +
            "                style: {" +
            "                    lineWidth: 2," +
            "                    stroke:'#fff'," +
            "                    opacity: 0.2" +
            "                }" +
            "            }" +
            "        }" +
            "    }]" +
            "});" +
            "});",

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '增强流动图',
                showName: "",
                name: "",
                text: "增强流动图",
                textCombo: [],
                cls: "ECharts-GL-Flow",
                dataSource: [],
                XYOffset: {
                    targetCmpId: "",
                    X: 0,
                    Y: 0
                },
                events: {}
            },

            /** 初始化样式 */
            style: {
                /** 位置尺寸 */
                zIndex: "",
                left: "200",
                top: "100",
                width: "400",
                height: "300",
                display: "",

                /** 字体 */
                fontFamily: "",
                fontSize: "12",
                fontWeight: "",
                fontStyle: "",
                textUnderline: "",
                color: "",

                /** 边框 */
                borderColor: "",
                borderWidth: "",
                borderStyle: "",

                /** 背景色 不透明度 */
                backgroundColor: "",
                transparency: "100",

                /** 水平垂直位置 */
                textAlign: "",
                verticalAlign: "",

                /** 鼠标样式 */
                cursor: "",

                /** 元件角度 */
                eleRotation: "0",

                /** 文字角度 */
                textRotation: "0",

                /** 引用样式类名 */
                quoteName: '',

                /** 回显存入样式*/
                echoStyle: {}
            }
        };
        for (var property in _config) {
            var val = _config[property];
            this[property] = val;
        }
        return this;
    },

    /** 初始化元件样式 */
    initDomProxy: function () {
        this.callParent();
    },

    /** 创建元件在页面上的dom的代理对象 */
    createDomProxy: function (left, top, dataOptions, combo) {
        var newCombo = "";
        //判断是新建还是打开已保存的
        if (combo == undefined) {
            newCombo = "text='增强流动图'"
        } else {
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[1] != "cosmonull") {
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1] + "' "
                }
            }
        }

        var defaultClass = "";

        if (this.property.cls)
            defaultClass = this.property.cls;
        else
            defaultClass = this.iconCls;

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-GL-Flow' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
        var proxy = {
            tag: 'div',
            type: this.type,
            value: this.property.text,
            id: this.id,
            cmpType: this.type,
            style: 'position:absolute;left:' + left + 'px;top:' + top + 'px;width:' + this.style.width + 'px;height:' + this.style.height + 'px;z-index:' + this.style.zIndex,
            cls: defaultClass,
            html: html
        };
        this.html = html;
        this.domProxy = Ext.dom.Helper.createDom(proxy);
        return this.domProxy;
    },

    /** 初始化元件事件 */
    initEvents: function () {
        var el = Ext.fly(this.id);
        var attr = {};
        for (var e in this.property.events) {
            if (this.property.events[e] != "") {
                attr[e] = 'javascript:' + this.property.events[e];
            }
        }
        el.set(attr);
    },
    statics: {
        //右侧属性修改时，渲染页面方法combo
        reParse: function () {
            var page = Map.get(Const.PAGE_OBJECT);
            var activeId = page.activeCmp.id;
            var type = page.items[activeId].type;
            var style = page.items[activeId].style;
            var dataOptions = page.items[activeId].property.dataOptions;
            var combo = page.items[activeId].property.textCombo;
            var newCombo = ""
            //修改textCombo格式
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[1] != "cosmonull") {
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1] + "' "
                }
            }
            // 修改style样式
            var newStyle = "";
            for (var key in style) {
                if (key == "width" || key == "height") {
                    newStyle += key + ":" + style[key] + "px;";
                } else {
                    newStyle += key + ":" + style[key] + ";";
                }
            }

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-GL-Flow'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
