/**
 * ECharts--主题河流图
 */
Ext.define('Cosmo.util.component.echarts.ECharts-ThemeRiver', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-ThemeRiver'],

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
            type: 'ECharts-ThemeRiver',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-ThemeRiver',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-ThemeRiver',
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
            "    tooltip: {" +
            "        trigger: 'axis'," +
            "        axisPointer: {" +
            "            type: 'line'," +
            "            lineStyle: {" +
            "                color: 'rgba(0,0,0,0.2)'," +
            "                width: 1," +
            "                type: 'solid'" +
            "            }" +
            "        }" +
            "    }," +
            "" +
            "    legend: {" +
            "        data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD']" +
            "    }," +
            "" +
            "    singleAxis: {" +
            "        top: 50," +
            "        bottom: 50," +
            "        axisTick: {}," +
            "        axisLabel: {}," +
            "        type: 'time'," +
            "        axisPointer: {" +
            "            animation: true," +
            "            label: {" +
            "                show: true" +
            "            }" +
            "        }," +
            "        splitLine: {" +
            "            show: true," +
            "            lineStyle: {" +
            "                type: 'dashed'," +
            "                opacity: 0.2" +
            "            }" +
            "        }" +
            "    }," +
            "" +
            "    series: [" +
            "        {" +
            "            type: 'themeRiver'," +
            "            itemStyle: {" +
            "                emphasis: {" +
            "                    shadowBlur: 20," +
            "                    shadowColor: 'rgba(0, 0, 0, 0.8)'" +
            "                }" +
            "            }," +
            "            data: [['2015/11/08',10,'DQ'],['2015/11/09',15,'DQ'],['2015/11/10',35,'DQ']," +
            "            ['2015/11/11',38,'DQ'],['2015/11/12',22,'DQ'],['2015/11/13',16,'DQ']," +
            "            ['2015/11/14',7,'DQ'],['2015/11/15',2,'DQ'],['2015/11/16',17,'DQ']," +
            "            ['2015/11/17',33,'DQ'],['2015/11/18',40,'DQ'],['2015/11/19',32,'DQ']," +
            "            ['2015/11/20',26,'DQ'],['2015/11/21',35,'DQ'],['2015/11/22',40,'DQ']," +
            "            ['2015/11/23',32,'DQ'],['2015/11/24',26,'DQ'],['2015/11/25',22,'DQ']," +
            "            ['2015/11/26',16,'DQ'],['2015/11/27',22,'DQ'],['2015/11/28',10,'DQ']," +
            "            ['2015/11/08',35,'TY'],['2015/11/09',36,'TY'],['2015/11/10',37,'TY']," +
            "            ['2015/11/11',22,'TY'],['2015/11/12',24,'TY'],['2015/11/13',26,'TY']," +
            "            ['2015/11/14',34,'TY'],['2015/11/15',21,'TY'],['2015/11/16',18,'TY']," +
            "            ['2015/11/17',45,'TY'],['2015/11/18',32,'TY'],['2015/11/19',35,'TY']," +
            "            ['2015/11/20',30,'TY'],['2015/11/21',28,'TY'],['2015/11/22',27,'TY']," +
            "            ['2015/11/23',26,'TY'],['2015/11/24',15,'TY'],['2015/11/25',30,'TY']," +
            "            ['2015/11/26',35,'TY'],['2015/11/27',42,'TY'],['2015/11/28',42,'TY']," +
            "            ['2015/11/08',21,'SS'],['2015/11/09',25,'SS'],['2015/11/10',27,'SS']," +
            "            ['2015/11/11',23,'SS'],['2015/11/12',24,'SS'],['2015/11/13',21,'SS']," +
            "            ['2015/11/14',35,'SS'],['2015/11/15',39,'SS'],['2015/11/16',40,'SS']," +
            "            ['2015/11/17',36,'SS'],['2015/11/18',33,'SS'],['2015/11/19',43,'SS']," +
            "            ['2015/11/20',40,'SS'],['2015/11/21',34,'SS'],['2015/11/22',28,'SS']," +
            "            ['2015/11/23',26,'SS'],['2015/11/24',37,'SS'],['2015/11/25',41,'SS']," +
            "            ['2015/11/26',46,'SS'],['2015/11/27',47,'SS'],['2015/11/28',41,'SS']," +
            "            ['2015/11/08',10,'QG'],['2015/11/09',15,'QG'],['2015/11/10',35,'QG']," +
            "            ['2015/11/11',38,'QG'],['2015/11/12',22,'QG'],['2015/11/13',16,'QG']," +
            "            ['2015/11/14',7,'QG'],['2015/11/15',2,'QG'],['2015/11/16',17,'QG']," +
            "            ['2015/11/17',33,'QG'],['2015/11/18',40,'QG'],['2015/11/19',32,'QG']," +
            "            ['2015/11/20',26,'QG'],['2015/11/21',35,'QG'],['2015/11/22',40,'QG']," +
            "            ['2015/11/23',32,'QG'],['2015/11/24',26,'QG'],['2015/11/25',22,'QG']," +
            "            ['2015/11/26',16,'QG'],['2015/11/27',22,'QG'],['2015/11/28',10,'QG']," +
            "            ['2015/11/08',10,'SY'],['2015/11/09',15,'SY'],['2015/11/10',35,'SY']," +
            "            ['2015/11/11',38,'SY'],['2015/11/12',22,'SY'],['2015/11/13',16,'SY']," +
            "            ['2015/11/14',7,'SY'],['2015/11/15',2,'SY'],['2015/11/16',17,'SY']," +
            "            ['2015/11/17',33,'SY'],['2015/11/18',40,'SY'],['2015/11/19',32,'SY']," +
            "            ['2015/11/20',26,'SY'],['2015/11/21',35,'SY'],['2015/11/22',4,'SY']," +
            "            ['2015/11/23',32,'SY'],['2015/11/24',26,'SY'],['2015/11/25',22,'SY']," +
            "            ['2015/11/26',16,'SY'],['2015/11/27',22,'SY'],['2015/11/28',10,'SY']," +
            "            ['2015/11/08',10,'DD'],['2015/11/09',15,'DD'],['2015/11/10',35,'DD']," +
            "            ['2015/11/11',38,'DD'],['2015/11/12',22,'DD'],['2015/11/13',16,'DD']," +
            "            ['2015/11/14',7,'DD'],['2015/11/15',2,'DD'],['2015/11/16',17,'DD']," +
            "            ['2015/11/17',33,'DD'],['2015/11/18',4,'DD'],['2015/11/19',32,'DD']," +
            "            ['2015/11/20',26,'DD'],['2015/11/21',35,'DD'],['2015/11/22',40,'DD']," +
            "            ['2015/11/23',32,'DD'],['2015/11/24',26,'DD'],['2015/11/25',22,'DD']," +
            "            ['2015/11/26',16,'DD'],['2015/11/27',22,'DD'],['2015/11/28',10,'DD']]" +
            "        }" +
            "    ]" +
            "};",

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '主题河流图',
                showName: "",
                name: "",
                text: "主题河流图",
                textCombo: [],
                cls: "ECharts-ThemeRiver",
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
            newCombo = "text='主题河流图'"
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

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-ThemeRiver' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
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

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-ThemeRiver'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
