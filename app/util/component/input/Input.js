/**
 * 元件--输入框
 */
Ext.define('Cosmo.util.component.input.Input', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.Input'],

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
            type: 'input',
            /** 别名（Cosui元件名称） */
            alias: 'textbox',
            /** Cosui标签 */
            tag: 'input',
            /** Cosui样式表 */
            cls: 'cosui-textbox',
            /** 元件创建时的初始化样式 */
            iconCls: 'input',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            /** 初始化属性 */
            property: {
                /**验证*/
                validate: [],
                group: '',
                groups: '',
                dataOptions: '',
                options: [],
                textCombo: [],
                loadTip: '',
                type: '文本框',
                showName: "",
                name: "",
                text: "文本框",
                cls: "input",
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
                width: "236",
                height: "22",
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
    createDomProxy: function (left, top, dataOptions, combo, id, sub, newCmp) {
        var newCombo = "", cls = "";
        //判断是新建还是打开已保存的
        if (combo == undefined) {
            newCombo = "title='输入框'"
        } else {
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[1] != "cosmonull") {
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/, '') + "' "
                }
                if (combo[i].split("=")[0] == "cls") {
                    cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/, '');
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
        // 处理校验
        if (Cmp.manageValidate(newCmp).length) dataOptions += ",validType:[" + Cmp.manageValidate(newCmp) + "]";
        var html = '<input id="' + this.id + this.type + '" class="cosui-textbox ' + cls + '"' + newCombo + ' data-options="' + dataOptions + '" style="width:100%;height:100%;">';
        var proxy = {
            tag: 'div',
            id: this.id,
            cmpType: this.type,
            type: "input",
            style: 'position:absolute;left:' + left + 'px;top:' + top
            + 'px;font-size:' + this.style.fontSize
            + 'px;width: ' + this.style.width + 'px;height: ' + this.style.height
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
            var me = this;
            var page = Map.get(Const.PAGE_OBJECT);
            var activeId = page.activeCmp.id;
            var type = page.items[activeId].type;
            var dataOptions = page.items[activeId].property.dataOptions;
            var combo = page.items[activeId].property.textCombo;
            var newCombo = "", cls = "";
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[1] != "cosmonull" && combo[i].split("=")[0] != "validType") {
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/, '') + "' "
                }
                if (combo[i].split("=")[0] == "cls") {
                    cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/, '');
                }
            }
            // 处理校验
            if (Cmp.manageValidate(page.items[activeId]).length) dataOptions += ",validType:[" + Cmp.manageValidate(page.items[activeId]) + "]";

            var html = '<input  id="' + activeId + type + '" class="cosui-textbox ' + cls + '" ' + newCombo + ' data-options="' + dataOptions + '" style="width:100%;height:100%;">'
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            Ext.getCmp('rightStyle').getController().handleEvents();
            return domProxy;
        },
    }
});
