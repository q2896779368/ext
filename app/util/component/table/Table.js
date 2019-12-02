/**
 * 元件--数据表格
 */
Ext.define('Cosmo.util.component.table.Table', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.Table'],

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
            type: 'table',
            /** 别名（Cosui元件名称） */
            alias: 'datagrid',
            /** Cosui标签 */
            tag: 'table',
            /** Cosui样式表 */
            cls: 'cosui-datagrid',
            /** 元件创建时的初始化样式 */
            iconCls: 'table',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            /** 初始化属性 */
            property: {
                group: '',
                groups: '',
                dataOptions: '',
                options: [],
                subProperties: {},
                subProperty: {},
                type: '数据表格',
                showName: "",
                name: "",
                text: "数据表格",
                textCombo: [],
                cls: "cosui-datagrid",
                headerColumn:[],
                headerFrozenColumn:[],

                // 暂时存放属性
                configColumn:[],
                configFrozenColumn:[],

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
                width: "500",
                height: "325",
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
        var page = Map.get(Const.PAGE_OBJECT)
        var newCombo = "",cls = "";
        //判断是新建还是打开已保存的
        if (combo == undefined) {
            // newCombo = "title='数据表格'"
        } else {
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[1] != "cosmonull") {
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                }
                if (combo[i].split("=")[0] == "cls") {
                    cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                }
            }
        }
        var html = "";

        var tem = "<table striped=true " + newCombo + "class='cosui-datagrid "+ cls+"' id='" + this.id + this.type + "' style='width:100%;height:100%'" +
            "data-options='" + dataOptions + "'>" +
            " <thead>" +
            "        <tr>" +
            "<th data-options=\"field:'itemid',width:100\">标题1</th>\n" +
            "<th data-options=\"field:'productid',width:100\">标题2</th>\n" +
            "<th data-options=\"field:'productid',width:100\">标题3</th>\n" +
            "<th data-options=\"field:'listprice',width:110\">标题4</th>\n" +
            "        </tr>" +
            "    </thead>" +
            "    <tbody>" +
            "        <tr><td>1</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td></tr>" +
            "        <tr><td>2</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td></tr>" +
            "        <tr><td>3</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td></tr>" +
            "    </tbody>" +
            "</table>";
        if (!page.items[this.id]) {
            var newHtml = tem;
        } else {
            if (!page.items[this.id].property.dataSource.length) {
                var newHtml = tem;
            } else {
                var newHtml = "<table " + newCombo + "class='cosui-datagrid' id='" + this.id + this.type + "' style='width:100%;height:100%'" +
                    "data-options='" + dataOptions + "'>" +
                    "</table>";
            }

            // 存储属性
            Cmp.dataOptions = dataOptions;
            Cmp.combo = combo;
        }

        html = newHtml;

        var defaultClass = "";

        if (this.property.cls)
            defaultClass = this.property.cls;
        else
            defaultClass = this.iconCls;

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
            var newCombo = "",cls = "";
            //修改textCombo格式
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[1] != "cosmonull") {
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                }
                if (combo[i].split("=")[0] == "cls") {
                    cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
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
            // console.log(page.items[activeId].property.dataSource[0],1223)
            // Ext.getCmp('rightProperty').getController().applyTable(activeId,page.items[activeId].property.dataSource.r[0])

            var html = ""
            //判断数据表格是否绑定数据源
            if (page.items[activeId].property.dataSource.length == 0) {
                html = "<table " + newCombo + "class='cosui-datagrid "+ cls+"' id='" + activeId + type + "' style='width:100%;height:100%'" +
                    "data-options='" + dataOptions + "'>" +
                    " <thead>" +
                    "        <tr>" +
                    "<th data-options=\"field:'itemid',width:100\">标题1</th>\n" +
                    "<th data-options=\"field:'productid',width:100\">标题2</th>\n" +
                    "<th data-options=\"field:'productid',width:100\">标题3</th>\n" +
                    "<th data-options=\"field:'listprice',width:110\">标题4</th>\n" +

                    "        </tr>" +
                    "    </thead>" +
                    "    <tbody>" +
                    "        <tr>" +
                    "            <td>1</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td></tr>" +
                    "            <td>2</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td></tr>" +
                    "            <td>3</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td></tr>" +
                    "    </tbody>" +
                    "</table>";
            } else {
                html = "<table " + newCombo + "class='cosui-datagrid "+ cls+"' id='" + activeId + type + "' style='width:100%;height:100%'" +
                    "data-options='" + dataOptions + "'>" +
                    "</table>";
                // 存储属性
                Cmp.dataOptions = dataOptions;
                Cmp.combo = combo;
            };
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);
            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
