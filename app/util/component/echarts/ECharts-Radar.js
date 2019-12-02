/**
 * ECharts--雷达图
 */
Ext.define('Cosmo.util.component.echarts.ECharts-Radar', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-Radar'],

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
            type: 'ECharts-Radar',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-Radar',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-Radar',
            /** 元件创建时的初始化样式 */
            iconCls: '',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            code: "",

            optionJs: "",

            /** Echarts配置项 */
            option: "option = {" +
            "    title: {" +
            "        text: '基础雷达图'" +
            "    }," +
            "    tooltip: {}," +
            "    legend: {" +
            "        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']" +
            "    }," +
            "    radar: {" +
            // "        // shape: 'circle'," +
            "        name: {" +
            "            textStyle: {" +
            "                color: '#fff'," +
            "                backgroundColor: '#999'," +
            "                borderRadius: 3," +
            "                padding: [3, 5]" +
            "           }" +
            "        }," +
            "        indicator: [" +
            "           { name: '销售（sales）', max: 6500}," +
            "           { name: '管理（Administration）', max: 16000}," +
            "           { name: '信息技术（Information Techology）', max: 30000}," +
            "           { name: '客服（Customer Support）', max: 38000}," +
            "           { name: '研发（Development）', max: 52000}," +
            "           { name: '市场（Marketing）', max: 25000}" +
            "        ]" +
            "    }," +
            "    series: [{" +
            "        name: '预算 vs 开销（Budget vs spending）'," +
            "        type: 'radar'," +
            // "        // areaStyle: {normal: {}}," +
            "        data : [" +
            "            {" +
            "                value : [4300, 10000, 28000, 35000, 50000, 19000]," +
            "                name : '预算分配（Allocated Budget）'" +
            "            }," +
            "             {" +
            "                value : [5000, 14000, 28000, 31000, 42000, 21000]," +
            "                name : '实际开销（Actual Spending）'" +
            "            }" +
            "        ]" +
            "    }]" +
            "};",

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '雷达图',
                showName: "",
                name: "",
                text: "雷达图",
                textCombo: [],
                cls: "ECharts-Radar",
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
            newCombo = "text='雷达图'"
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

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Radar' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
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

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Radar'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
