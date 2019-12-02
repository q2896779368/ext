/**
 * 元件--图片
 */
Ext.define('Cosmo.util.component.img.Img', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.Img'],

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
            type: 'img',
            /** 别名（Cosui元件名称） */
            alias: 'img',
            /** Cosui标签 */
            tag: 'img',
            /** Cosui样式表 */
            cls: 'cosui-img',
            /** 元件创建时的初始化样式 */
            iconCls: 'icon_mxr_control_img',

            /** 元件对应的Cosui源代码 */
            html: null,

            /** 元件对应的dom对象 */
            domProxy: null,

            /** 初始化属性 */
            property: {
                loadUrl: {
                    //树结构id路径
                    urlId: "",

                    //树结构英文路径
                    jumpPath: "",

                    //文件名称
                    fileName: "",

                    //树结构中文路径
                    urlName: "",

                    // 内外部链接
                    radio: false,

                    // 选中和修改的配置项
                    groupMod: {},

                    //配置好的路径
                    serverPath: ""
                },
                group:'',
                groups:'',
                dataOptions: '',
                options: [],
                type: '图片',
                showName: "",
                name: "",
                text: "图片",
                textCombo: [],
                cls: "img ·cosui-img",
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
                width: "48",
                height: "48",
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
        var newCombo = "",cls = "";

        var newSrc="";
        //修改textCombo格式
        for (var i = 0; i < combo.length; i++) {
            if(combo[i].split("=")[0]=="src"){
                var oldSrc=combo[i].split("src=")[1];
                if(oldSrc){
                    if(oldSrc.indexOf("=")!=-1){
                        var serverPath = oldSrc.split("=")[1].split("&")[0]
                        Ext.Ajax.request({
                            async: false,
                            method: "POST",
                            url: window.baseURL+"getUrl",
                            params: {
                                path: serverPath
                            },
                            success: function (response, opts) {
                                var url = response.responseText;
                                if (url) {
                                    newSrc = url;
                                }
                            },
                            failure: function (response, opts) {
                                return false;
                            }
                        });
                    }else{
                        newSrc=oldSrc
                    }

                }
            }else{
                if(combo[i].split("=")[1]!="cosmonull"){
                    newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                }
                if (combo[i].split("=")[0] == "cls") {
                    cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                }
            }
        }

        var defaultClass = "";

        if (this.property.cls)
            defaultClass = this.property.cls;
        else
            defaultClass = this.iconCls;
        var html = "<img src='"+newSrc+"' style='width:100%;height:100%' "+ newCombo + " class='cosui-img "+ cls+"' id='"+this.id+this.type+"' data-options='" + dataOptions + "'/>";
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
            var style = page.items[activeId].style;
            var type = page.items[activeId].type;
            var dataOptions = page.items[activeId].property.dataOptions;
            var combo = page.items[activeId].property.textCombo;
            var newCombo = "",cls = "";

            var newSrc="";
            //修改textCombo格式
            for (var i = 0; i < combo.length; i++) {
                if(combo[i].split("=")[0]=="src"){
                    var oldSrc=combo[i].split("src=")[1];
                    if(oldSrc){
                        if(oldSrc.indexOf("=")!=-1){
                            var serverPath = oldSrc.split("=")[1].split("&")[0]
                            Ext.Ajax.request({
                                async: false,
                                method: "POST",
                                url: window.baseURL+"getUrl",
                                params: {
                                    path: serverPath
                                },
                                success: function (response, opts) {
                                    var url = response.responseText;
                                    if (url) {
                                        newSrc = url;
                                    }
                                },
                                failure: function (response, opts) {
                                    return false;
                                }
                            });
                        }else{
                            newSrc=oldSrc
                        }

                    }
                }else{
                    if(combo[i].split("=")[1]!="cosmonull"){
                        newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                    }
                    if (combo[i].split("=")[0] == "cls") {
                        cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                    }
                }
            }
            // 修改style样式
            var newStyle="";
            for(var key in style){
                if(key=="width"||key=="height"){
                    newStyle+=key+":"+style[key]+"px;";
                }else{
                    newStyle+=key+":"+style[key]+";";
                }
            }

            var html = "<img src='"+newSrc+"' style='width:100%;height:100%' "+ newCombo + " class='cosui-img "+ cls+"' id='"+activeId+type+"' data-options='" + dataOptions + "'/>";
            page.items[activeId].html = html;
            var domProxy = Ext.dom.Helper.createDom(html);

            // 刷新HTML代码
            Ext.getCmp('centerTool').getController().showHtml(activeId);
            return domProxy;
        }
    }
});
