/**
 * ECharts--字符云
 */
Ext.define('Cosmo.util.component.echarts.ECharts-Wordcloud', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-Wordcloud'],

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
            type: 'ECharts-Wordcloud',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-Wordcloud',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-Wordcloud',
            /** 元件创建时的初始化样式 */
            iconCls: '',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            /** ECharts 代码 */
            code:  "",

            optionJs: "",

            /** Echarts配置项 */
            option: "option = {" +
            "                tooltip: {}," +
            "                series: [ {" +
            "                    type: 'wordCloud'," +
            "                    gridSize: 2," +
            "                    sizeRange: [12, 50]," +
            "                    rotationRange: [-90, 90]," +
            "                    shape: 'pentagon'," +
            "                    width: 600," +
            "                    height: 400," +
            "                    textStyle: {" +
            "                        normal: {" +
            "                            color: function () {" +
            "                                return 'rgb(' + [" +
            "                                    Math.round(Math.random() * 160)," +
            "                                    Math.round(Math.random() * 160)," +
            "                                    Math.round(Math.random() * 160)" +
            "                                ].join(',') + ')';" +
            "                            }" +
            "                        }," +
            "                        emphasis: {" +
            "                            shadowBlur: 10," +
            "                            shadowColor: '#333'" +
            "                        }" +
            "                    }," +
            "                    data: [" +
            "                        {" +
            "                            name: 'Sam S Club'," +
            "                            value: 10000," +
            "                            textStyle: {" +
            "                                normal: {" +
            "                                    color: 'black'" +
            "                                }," +
            "                                emphasis: {" +
            "                                    color: 'red'" +
            "                                }" +
            "                            }" +
            "                        }," +
            "                        {" +
            "                            name: 'Macys'," +
            "                            value: 6181" +
            "                        }," +
            "                        {" +
            "                            name: 'Amy Schumer'," +
            "                            value: 4386" +
            "                        }," +
            "                        {" +
            "                            name: 'Jurassic World'," +
            "                            value: 4055" +
            "                        }," +
            "                        {" +
            "                            name: 'Charter Communications'," +
            "                            value: 2467" +
            "                        }," +
            "                        {" +
            "                            name: 'Chick Fil A'," +
            "                            value: 2244" +
            "                        }," +
            "                        {" +
            "                            name: 'Planet Fitness'," +
            "                            value: 1898" +
            "                        }," +
            "                        {" +
            "                            name: 'Pitch Perfect'," +
            "                            value: 1484" +
            "                        }," +
            "                        {" +
            "                            name: 'Express'," +
            "                            value: 1112" +
            "                        }," +
            "                        {" +
            "                            name: 'Home'," +
            "                            value: 965" +
            "                        }," +
            "                        {" +
            "                            name: 'Johnny Depp'," +
            "                            value: 847" +
            "                        }," +
            "                        {" +
            "                            name: 'Lena Dunham'," +
            "                            value: 582" +
            "                        }," +
            "                        {" +
            "                            name: 'Lewis Hamilton'," +
            "                            value: 555" +
            "                        }," +
            "                        {" +
            "                            name: 'KXAN'," +
            "                            value: 550" +
            "                        }," +
            "                        {" +
            "                            name: 'Mary Ellen Mark'," +
            "                            value: 462" +
            "                        }," +
            "                        {" +
            "                            name: 'Farrah Abraham'," +
            "                            value: 366" +
            "                        }," +
            "                        {" +
            "                            name: 'Rita Ora'," +
            "                            value: 360" +
            "                        }," +
            "                        {" +
            "                            name: 'Serena Williams'," +
            "                            value: 282" +
            "                        }," +
            "                        {" +
            "                            name: 'NCAA baseball tournament'," +
            "                            value: 273" +
            "                        }," +
            "                        {" +
            "                            name: 'Point Break'," +
            "                            value: 265" +
            "                        }" +
            "                    ]" +
            "                } ]" +
            "            };",

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '字符云',
                showName: "",
                name: "",
                text: "字符云",
                textCombo: [],
                cls: "ECharts-Wordcloud",
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
                borderWidth: "1",
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
            newCombo = "text='字符云'"
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

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Wordcloud' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
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

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Wordcloud'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
