/**
 * 元件--矩形
 */
Ext.define('Cosmo.util.component.rectangle.Rectangle', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.Rectangle'],

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
            type: 'rectangle',
            /** 别名（Cosui元件名称） */
            alias: 'rectangle',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'cosui-rectangle',
            /** 元件创建时的初始化样式 */
            iconCls: 'rectangle',

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
                type: '矩形',
                showName: "",
                name: "",
                text: "矩形",
                cls: "rectangle",
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
                width: "300",
                height: "170",
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
                eleRotation:"0",

                /** 文字角度 */
                textRotation:"0",

                /** 引用样式类名 */
                quoteName:'',

                /** 回显存入样式*/
                echoStyle:{}
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
        if (combo == undefined) {
            newCombo = "title='基础面板'"
        } else {
            for (var i = 0; i < combo.length; i++) {
                if(combo[i].split("=")[1]!="cosmonull"){
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                }
                if (combo[i].split("=")[0] == "cls") {
                    cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                }
            }
        }

        var html ="<div class='rectangle "+ cls+"' id='"+this.id+this.type+"' style='width:100%;height:100%; border:1px solid #ddd'></div>"  ;

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

                if (combo[i].split("=")[0] == "href") {
                    // 提取href格式和修改href
                    if (href = combo[i].split("=")[1].indexOf(".dds") != -1) {
                        href = window.location.href + "#brower?path=" + combo[i].split("=")[1]
                    } else {
                        href = combo[i].split("=")[1];
                    }

                } else {
                    if(combo[i].split("=")[1]!="cosmonull"){
                        newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                    }
                    if (combo[i].split("=")[0] == "cls") {
                        cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                    }
                }
            }


            var html ="<div class='rectangle "+ cls+"' id='"+activeId+type+"' style='width:100%;height:100%; border:1px solid #ddd'></div>";


            page.items[activeId].html = html;

            Ext.getCmp('rightStyle').getController().handleEvents();
            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);

            var domProxy = Ext.dom.Helper.createDom(html);
            return domProxy;
        }
    }
});
