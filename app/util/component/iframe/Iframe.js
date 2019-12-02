/**
 * 元件--内联框架
 */
Ext.define('Cosmo.util.component.iframe.Iframe', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.Iframe'],

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
            type: 'iframe',
            /** 别名（Cosui元件名称） */
            alias: 'iframe',
            /** Cosui标签 */
            tag: '',
            /** Cosui样式表 */
            cls: '',
            /** 元件创建时的初始化样式 */
            iconCls: 'iframe',

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
                type: 'iframe',
                showName: "",
                name: "",
                text: "iframe",
                cls: "iframe",
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
                width: "",
                height: "",
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
                transparency: "",

                /** 水平垂直位置 */
                textAlign: "",
                verticalAlign: "",

                /** 鼠标样式 */
                cursor: "",
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
        var newCombo = "";
        //判断是新建还是打开已保存的
        if (combo == undefined) {
            newCombo = "title='输入框'"
        } else {
            for (var i = 0; i < combo.length; i++) {
                if(combo[i].split("=")[1]!="cosmonull"){
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                }
            }
        }

        var defatulClassStr = "";
        if (this.property.cls != "")
            defatulClassStr = this.property.cls;
        else
            defatulClassStr = this.iconCls;

        // //var itb_id = getDivInnerObjID(this.id);  //table的ID
        // if(titleT==""|| titleT==undefined){
        //     titleT="基础面板";
        // }

        var html = '<iframe src="" width="200" height="200" id="'+this.id+this.type+'"></iframe>';
        var proxy = {
            tag: 'div',
            id: this.id,
            cmpType: this.type,
            type: "select",
            style: 'position:absolute;left:' + left + 'px;top:' + top
            + 'px;font-size:' + this.style.fontSize
            + 'px;z-index:' + this.style.zIndex,
            cls: defatulClassStr,
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
            var newCombo = "";
            for (var i = 0; i < combo.length; i++) {
                if(combo[i].split("=")[1]!="cosmonull"){
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                }
            }

            var html = '<iframe src="" width="200" height="200" id="'+activeId+type+'"></iframe>'

            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            Ext.getCmp('rightStyle').getController().handleEvents();
            return domProxy;
        }
    }
});
