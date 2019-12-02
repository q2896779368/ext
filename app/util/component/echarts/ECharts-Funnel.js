/**
 * ECharts--漏斗图
 */
Ext.define('Cosmo.util.component.echarts.ECharts-Funnel', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-Funnel'],

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
            type: 'ECharts-Funnel',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-Funnel',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-Funnel',
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
            "        text: '漏斗图'," +
            "        subtext: '纯属虚构'" +
            "    }," +
            "    tooltip: {" +
            "        trigger: 'item'," +
            "        formatter: \"{a} <br/>{b} : {c}%\"" +
            "    }," +
            "    toolbox: {" +
            "        feature: {" +
            "            dataView: {readOnly: false}," +
            "            restore: {}," +
            "            saveAsImage: {}" +
            "        }" +
            "    }," +
            "    legend: {" +
            "        data: ['展现','点击','访问','咨询','订单']" +
            "    }," +
            "    calculable: true," +
            "    series: [" +
            "        {" +
            "            name:'漏斗图'," +
            "            type:'funnel'," +
            "            left: '10%'," +
            "            top: 60," +
            // "            //x2: 80," +
            "            bottom: 60," +
            "            width: '80%'," +
            // "            // height: {totalHeight} - y - y2," +
            "            min: 0," +
            "            max: 100," +
            "            minSize: '0%'," +
            "            maxSize: '100%'," +
            "            sort: 'descending'," +
            "            gap: 2," +
            "            label: {" +
            "                normal: {" +
            "                    show: true," +
            "                    position: 'inside'" +
            "                }," +
            "                emphasis: {" +
            "                    textStyle: {" +
            "                        fontSize: 20" +
            "                    }" +
            "                }" +
            "            }," +
            "            labelLine: {" +
            "                normal: {" +
            "                    length: 10," +
            "                    lineStyle: {" +
            "                        width: 1," +
            "                        type: 'solid'" +
            "                    }" +
            "                }" +
            "            }," +
            "            itemStyle: {" +
            "                normal: {" +
            "                    borderColor: '#fff'," +
            "                    borderWidth: 1" +
            "                }" +
            "            }," +
            "            data: [" +
            "                {value: 60, name: '访问'}," +
            "                {value: 40, name: '咨询'}," +
            "                {value: 20, name: '订单'}," +
            "                {value: 80, name: '点击'}," +
            "                {value: 100, name: '展现'}" +
            "            ]" +
            "        }" +
            "    ]" +
            "};",

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '漏斗图',
                showName: "",
                name: "",
                text: "漏斗图",
                textCombo: [],
                cls: "ECharts-Funnel",
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
            newCombo = "text='漏斗图'"
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

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Funnel' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
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

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Funnel'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
