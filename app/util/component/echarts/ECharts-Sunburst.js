/**
 * ECharts--阳爆图
 */
Ext.define('Cosmo.util.component.echarts.ECharts-Sunburst', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.ECharts-Sunburst'],

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
            type: 'ECharts-Sunburst',
            /** 别名（Cosui元件名称） */
            alias: 'ECharts-Sunburst',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'ECharts-Sunburst',
            /** 元件创建时的初始化样式 */
            iconCls: '',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            code: "",

            optionJs: " var colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];" +
            "var bgColor = '#2E2733';" +
            "" +
            "var itemStyle = {" +
            "    star5: {" +
            "        color: colors[0]" +
            "    }," +
            "    star4: {" +
            "        color: colors[1]" +
            "    }," +
            "    star3: {" +
            "        color: colors[2]" +
            "    }," +
            "    star2: {" +
            "        color: colors[3]" +
            "    }" +
            "};" +
            "" +
            "var data = [{" +
            "    name: '虚构'," +
            "    itemStyle: {" +
            "        normal: {" +
            "            color: colors[1]" +
            "        }" +
            "    }," +
            "    children: [{" +
            "        name: '小说'," +
            "        children: [{" +
            "            name: '5☆'," +
            "            children: [{" +
            "                name: '疼'" +
            "            }, {" +
            "                name: '慈悲'" +
            "            }, {" +
            "                name: '楼下的房客'" +
            "            }]" +
            "        }, {" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: '虚无的十字架'" +
            "            }, {" +
            "                name: '无声告白'" +
            "            }, {" +
            "                name: '童年的终结'" +
            "            }]" +
            "        }, {" +
            "            name: '3☆'," +
            "            children: [{" +
            "                name: '疯癫老人日记'" +
            "            }]" +
            "        }]" +
            "    }, {" +
            "        name: '其他'," +
            "        children: [{" +
            "            name: '5☆'," +
            "            children: [{" +
            "                name: '纳博科夫短篇小说全集'" +
            "            }]" +
            "        }, {" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: '安魂曲'" +
            "            }, {" +
            "                name: '人生拼图版'" +
            "            }]" +
            "        }, {" +
            "            name: '3☆'," +
            "            children: [{" +
            "                name: '比起爱你，我更需要你'" +
            "            }]" +
            "        }]" +
            "    }]" +
            "}, {" +
            "    name: '非虚构'," +
            "    itemStyle: {" +
            "        color: colors[2]" +
            "    }," +
            "    children: [{" +
            "        name: '设计'," +
            "        children: [{" +
            "            name: '5☆'," +
            "            children: [{" +
            "                name: '无界面交互'" +
            "            }]" +
            "        }, {" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: '数字绘图的光照与渲染技术'" +
            "            }, {" +
            "                name: '日本建筑解剖书'" +
            "            }]" +
            "        }, {" +
            "            name: '3☆'," +
            "            children: [{" +
            "                name: '奇幻世界艺术\\n&RPG地图绘制讲座'" +
            "            }]" +
            "        }]" +
            "    }, {" +
            "        name: '社科'," +
            "        children: [{" +
            "            name: '5☆'," +
            "            children: [{" +
            "                name: '痛点'" +
            "            }]" +
            "        }, {" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: '卓有成效的管理者'" +
            "            }, {" +
            "                name: '进化'" +
            "            }, {" +
            "                name: '后物欲时代的来临'," +
            "            }]" +
            "        }, {" +
            "            name: '3☆'," +
            "            children: [{" +
            "                name: '疯癫与文明'" +
            "            }]" +
            "        }]" +
            "    }, {" +
            "        name: '心理'," +
            "        children: [{" +
            "            name: '5☆'," +
            "            children: [{" +
            "                name: '我们时代的神经症人格'" +
            "            }]" +
            "        }, {" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: '皮格马利翁效应'" +
            "            }, {" +
            "                name: '受伤的人'" +
            "            }]" +
            "        }, {" +
            "            name: '3☆'," +
            "        }, {" +
            "            name: '2☆'," +
            "            children: [{" +
            "                name: '迷恋'" +
            "            }]" +
            "        }]" +
            "    }, {" +
            "        name: '居家'," +
            "        children: [{" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: '把房子住成家'" +
            "            }, {" +
            "                name: '只过必要生活'" +
            "            }, {" +
            "                name: '北欧简约风格'" +
            "            }]" +
            "        }]" +
            "    }, {" +
            "        name: '绘本'," +
            "        children: [{" +
            "            name: '5☆'," +
            "            children: [{" +
            "                name: '设计诗'" +
            "            }]" +
            "        }, {" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: '假如生活糊弄了你'" +
            "            }, {" +
            "                name: '博物学家的神秘动物图鉴'" +
            "            }]" +
            "        }, {" +
            "            name: '3☆'," +
            "            children: [{" +
            "                name: '方向'" +
            "            }]" +
            "        }]" +
            "    }, {" +
            "        name: '哲学'," +
            "        children: [{" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: '人生的智慧'" +
            "            }]" +
            "        }]" +
            "    }, {" +
            "        name: '技术'," +
            "        children: [{" +
            "            name: '5☆'," +
            "            children: [{" +
            "                name: '代码整洁之道'" +
            "            }]" +
            "        }, {" +
            "            name: '4☆'," +
            "            children: [{" +
            "                name: 'Three.js 开发指南'" +
            "            }]" +
            "        }]" +
            "    }]" +
            "}];" +
            "" +
            "for (var j = 0; j < data.length; ++j) {" +
            "    var level1 = data[j].children;" +
            "    for (var i = 0; i < level1.length; ++i) {" +
            "        var block = level1[i].children;" +
            "        var bookScore = [];" +
            "        var bookScoreId;" +
            "        for (var star = 0; star < block.length; ++star) {" +
            "            var style = (function (name) {" +
            "                switch (name) {" +
            "                    case '5☆':" +
            "                        bookScoreId = 0;" +
            "                        return itemStyle.star5;" +
            "                    case '4☆':" +
            "                        bookScoreId = 1;" +
            "                        return itemStyle.star4;" +
            "                    case '3☆':" +
            "                        bookScoreId = 2;" +
            "                        return itemStyle.star3;" +
            "                    case '2☆':" +
            "                        bookScoreId = 3;" +
            "                        return itemStyle.star2;" +
            "                }" +
            "            })(block[star].name);" +
            "" +
            "            block[star].label = {" +
            "                color: style.color," +
            "                downplay: {" +
            "                    opacity: 0.5" +
            "                }" +
            "            };" +
            "" +
            "            if (block[star].children) {" +
            "                style = {" +
            "                    opacity: 1," +
            "                    color: style.color" +
            "                };" +
            "                block[star].children.forEach(function (book) {" +
            "                    book.value = 1;" +
            "                    book.itemStyle = style;" +
            "" +
            "                    book.label = {" +
            "                        color: style.color" +
            "                    };" +
            "" +
            "                    var value = 1;" +
            "                    if (bookScoreId === 0 || bookScoreId === 3) {" +
            "                        value = 5;" +
            "                    }" +
            "" +
            "                    if (bookScore[bookScoreId]) {" +
            "                        bookScore[bookScoreId].value += value;" +
            "                    }" +
            "                    else {" +
            "                        bookScore[bookScoreId] = {" +
            "                            color: colors[bookScoreId]," +
            "                            value: value" +
            "                        };" +
            "                    }" +
            "                });" +
            "            }" +
            "        }" +
            "" +
            "        level1[i].itemStyle = {" +
            "            color: data[j].itemStyle.color" +
            "        };" +
            "    }" +
            "}",

            /** Echarts配置项 */
            option: "option = {" +
            "    backgroundColor: bgColor," +
            "    color: colors," +
            "    series: [{" +
            "        type: 'sunburst'," +
            "        center: ['50%', '48%']," +
            "        data: data," +
            "        sort: function (a, b) {" +
            "            if (a.depth === 1) {" +
            "                return b.getValue() - a.getValue();" +
            "            }" +
            "            else {" +
            "                return a.dataIndex - b.dataIndex;" +
            "            }" +
            "        }," +
            "        label: {" +
            "            rotate: 'radial'," +
            "            color: bgColor" +
            "        }," +
            "        itemStyle: {" +
            "            borderColor: bgColor," +
            "            borderWidth: 2" +
            "        }," +
            "        levels: [{}, {" +
            "            r0: 0," +
            "            r: 40," +
            "            label: {" +
            "                rotate: 0" +
            "            }" +
            "        }, {" +
            "            r0: 40," +
            "            r: 105" +
            "        }, {" +
            "            r0: 115," +
            "            r: 140," +
            "            itemStyle: {" +
            "                shadowBlur: 2," +
            "                shadowColor: colors[2]," +
            "                color: 'transparent'" +
            "            }," +
            "            label: {" +
            "                rotate: 'tangential'," +
            "                fontSize: 10," +
            "                color: colors[0]" +
            "            }" +
            "        }, {" +
            "            r0: 140," +
            "            r: 145," +
            "            itemStyle: {" +
            "                shadowBlur: 80," +
            "                shadowColor: colors[0]" +
            "            }," +
            "            label: {" +
            "                position: 'outside'," +
            "                textShadowBlur: 5," +
            "                textShadowColor: '#333'," +
            "            }," +
            "            downplay: {" +
            "                label: {" +
            "                    opacity: 0.5" +
            "                }" +
            "            }" +
            "        }]" +
            "    }]" +
            "};",

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',        // Cosui元件属性data-options字符串
                options: [],            // XML配置属性
                type: '阳爆图',
                showName: "",
                name: "",
                text: "阳爆图",
                textCombo: [],
                cls: "ECharts-Sunburst",
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
            newCombo = "text='阳爆图'"
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

        var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Sunburst' id='" + this.id + this.type + "' data-options='" + dataOptions + "'></div>";
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

            var html = "<div style='width:100%;height:100%' " + newCombo + " class='ECharts-Sunburst'  id='" + activeId + type + "' data-options='" + dataOptions + "'></div>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
