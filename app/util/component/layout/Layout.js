/**
 * 元件--布局
 */
Ext.define('Cosmo.util.component.layout.Layout', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.Layout'],

    requires: ['Ext.dom.Helper'],

    /** 构造函数 */
    constructor: function () {
        var _config = {
            /** 元件ID */
            id: '',
            /** 标识 */
            marking: '',
            /** 元件显示/隐藏 */
            display: true,
            /** 元件锁定/解锁 */
            lock: false,
            /** 元件类型 */
            type: 'layout',
            /** 别名（Cosui元件名称） */
            alias: 'layout',
            /** Cosui布局 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'cosui-layout',
            /** 元件创建时的初始化样式 */
            iconCls: 'layout',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            /** 初始化属性 */
            property: {
                group:'',
                groups:'',
                dataOptions: '',
                options: [],
                textCombo: [],
                loadTip: '',
                type: '布局',
                showName: "",
                name: "",
                text: "布局面板",
                cls: "layout",
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
                left: "",
                top: "",
                width: "600",
                height: "400",
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
            },
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
        var newCombo = "",cls = "";
        //判断是新建还是打开已保存的
        var href = "";
        if (combo == undefined) {
            newCombo = "title='基础面板'"
        } else {
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[0] == "href") {
                    // 提取href格式和修改href
                    if (href = combo[i].split("=")[1].indexOf(".d") != -1) {
                        href = window.location.href + "#brower?path=" + combo[i].split("=")[1]
                    } else {
                        href = combo[i].split("=")[1];
                    }

                } else {
                    if (combo[i].split("=")[1] != "cosmonull") {
                        newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                    }
                    if (combo[i].split("=")[0] == "cls") {
                        cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                    }
                }
            }
        }

        // var defatulClassStr = "";
        // if (this.property.cls != "")
        //     defatulClassStr = this.property.cls;
        // else
        //     defatulClassStr = this.iconCls;

        // console.log(newCombo)
        if (href == "") {
            var html = "<div class='cosui-layout "+ cls+"' id='"+this.id+this.type+"'  " + newCombo + " style='width:100%;height:100%;' data-options='" + dataOptions + "'>" +
                "<div data-options=\"region:'north',split:true \"  style=\"height:50px\"></div>" +
                "<div data-options=\"region:'south',split:true \"  style=\"height:50px;\"></div>" +
                "<div data-options=\"region:'east',split:true,title:'东'\"    style=\"width:100px;\"></div>" +
                "<div data-options=\"region:'west',split:true,title:'西'\"    style=\"width:100px;\"></div>" +
                "<div data-options=\"region:'center',title:'中央标题',iconCls:'icon-ok'\"></div>" +
                "<div region='center' " + newCombo +  "  data-options='" + dataOptions + "'></div>" +
            "</div>"
        } else {
            var html = "<div class='cosui-layout "+ cls+"' id='"+this.id+this.type+"'  " + newCombo + " style='width:100%;height:100%;' data-options='" + dataOptions + "'>" +
                "<iframe id = 'A'   allowtransparency='yes'  scrolling='auto' frameborder='0'  src='" + href + "' style='width:100%;height:100%;'>" +
                "</div>"
        }

        var footer = "<div id='footer' style='padding:5px;width:100%;'>Footer Content.</div>"
        if (dataOptions && dataOptions.indexOf('footer:"#footer"') != -1) {
            html = html + footer

        }
        var proxy = {
            tag: 'div',
            id: this.id,
            cmpType: this.type,
            style: 'position:absolute;padding:0!important;margin:0!important;left:' + left + 'px;top:' + top
            + 'px;width:' + this.style.width + 'px;height:'
            + this.style.height + 'px;font-size:' + this.style.fontSize
            + 'px;z-index:' + this.style.zIndex,
            // cls: defatulClassStr,
            cls: "contentBox",
            html: html
        };
        this.setXY(left, top);
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
            var dataOptions = page.items[activeId].property.dataOptions;
            var combo = page.items[activeId].property.textCombo;
            var newCombo = "",cls = "";
            var href = "";
            // 修改textCombo格式
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[0] == "href" && combo[i].split("=")[1] != "从URL读取远程数据并且显示到面板。注意：内容将不会被载入，直到面板打开或扩大，在创建延迟加载面板时是非常有用的。") {
                    // 提取href格式和修改href
                    if (href = combo[i].split("=")[1].indexOf(".dds") != -1) {
                        href = window.location.href + "#brower?path=" + combo[i].split("=")[1]
                    } else {
                        href = combo[i].split("=")[1];
                    }

                } else {
                    if (combo[i].split("=")[1] != "cosmonull") {
                        if (combo[i].split("=")[0] != "href") {
                            newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                        }
                    }
                    if (combo[i].split("=")[0] == "cls") {
                        cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                    }
                }
            }
            if (href == "") {
                var html = "<div class='cosui-layout "+ cls+"' id='"+activeId+type+"'  " + newCombo + " style='width:100%;height:100%;' data-options='" + dataOptions + "'>" +

                    "<div  style=\"height:50px\"  region='north' "  + newCombo +  "  data-options='" + dataOptions + "'></div>" +
                    "<div  style=\"height:50px\"  region='south' "  + newCombo +  "  data-options='" + dataOptions + "'></div>" +
                    "<div  style=\"width:100px\" region='east' "   + newCombo +  "  data-options='" + dataOptions + "'></div>" +
                    "<div  style=\"width:100px\" region='west' "   + newCombo +  "  data-options='" + dataOptions + "'></div>" +
                    "<div                         region='center' " + newCombo +  "  data-options='" + dataOptions + "'></div>" +

                    "</div>"
            } else {
                var html = "<div class='cosui-layout "+ cls+"' id='"+activeId+type+"'  " + newCombo + " style='width:100%;height:100%;' data-options='" + dataOptions + "'>" +
                    "<iframe id = 'A'   allowtransparency='yes'  scrolling='auto' frameborder='0'  src='" + href + "' style='width:100%;height:100%;'>" +
                    "</div>"
            }
            page.items[activeId].html = html;

            Ext.getCmp('rightStyle').getController().handleEvents();
            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);

            var domProxy = Ext.dom.Helper.createDom(html);
            return domProxy;
        }
    }
});
