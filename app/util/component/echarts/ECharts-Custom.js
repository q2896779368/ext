/**
 * ECharts--定制图
 */
Ext.define('Cosmo.util.component.echarts.ECharts-Custom', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-Custom'],

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
            type: 'ECharts-Custom',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-Custom',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-Custom',
            /** 元件创建时的初始化样式 */
            iconCls: '',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            code: "",

            optionJs: "var yearCount = 7;" +
            "var categoryCount = 30;" +
            "" +
            "var xAxisData = [];" +
            "var customData = [];" +
            "var legendData = [];" +
            "var dataList = [];" +
            "" +
            "legendData.push('trend');" +
            "var encodeY = [];" +
            "for (var i = 0; i < yearCount; i++) {" +
            "    legendData.push((2010 + i) + '');" +
            "    dataList.push([]);" +
            "    encodeY.push(1 + i);" +
            "}" +
            "" +
            "for (var i = 0; i < categoryCount; i++) {" +
            "    var val = Math.random() * 1000;" +
            "    xAxisData.push('category' + i);" +
            "    var customVal = [i];" +
            "    customData.push(customVal);" +
            "" +
            "    var data = dataList[0];" +
            "    for (var j = 0; j < dataList.length; j++) {" +
            "        var value = j === 0" +
            "            ? echarts.number.round(val, 2)" +
            "            : echarts.number.round(Math.max(0, dataList[j - 1][i] + (Math.random() - 0.5) * 200), 2);" +
            "        dataList[j].push(value);" +
            "        customVal.push(value);" +
            "    }" +
            "}" +
            "" +
            "function renderItem(params, api) {" +
            "    var xValue = api.value(0);" +
            "    var currentSeriesIndices = api.currentSeriesIndices();" +
            "    var barLayout = api.barLayout({" +
            "        barGap: '30%', barCategoryGap: '20%', count: currentSeriesIndices.length - 1" +
            "    });" +
            "" +
            "    var points = [];" +
            "    for (var i = 0; i < currentSeriesIndices.length; i++) {" +
            "        var seriesIndex = currentSeriesIndices[i];" +
            "        if (seriesIndex !== params.seriesIndex) {" +
            "            var point = api.coord([xValue, api.value(seriesIndex)]);" +
            "            point[0] += barLayout[i - 1].offsetCenter;" +
            "            point[1] -= 20;" +
            "            points.push(point);" +
            "        }" +
            "    }" +
            "    var style = api.style({" +
            "        stroke: api.visual('color')," +
            "        fill: null" +
            "    });" +
            "" +
            "    return {" +
            "        type: 'polyline'," +
            "        shape: {" +
            "            points: points" +
            "        }," +
            "        style: style" +
            "    };" +
            "}" ,

            /** Echarts配置项 */
            option: "option = {" +
            "    tooltip: {" +
            "        trigger: 'axis'" +
            "    }," +
            "    legend: {" +
            "        data: legendData" +
            "    }," +
            "    dataZoom: [{" +
            "        type: 'slider'," +
            "        start: 50," +
            "        end: 70" +
            "    }, {" +
            "        type: 'inside'," +
            "        start: 50," +
            "        end: 70" +
            "    }]," +
            "    xAxis: {" +
            "        data: xAxisData" +
            "    }," +
            "    yAxis: {}," +
            "    series: [{" +
            "        type: 'custom'," +
            "        name: 'trend'," +
            "        renderItem: renderItem," +
            "        itemStyle: {" +
            "            normal: {" +
            "                borderWidth: 2" +
            "            }" +
            "        }," +
            "        encode: {" +
            "            x: 0," +
            "            y: encodeY" +
            "        }," +
            "        data: customData," +
            "        z: 100" +
            "    }].concat(echarts.util.map(dataList, function (data, index) {" +
            "        return {" +
            "            type: 'bar'," +
            "            animation: false," +
            "            name: legendData[index + 1]," +
            "            itemStyle: {" +
            "                normal: {" +
            "                    opacity: 0.5" +
            "                }" +
            "            }," +
            "            data: data" +
            "        };" +
            "    }))" +
            "};",

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '定制图',
                showName: "",
                name: "",
                text: "定制图",
                textCombo: [],
                cls: "ECharts-Custom",
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
            newCombo = "text='定制图'"
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

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Custom' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
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

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Custom'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
