/**
 * 元件--面板
 */
Ext.define('Cosmo.util.component.panel.Panel', {
    extend: 'Cosmo.util.component.Component',

    alternateClassName: ['Cosmo.Panel'],

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
            /** 元件类型 */
            type: 'panel',
            /** 别名（Cosui元件名称） */
            alias: 'panel',
            /** Cosui标签 */
            tag: 'div',
            /** Cosui样式表 */
            cls: 'cosui-panel',
            /** 元件创建时的初始化样式 */
            iconCls: 'panel',

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
                group: '',
                groups: '',
                dataOptions: '',
                options: [],
                textCombo: [],
                loadTip: '',
                type: '面板',
                showName: "",
                name: "",
                text: "面板",
                cls: "panel",
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
        var me = this;
        var newCombo = "", cls = "";
        //判断是新建还是打开已保存的
        var href = "";
        if (combo == undefined) {
            newCombo = "title='基础面板'"
        } else {
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[0] == "href" && combo[i].split("=")[1] != "从URL读取远程数据并且显示到面板。注意：内容将不会被载入，直到面板打开或扩大，在创建延迟加载面板时是非常有用的。") {
                    // 提取href格式和修改href
                    if (combo[i].split("href=")[1].indexOf("http") == -1 && combo[i].split("href=")[1]) {
                        if (combo[i].split("href=")[1].indexOf(".dds") != -1) {
                            // 自己项目
                            var oldHref = Cmp.trans(combo[i].split("href=")[1])
                            href = window.location.href + "brower.html?" + encodeURIComponent(Cosmo.Panel.parseUrl(oldHref))
                        } else {
                            var oldHref = Cmp.trans(combo[i].split("href=")[1])
                            var oldUrl = Cosmo.Panel.parseUrl(oldHref)
                            if (oldUrl.indexOf("=") != -1) {
                                var serverPath = oldUrl.split("=")[1].split("&")[0]
                            }
                            //其他项目
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
                                        href = url;
                                    }
                                },
                                failure: function (response, opts) {
                                    return false;
                                }
                            });
                        }
                    } else {
                        // 外部链接
                        href = combo[i].split("href=")[1];
                    }

                } else {
                    if (combo[i].split("=")[1] != "cosmonull") {
                        if (combo[i].split("=")[0] != "href") {
                            newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                        }
                        if (combo[i].split("=")[0] == "cls") {
                            cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                        }
                    }
                }
            }
        }

        // var defatulClassStr = "";
        // if (this.property.cls != "")
        //     defatulClassStr = this.property.cls;
        // else
        //     defatulClassStr = this.iconCls;
        if (href == "") {
            var html = "<div class='cosui-panel " + cls + "'   " + newCombo + " style='width:100%;height:100%;' data-options='" + dataOptions + "'>" +
                "<ul>" +
                "<li>这是一个基础面板，您可以查看右侧工具中类型更换面板的类型。</li>" +
                "</ul>" +

                "</div>"
        } else {
            var html = "<div class='cosui-panel " + cls + "'   " + newCombo + " style='width:100%;height:100%;' data-options='" + dataOptions + "'>" +
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
        /**解析参数*/
        parseUrl: function (oldHref) {
            var page = Map.get(Const.PAGE_OBJECT);
            var newHtml = "";
            for (var i = 0; i < oldHref.length; i++) {
                if (page.params.length != 0) {
                    // 检索参数
                    if (oldHref[i].indexOf("{") != -1 && oldHref[i].indexOf("}") != -1) {
                        var bl = true;
                        for (var j = 0; j < page.params.length; j++) {
                            if (oldHref[i].indexOf(page.params[j][0]) != -1) {
                                newHtml += page.params[j][1];
                                bl = false;
                            }
                        }
                        if (bl) {
                            newHtml += oldHref[i];
                        }
                    } else {
                        newHtml += oldHref[i];
                    }
                    // // 检索元件
                    // for (var k in page.items) {
                    //     if(oldHref[i].indexOf("{")!=-1&&oldHref[i].indexOf("}")!=-1){
                    //         if(oldHref[i].indexOf(page.items[k].marking)!=-1){
                    //             var id=page.items[k].id;
                    //             var alias=page.items[k].alias;
                    //             newHtml+=$("#"+id +" "+alias).val()
                    //         }
                    //     }
                    // }
                } else {
                    newHtml += oldHref[i];
                }


            }
            return newHtml;
        },
        /**右侧属性修改时，渲染页面方法combo*/
        reParse: function (activeId) {
            var me = this;
            var page = Map.get(Const.PAGE_OBJECT);
            // console.log(activeId)
            if (!activeId) activeId = page.activeCmp.id;
            var dataOptions = page.items[activeId].property.dataOptions;
            var combo = page.items[activeId].property.textCombo;
            var newCombo = "", cls = "";
            var href = "";
            // console.log(combo)
            // 修改textCombo格式
            for (var i = 0; i < combo.length; i++) {
                if (combo[i].split("=")[0] == "href" && combo[i].split("=")[1] != "从URL读取远程数据并且显示到面板。注意：内容将不会被载入，直到面板打开或扩大，在创建延迟加载面板时是非常有用的。") {
                    // 提取href格式和修改href
                    if (combo[i].split("href=")[1].indexOf("http") == -1 && combo[i].split("href=")[1]) {
                        if (combo[i].split("href=")[1].indexOf(".dds") != -1) {
                            // 自己项目
                            var oldHref = Cmp.trans(combo[i].split("href=")[1])
                            href = window.location.href + "brower.html?" + encodeURIComponent(me.parseUrl(oldHref))
                        } else {
                            var oldHref = Cmp.trans(combo[i].split("href=")[1])
                            var oldUrl = me.parseUrl(oldHref)
                            if (oldUrl.indexOf("=") != -1) {
                                var serverPath = oldUrl.split("=")[1].split("&")[0]
                            }
                            //其他项目
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
                                        href = url;
                                    }
                                },
                                failure: function (response, opts) {
                                    return false;
                                }
                            });
                        }
                    } else {
                        // 外部链接
                        href = combo[i].split("href=")[1];
                    }

                } else {
                    if (combo[i].split("=")[1] != "cosmonull") {
                        if (combo[i].split("=")[0] != "href") {
                            newCombo += combo[i].split("=")[0] + "='" + combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'') + "' "
                        }
                        if (combo[i].split("=")[0] == "cls") {
                            cls = combo[i].split("=")[1].replace(/[\r\n]/g, '').replace(/\n/,'');
                        }
                    }
                }
            }
            // console.log(decodeURIComponent(href))
            if (href == "") {
                var html = "<div class='cosui-panel " + cls + "'   " + newCombo + " style='width:100%;height:100%;' data-options='" + dataOptions + "'>" +
                    "<ul>" +
                    "<li>这是一个基础面板，您可以查看右侧工具中类型更换面板的类型。</li>" +
                    "</ul>" +

                    "</div>"
            } else {
                var html = "<div class='cosui-panel " + cls + "'   " + newCombo + " style='width:100%;height:100%;' data-options='" + dataOptions + "'>" +
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
