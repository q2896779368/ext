/**
 * ECharts--地图
 */
Ext.define('Cosmo.util.component.echarts.ECharts-Map', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-Map'],

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
            type: 'ECharts-Map',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-Map',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-Map',
            /** 元件创建时的初始化样式 */
            iconCls: '',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            code: "",

            optionJs: "",

            /** Echarts配置项 */
            option: "var china = \"resources/plugin/echarts/map/json/china.json\";" +
            "        echarts.extendsMap = function(id, opt) {" +
            "            var curGeoJson = {};" +
            "            var cityToPinyin = {" +
            "                '中国': 'china', '上海': 'shanghai', '河北': 'hebei', '山西': 'shanxi', '内蒙古': 'neimenggu'," +
            "                '辽宁': 'liaoning', '吉林': 'jilin', '黑龙江': 'heilongjiang', '江苏': 'jiangsu', '浙江': 'zhejiang'," +
            "                '安徽': 'anhui', '福建': 'fujian', '江西': 'jiangxi', '山东': 'shandong', '河南': 'henan'," +
            "                '湖北': 'hubei', '湖南': 'hunan', '广东': 'guangdong', '广西': 'guangxi', '海南': 'hainan'," +
            "                '四川': 'sichuan', '贵州': 'guizhou', '云南': 'yunnan', '西藏': 'xizang', '陕西': 'shanxi'," +
            "                '甘肃': 'gansu', '青海': 'qinghai', '宁夏': 'ningxia', '新疆': 'xinjiang', '北京': 'beijing'," +
            "                '天津': 'tianjin', '重庆': 'chongqing', '香港': 'xianggang', '澳门': 'aomen', '台湾': 'taiwan'" +
            "            };" +
            "            var defaultOpt = {" +
            "                mapName: 'china', " + // 地图展示
            "                goDown: false, " + // 是否下钻
            "                bgColor: '#404a59', " + // 画布背景色
            "                activeArea: [], " + // 区域高亮,同echarts配置项
            "                data: []," +
            "                callback: function(name, option, instance) {}" + // 下钻回调(点击的地图名、实例对象option、实例对象)
            "            };" +
            "            if (opt) opt = this.util.extend(defaultOpt, opt);" +
            "            var optname = [opt.mapName];" +// 层级索引
            "            var idx = 0;" +
            "            var pos = {" +
            "                leftPlus: 115," +
            "                leftCur: 140," +
            "                left: 198," +
            "                top: 50" +
            "            };" +
            "            var line = [" +
            "                [0, 0]," +
            "                [8, 11]," +
            "                [0, 22]" +
            "            ];" +
            "            var style = {" +
            "                font: '18px \"Microsoft YaHei\", sans-serif'," +
            "                textColor: '#eee'," +
            "                lineColor: 'rgba(147, 235, 248, .8)'" +
            "            };" +
            "            var handleEvents = {" +
            "                resetOption: function(myChart, option, name) {" +
            "                    var breadcrumb = this.createBreadcrumb(name);" +
            "                    var j = optname.indexOf(name);" +
            "                    var l = option.graphic.length;" +
            "                    if (j < 0) {" +
            "                        option.graphic.push(breadcrumb);" +
            "                        option.graphic[0].children[0].shape.x2 = 145;" +
            "                        option.graphic[0].children[1].shape.x2 = 145;" +
            "                        if (option.graphic.length > 2) {" +
            "                            var cityData = [];" +
            "                            var cityJson;" +
            "                            for (var x = 0; x < opt.data.length; x++) {" +
            "                                if (name === opt.data[x].city) {" +
            "                                    $([opt.data[x]]).each(function(index, data) {" +
            "                                        cityJson = {" +
            "                                            city: data.city," +
            "                                            name: data.name," +
            "                                            value: data.value," +
            "                                            crew: data.crew," +
            "                                            company: data.company," +
            "                                            position: data.position," +
            "                                            region: data.region" +
            "                                        };" +
            "                                        cityData.push(cityJson)" +
            "                                    })" +
            "                                }" +
            "                            }" +
            "                        }" +
            "                        optname.push(name);" +
            "                        idx++;" +
            "                    } else {" +
            "                        option.graphic.splice(j + 2, l);" +
            "                        if (option.graphic.length <= 2) {" +
            "                            option.graphic[0].children[0].shape.x2 = 60;" +
            "                            option.graphic[0].children[1].shape.x2 = 60;" +
            "                        }" +
            "                        optname.splice(j + 1, l);" +
            "                        idx = j;" +
            "                        pos.leftCur -= pos.leftPlus * (l - j - 1);" +
            "                    }" +
            "                    option.geo.map = name;" +
            "                    option.geo.zoom = 0.4;" +
            "                    myChart.clear();" +
            "                    myChart.setOption(option);" +
            "                    this.zoomAnimation();" +
            "                    opt.callback(name, option, myChart);" +
            "                }," +
            "                createBreadcrumb: function(name) {" + //name 地图名
            "                    var breadcrumb = {" +
            "                        type: 'group'," +
            "                        id: name," +
            "                        left: pos.leftCur + pos.leftPlus," +
            "                        top: pos.top + 5," +
            "                        children: [{" +
            "                            type: 'polyline'," +
            "                            left: -90," +
            "                            top: -5," +
            "                            shape: {" +
            "                                points: line" +
            "                            }," +
            "                            style: {" +
            "                                stroke: '#fff'," +
            "                                key: name" +
            "                            }," +
            "                            onclick: function() {" +
            "                                var name = this.style.key;" +
            "                                handleEvents.resetOption(myChart, option, name);" +
            "                            }" +
            "                        }, {" +
            "                            type: 'text'," +
            "                            left: -68," +
            "                            top: 'middle'," +
            "                            style: {" +
            "                                text: name," +
            "                                textAlign: 'center'," +
            "                                fill: style.textColor," +
            "                                font: style.font" +
            "                            }," +
            "                            onclick: function() {" +
            "                                var name = this.style.text;" +
            "                                handleEvents.resetOption(myChart, option, name);" +
            "                            }" +
            "                        }, {" +
            "                            type: 'text'," +
            "                            left: -68," +
            "                            top: 10," +
            "                            style: {" +
            "                                name: name," +
            "                                text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : ''," +
            "                                textAlign: 'center'," +
            "                                fill: style.textColor," +
            "                                font: '12px \"Microsoft YaHei\", sans-serif'" +
            "                            }," +
            "                            onclick: function() {" +
            "                                var name = this.style.name;" +
            "                                handleEvents.resetOption(myChart, option, name);" +
            "                            }" +
            "                        }]" +
            "                    };" +
            "                    pos.leftCur += pos.leftPlus;" +
            "                    return breadcrumb;" +
            "                }," +
            "" +
            "                zoomAnimation: function() {" +
            "                    var count = null;" +
            "                    var zoom = function(per) {" +
            "                        if (!count) count = per;" +
            "                        count = count + per;" +
            "                        myChart.setOption({" +
            "                            geo: {" +
            "                                zoom: count" +
            "                            }" +
            "                        });" +
            "                        if (count < 1) window.requestAnimationFrame(function() {" +
            "                            zoom(0.2);" +
            "                        });" +
            "                    };" +
            "                    window.requestAnimationFrame(function() {" +
            "                        zoom(0.2);" +
            "                    });" +
            "                }" +
            "            };" +
            "" +
            "            var option = {" +
            "                backgroundColor: opt.bgColor," +
            "                tooltip: {}," +
            "                graphic: [{" +
            "                    type: 'group'," +
            "                    left: pos.left - 10," +
            "                    top: pos.top - 2," +
            "                    children: [{" +
            "                        type: 'line'," +
            "                        left: 0," +
            "                        top: -20," +
            "                        shape: {" +
            "                            x1: 0," +
            "                            y1: 0," +
            "                            x2: 60," +
            "                            y2: 0" +
            "                        }," +
            "                        style: {" +
            "                            stroke: style.lineColor" +
            "                        }" +
            "                    }, {" +
            "                        type: 'line'," +
            "                        left: 0," +
            "                        top: 20," +
            "                        shape: {" +
            "                            x1: 0," +
            "                            y1: 0," +
            "                            x2: 60," +
            "                            y2: 0" +
            "                        }," +
            "                        style: {" +
            "                            stroke: style.lineColor" +
            "                        }" +
            "                    }]" +
            "                }," +
            "                    {" +
            "                        id: name[idx]," +
            "                        type: 'group'," +
            "                        left: pos.left + 2," +
            "                        top: pos.top," +
            "                        children: [{" +
            "                            type: 'polyline'," +
            "                            left: 90," +
            "                            top: -12," +
            "                            shape: {" +
            "                                points: line" +
            "                            }," +
            "                            style: {" +
            "                                stroke: 'transparent'," +
            "                                key: name[0]" +
            "                            }," +
            "                            onclick: function() {" +
            "                                var name = this.style.key;" +
            "                                handleEvents.resetOption(myChart, option, name);" +
            "                            }" +
            "                        }, {" +
            "                            type: 'text'," +
            "                            left: 0," +
            "                            top: 'middle'," +
            "                            style: {" +
            "                                text: '中国'," +
            "                                textAlign: 'center'," +
            "                                fill: style.textColor," +
            "                                font: style.font" +
            "                            }," +
            "                            onclick: function() {" +
            "                                handleEvents.resetOption(myChart, option, '中国');" +
            "                            }" +
            "                        }, {" +
            "                            type: 'text'," +
            "                            left: 0," +
            "                            top: 10," +
            "                            style: {" +
            "                                text: 'China'," +
            "                                textAlign: 'center'," +
            "                                fill: style.textColor," +
            "                                font: '12px , sans-serif'" +
            "                            }," +
            "                            onclick: function() {" +
            "                                handleEvents.resetOption(myChart, option, '中国');" +
            "                            }" +
            "                        }]" +
            "                    }" +
            "                ]," +
            "                geo: {" +
            "                    map: opt.mapName," +
            "                    roam: true," +
            "                    zoom: 1," +
            "                    label: {" +
            "                        normal: {" +
            "                            show: true," +
            "                            textStyle: {" +
            "                                color: '#fff'" +
            "                            }" +
            "                        }," +
            "                        emphasis: {" +
            "                            textStyle: {" +
            "                                color: '#fff'" +
            "                            }" +
            "                        }" +
            "                    }," +
            "                    itemStyle: {" +
            "                        normal: {" +
            "                            borderColor: 'rgba(147, 235, 248, 1)'," +
            "                            borderWidth: 1," +
            "                            areaColor: {" +
            "                                type: 'radial'," +
            "                                x: 0.5," +
            "                                y: 0.5," +
            "                                r: 0.8," +
            "                                colorStops: [{" +
            "                                    offset: 0," +
            "                                    color: 'rgba(147, 235, 248, 0)' " +// 0% 处的颜色
            "                                }, {" +
            "                                    offset: 1," +
            "                                    color: 'rgba(147, 235, 248, .2)' " +// 100% 处的颜色
            "                                }]," +
            "                                globalCoord: false " +// 缺省为 false
            "                            }," +
            "                            shadowColor: 'rgba(128, 217, 248, 1)'," +
            "                            shadowOffsetX: -2," +
            "                            shadowOffsetY: 2," +
            "                            shadowBlur: 10" +
            "                        }," +
            "                        emphasis: {" +
            "                            areaColor: '#389BB7'," +
            "                            borderWidth: 0" +
            "                        }" +
            "                    }," +
            "                    regions: opt.activeArea.map(function(item) {" +
            "                        if (typeof item !== 'string') {" +
            "                            return {" +
            "                                name: item.name," +
            "                                itemStyle: {" +
            "                                    normal: {" +
            "                                        areaColor: item.areaColor || '#389BB7'" +
            "                                    }" +
            "                                }," +
            "                                label: {" +
            "                                    normal: {" +
            "                                        show: item.showLabel," +
            "                                        textStyle: {" +
            "                                            color: '#fff'" +
            "                                        }" +
            "                                    }" +
            "                                }" +
            "                            }" +
            "                        } else {" +
            "                            return {" +
            "                                name: item," +
            "                                itemStyle: {" +
            "                                    normal: {" +
            "                                        borderColor: '#91e6ff'," +
            "                                        areaColor: '#389BB7'" +
            "                                    }" +
            "                                }" +
            "                            }" +
            "                        }" +
            "                    })" +
            "                }," +
            "                series: [{" +
            "                    type: 'effectScatter'," +
            "                    coordinateSystem: 'geo'," +
            "                    showEffectOn: 'render'," +
            "                    rippleEffect: {" +
            "                        period: 15," +
            "                        scale: 4," +
            "                        brushType: 'fill'" +
            "                    }," +
            "                    hoverAnimation: true," +
            "                    itemStyle: {" +
            "                        normal: {" +
            "                            color: '#FFC848'," +
            "                            shadowBlur: 10," +
            "                            shadowColor: '#333'" +
            "                        }" +
            "                    }" +
            "                }]" +
            "            };" +
            "            myChart.setOption(option);" +
            "            myChart.on('click', function(params) {" + // 添加事件
            "                var _self = this;" +
            "                if (opt.goDown && params.name !== name[idx]) {" +
            "                    if (cityToPinyin[params.name]) {" +
            "                        var url = \"resources/plugin/echarts/map/json/province/\" + cityToPinyin[params.name].toLowerCase() + \".json\";" +
            "                        if(params.name.indexOf(\"中国\") >= 0) url = china;" +
            "                        $.get(url, function(response) {" +
            "                            curGeoJson = response;" +
            "                            echarts.registerMap(params.name, response);" +
            "                            handleEvents.resetOption(_self, option, params.name);" +
            "                        });" +
            "                    }" +
            "                }" +
            "            });" +
            "            myChart.setMap = function(mapName) {" +
            "                var _self = this;" +
            "                if (mapName.indexOf('市') < 0) mapName = mapName + '市';" +
            "                var citySource = \"resources/plugin/echarts/map/json/province/\" + cityToPinyin[params.name].toLowerCase() + \".json\";" +
            "                if(params.name.indexOf(\"中国\") >= 0) citySource = china;" +
            "                if (citySource) {" +
            "                    var url = './map/' + citySource + '.json';" +
            "                    $.get(url, function(response) {" +
            "                        curGeoJson = response;" +
            "                        echarts.registerMap(mapName, response);" +
            "                        handleEvents.resetOption(_self, option, mapName);" +
            "                    });" +
            "                }" +
            "" +
            "            };" +
            "            return myChart;" +
            "        };" +
            "        $.getJSON(china, function(geoJson) {" +
            "            echarts.registerMap('中国', geoJson);" +
            "            echarts.extendsMap('chart-panel', {" +
            "                bgColor: '#154e90', " +// 画布背景色
            "                mapName: '中国', " +// 地图名
            "                goDown: true, " +// 是否下钻
            "                callback: function(name, option, instance) {" +// 下钻回调
            "                }," +
            "                data: []" +// 数据展示"
            "            });" +
            "        });" ,

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '地图',
                showName: "",
                name: "",
                text: "地图",
                textCombo: [],
                cls: "ECharts-Map",
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
            newCombo = "text='地图'"
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

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Map' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
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

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Map'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
