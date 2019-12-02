/**
 * ECharts--箱线图
 */
Ext.define('Cosmo.util.component.echarts.ECharts-Boxplot', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-Boxplot'],

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
            type: 'ECharts-Boxplot',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-Boxplot',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-Boxplot',
            /** 元件创建时的初始化样式 */
            iconCls: '',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            code: "",

            optionJs: "var data = echarts.dataTool.prepareBoxplotData([" +
            "    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960]," +
            "    [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800]," +
            "    [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840]," +
            "    [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780]," +
            "    [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]" +
            "]);" ,

            /** Echarts配置项 */
            option: "option = {" +
            "    title: [" +
            "        {" +
            "            text: 'Michelson-Morley Experiment'," +
            "            left: 'center'," +
            "        }," +
            "        {" +
            "            text: 'upper: Q3 + 1.5 * IRQ \\nlower: Q1 - 1.5 * IRQ'," +
            "            borderColor: '#999'," +
            "            borderWidth: 1," +
            "            textStyle: {" +
            "                fontSize: 14" +
            "            }," +
            "            left: '10%'," +
            "            top: '90%'" +
            "        }" +
            "    ]," +
            "    tooltip: {" +
            "        trigger: 'item'," +
            "        axisPointer: {" +
            "            type: 'shadow'" +
            "        }" +
            "    }," +
            "    grid: {" +
            "        left: '10%'," +
            "        right: '10%'," +
            "        bottom: '15%'" +
            "    }," +
            "    xAxis: {" +
            "        type: 'category'," +
            "        data: data.axisData," +
            "        boundaryGap: true," +
            "        nameGap: 30," +
            "        splitArea: {" +
            "            show: false" +
            "        }," +
            "        axisLabel: {" +
            "            formatter: 'expr {value}'" +
            "        }," +
            "        splitLine: {" +
            "            show: false" +
            "        }" +
            "    }," +
            "    yAxis: {" +
            "        type: 'value'," +
            "        name: 'km/s minus 299,000'," +
            "        splitArea: {" +
            "            show: true" +
            "        }" +
            "    }," +
            "    series: [" +
            "        {" +
            "            name: 'boxplot'," +
            "            type: 'boxplot'," +
            "            data: data.boxData," +
            "            tooltip: {" +
            "                formatter: function (param) {" +
            "                    return [" +
            "                        'Experiment ' + param.name + ': '," +
            "                        'upper: ' + param.data[5]," +
            "                        'Q3: ' + param.data[4]," +
            "                        'median: ' + param.data[3]," +
            "                        'Q1: ' + param.data[2]," +
            "                        'lower: ' + param.data[1]" +
            "                    ].join('<br/>')" +
            "                }" +
            "            }" +
            "        }," +
            "        {" +
            "            name: 'outlier'," +
            "            type: 'scatter'," +
            "            data: data.outliers" +
            "        }" +
            "    ]" +
            "};",

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '箱线图',
                showName: "",
                name: "",
                text: "箱线图",
                textCombo: [],
                cls: "ECharts-Boxplot",
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
            newCombo = "text='箱线图'"
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

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Boxplot' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
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

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Boxplot'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
