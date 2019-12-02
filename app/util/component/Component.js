/**
 * 元件基础类
 */
Ext.define('Cosmo.util.component.Component', {

    alternateClassName: ['Cosmo.Component', 'Cmp'],

    requires: ['Cosmo.Map', 'Cosmo.Page'],

    /** 构造函数 */
    constructor: function () {
        var _config = {
            /** 属性 */
            property: {
                //在子类中初始化默认属性
            },

            /** 样式 */
            style: {
                //在子类中初始化默认样式
            },
        };
        for (var property in _config) {
            var val = _config[property];
            this[property] = val;
        }
        return this;
    },

    /** 设置组件位置 */
    setXY: function (left, top) {
        this.style.left = left;
        this.style.top = top;
    },
    /** 获取组件位置 */
    getXY: function () {
        var xy = new Array();
        xy.push(this.style.left);
        xy.push(this.style.top);
        return xy;
    },

    /** 生成组件唯一码 */
    generateCmpId: function () {
        return Ext.ux.sequence();
    },

    /** 组件类型名称 */
    getTypeName: function () {
        Map.keys.forEach(function (key) {
            var cmp = Map.get(key);
            if (this.type == cmp.type)
                return cmp.text;
        });
        return '未定义';
    },

    /** 激活组件自身 */
    active: function () {
        Page.activeCmp = this;
        this.notifyRightPanel();
    },

    /** 初始化元件样式 */
    initDomProxy: function () {
        var el = Ext.fly(this.domProxy);
        var styleName = "";
        for (var att in this.style) {
            switch (att) {
                case "zIndex":
                    styleName = "z-index";
                    break;
                case "fontFamily":
                    styleName = "font-family";
                    break;
                case "fontSize":
                    styleName = "font-size";
                    break;
                case "fontWeight":
                    styleName = "font-weight";
                    break;
                case "fontStyle":
                    styleName = "font-style";
                    break;
                case "textUnderline":
                    styleName = "text-decoration";
                    break;
                case "borderColor":
                    styleName = "border-color";
                    break;
                case "borderWidth":
                    styleName = "border-width";
                    break;
                case "borderStyle":
                    styleName = "border-style";
                    break;
                case "backgroundColor":
                    styleName = "background-color";
                    break;
                case "transparency":
                    styleName = "opacity";
                    break;
                case "textAlign":
                    styleName = "text-align";
                    break;
                case "verticalAlign":
                    styleName = "vertical-align";
                    break;
            }
            el.setStyle(styleName, this.style[att]);
        }
    },

    statics: {
        /**表格钻取*/
        tableDrill: {
            /** 钻取条件*/
            judge: {},
            // 每一列打开方式
            colDrill: {
                take: "iframe",
                //内联页面
                iframe: {
                    //面板元件Id
                    eleId: "",
                    //面板元件类型
                    eleType: "",
                    //链接地址
                    path: {
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
                    }
                },

                //新窗口打开链接
                target: {
                    //_blank _parent _self
                    type: "_self",
                    //链接地址
                    path: {
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
                    }
                },
                //弹出窗口
                popUp: {
                    opened: true,
                    windowType: "dialog",
                    toolbar: false,
                    menuBar: false,
                    scrollBar: false,
                    catalog: false,
                    locationBar: false,
                    setSize: false,
                    statusBar: false,
                    windowPosition: false,
                    left: "",
                    top: "",
                    width: "200",
                    height: "200",
                    tag: "",
                    path: {
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
                    }
                },
                //调用事件
                drillEvent: {
                    eventType: "onclick",

                    //回显的内容
                    funVal: ""
                }
            }
        },

        /**表格条件格式*/
        tableJudge: {
            //条件名称
            name: "",
            //满足条件
            judge: {
                //满足条件
                //单元格名称1
                cellName1: "",
                //单元格类型 值 空 非空
                cellValType1: "单元格值",
                // 条件 大于 小于
                judge1: "等于",
                // 介于中起始值
                firstValue1: "",
                // 介于中结束值
                firstValue2: "",
                // 方式
                way: "0",
                //单元格名称2
                cellName2: "",
                //单元格类型 值 空 非空
                cellValType2: "单元格值",
                // 条件 大于 小于
                judge2: "等于",
                // 介于中起始值
                lastValue1: "",
                // 介于中结束值
                lastValue2: ""
            },
            //显示方式
            showWay: {
                // 展示类型  数据+图标
                showType: "0",
                // 是否自定义
                checked: false,
                // 自定义值
                inputVal: "{data}",
                // 图标cls
                iconCls: "fa fa-thumbs-up",
                iconStyle: "color:rgb(123, 157, 82);font-size:16px",
                iconType: "icon",
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
                styleCss: ""
            }
        },

        /**绑定数据源表格属性*/
        dataOptions: "",
        combo: [],

        historyValidate: [],

        /**切割元件和参数值*/
        trans: function (str) {
            var count = 0;
            var matched = [];
            var subStr = '';
            for (var i = 0, len = str.length; i < len; i++) {
                var cur = str[i];
                if (cur === '{') {
                    if (count === 0) {
                        if (subStr.length) matched.push(subStr);
                        subStr = cur;
                    } else {
                        subStr += cur;
                    }
                    count++
                } else if (cur === '}') {
                    subStr += cur
                    count--
                    if (count === 0) {
                        matched.push(subStr)
                        subStr = ''
                    }
                } else {
                    subStr += cur
                }
            }
            if (subStr.length) matched.push(subStr)
            return matched
        },

        /**处理校验 */
        manageValidate: function (activeCmp) {
            var me = this;
            var num = ""
            try {
                num = 1
                var validate = activeCmp.property.validate;
            } catch (e) {
                num = 2
                var validate = activeCmp
            }
            // 防止重复调用 拖慢中间编辑区
            // if(me.historyValidate==validate) return me.historyValidate;
            // me.historyValidate=validate;
            var newValidate = []
            var tableCellValidate = [];

            if (!validate) activeCmp.property["validate"] = [];

            if (!validate.length) return [];

            for (var i = 0; i < validate.length; i++) {
                switch (validate[i].type) {
                    case "fixUrl":
                    case "fixEmail":
                    case "fixIdCode":
                    case "fixMobile":
                    case "fixTel":
                    case "fixMobileAndTel":
                    case "fixZIP":
                    case "fixIp":
                    case "fixQQ":
                    case "loginName":
                    case "password":
                        if (validate[i].message) {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].message + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].message + "']")
                        } else {
                            newValidate.push("'" + validate[i].type + "'")
                            tableCellValidate.push(validate[i].type)
                        }
                        break;
                    //    验证中文
                    case "typeCHS":
                        if (validate[i].message) {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "','" + validate[i].message + "']")
                        } else {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "']")
                        }
                        break;
                    //    验证英文
                    case "typeEnglish":
                        if (validate[i].message) {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "', '" + validate[i].message + "']")
                        } else {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "']")
                        }
                        break;
                    // 验证数字
                    case "typeNum":
                        if (validate[i].message) {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "', '" + validate[i].message + "']")
                        } else {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "']")
                        }
                        break;
                    //    验证整数
                    case "typeInt":
                        if (validate[i].message) {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\'", "\\'" + validate[i].checked + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "','" + validate[i].checked + "','" + validate[i].message + "']")
                        } else {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\'", "\\'" + validate[i].checked + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "'", "'" + validate[i].checked + "']")
                        }
                        break;
                    //    验证小数
                    case "typeDecimals":
                        newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\'", "\\'" + validate[i].decimal + "\\'", "\\'" + validate[i].checked + "\\'", "\\'" + validate[i].minValue + "\\'", "\\'" + validate[i].maxValue + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                        tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "','" + validate[i].decimal + "','" + validate[i].checked + "','" + validate[i].minValue + "','" + validate[i].maxValue + "','" + validate[i].message + "']")
                        break;
                    // 验证日期
                    case "typeData":
                        if (validate[i].message) {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "','" + validate[i].message + "']")
                        } else {
                            newValidate.push("'" + validate[i].type + "[\\'" + validate[i].inputValue + "\\']" + "'")
                            tableCellValidate.push(validate[i].type + "['" + validate[i].inputValue + "']")
                        }
                        break;
                    // 范围校验
                    // 长度比较
                    case "lenRange":
                        newValidate.push("'" + validate[i].type + "[\\'" + validate[i].operator + "\\'", "\\'" + validate[i].min + "\\'", "\\'" + validate[i].max + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                        tableCellValidate.push(validate[i].type + "['" + validate[i].operator + "', '" + validate[i].min + "', '" + validate[i].max + "', '" + validate[i].message + "']")
                        break;
                    // 数值比较
                    case "valRange":
                        newValidate.push("'" + validate[i].type + "[\\'" + validate[i].operator + "\\'", "\\'" + validate[i].min + "\\'", "\\'" + validate[i].max + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                        tableCellValidate.push(validate[i].type + "['" + validate[i].operator + "','" + validate[i].min + "','" + validate[i].max + "','" + validate[i].message + "']")
                        break;
                    // 日期比较
                    case "dateRange":
                        newValidate.push("'" + validate[i].type + "[\\'" + validate[i].operator + "\\'", "\\'" + validate[i].min + "\\'", "\\'" + validate[i].max + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                        tableCellValidate.push(validate[i].type + "['" + validate[i].operator + "', '" + validate[i].min + "','" + validate[i].max + "','" + validate[i].message + "']")
                        break;
                    // 字符比较
                    case "contentRange":
                        newValidate.push("'" + validate[i].type + "[\\'" + validate[i].operator + "\\'", "\\'" + validate[i].min + "\\'", "\\'" + validate[i].max + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                        tableCellValidate.push(validate[i].type + "['" + validate[i].operator + "','" + validate[i].min + "','" + validate[i].max + "', '" + validate[i].message + "']")
                        break;
                    case "customValidate":
                        newValidate.push("'" + validate[i].type + "[\\'" + validate[i].regExp + "\\'", "\\'" + validate[i].message + "\\']" + "'")
                        tableCellValidate.push(validate[i].type + "['" + validate[i].regExp + "','" + validate[i].message + "']")
                        break;


                }
            }
            if (num == 1) {
                return newValidate
            } else {
                return tableCellValidate
            }
        },

        /**事件弹窗对象 */
        eventPopUp: {
            // 条件
            condition: [],
            // 动作
            movement:
                []
        },

        judge: {
            andOr: "||",
            judgeValue:
                {
                    key: "",    //变量
                    than: "==",  //大于小于等于
                    value: "",   // 值
                    keyJudge: [], //解析参数和元件赋值
                    valueJudge: [] //解析参数和元件赋值
                }
        },

        /** 动作类型 */
        movementType: {

            /**变量部分*/

            // 元件赋值
            eleAssignment: {
                text: "元件赋值",
                type: "eleAssignment",
                opened: true,
                url: "",
                alias: "",
                tag: "",
                cls: "",
                checkedPart: {}
            },
            // 变量赋值
            parametersAssignment: {
                text: "变量赋值",
                type: "parametersAssignment",
                name: "",
                opened: true,
                url: "",
                alias: "",
                tag: "",
                cls: "",
                checkedPart: {}
            },

            /**链接部分*/

            //当前窗口
            currentWindow: {
                text: "在当前窗口打开链接",
                type:
                    "currentWindow",
                opened:
                    true,
                windowType:
                    "self",
                alias:
                    "",
                tag:
                    "",
                cls:
                    "",
                path: {
                    //树结构id路径
                    urlId: "",

                    //树结构英文路径
                    jumpPath:
                        "",

                    //文件名称
                    fileName:
                        "",

                    //树结构中文路径
                    urlName:
                        "",

                    // 内外部链接
                    radio: false,

                    // 选中和修改的配置项
                    groupMod: {},

                    //配置好的路径
                    serverPath: ""
                },
            },
            //父窗口
            parentWindow: {
                text: "在父级窗口打开链接",
                type: "parentWindow",
                opened: true,
                windowType: "parent",
                alias: "",
                tag: "",
                cls: "",
                path: {
                    //树结构id路径
                    urlId: "",

                    //树结构英文路径
                    jumpPath: "",

                    //文件名称
                    fileName: "",

                    //树结构中文路径
                    urlName: "",

                    // 内外部链接
                    radio:
                        false,

                    // 选中和修改的配置项
                    groupMod: {},

                    //配置好的路径
                    serverPath: ""
                },
            },
            // 新开窗口
            tag: {
                text: "在新开窗口打开链接",
                type: "tag",
                opened: true,
                alias: "",
                tag: "",
                cls: "",
                path: {
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

            },
            // 弹出窗口
            popUp: {
                text: "在弹出窗口打开链接",
                type: "popUp",
                opened: true,
                windowType: "dialog",
                toolbar: false,
                menuBar: false,
                scrollBar: false,
                catalog: false,
                locationBar: false,
                setSize: false,
                statusBar: false,
                windowPosition: false,
                left: "",
                top: "",
                width: "200",
                height: "200",
                alias: "",
                tag: "",
                cls: "",
                path:
                    {
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
                    }
            },
            //Iframe框架
            intoPage: {
                text: "在内联框架打开链接",
                type: "intoPage",
                windowType: "iframe",
                name: "",
                cmpId: "",
                domId: "",
                alias: "",
                tag: "",
                cls: "",
                path:
                    {
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
                    }
            },
            //关闭窗口
            closeWindow: {
                text: "关闭窗口",
                type: "closeWindow",
                opened: true,
                url: "",
                close: false,
                alias: "",
                tag: "",
                cls: ""
            },

            /**链接部分*/

            //显示隐藏
            toggleDisplay: {
                text: "显示/隐藏组件",
                type: "toggleDisplay",
                alias: "",
                tag: "",
                cls: "",
                checkedPart: {}
            },
            //启用/禁用
            disable: {
                text: "启用/禁用",
                type: "disable",
                alias: "",
                checkedPart: {}
            },
            //选中/取消
            checked: {
                text: "选中取消",
                type: "checked",
                alias: "",
                checkedPart: {}
            },
            //数据源
            store: {
                text: "数据源",
                type: "store",
                alias: "",
                storeList: {}
            },
            // 导出表格数据
            deriveTable: {
                text: "导出表格数据",
                type: "deriveTable",
                opened: true,
                url: "",
                alias: "",
                exportConfig:
                    {

                        // 导出类别 0 导出当前页 1 导出全部
                        prop: 0,

                        //导出格式 1 csv 2 excel 3 word 4 pdf
                        type: [2],

                        sql: "",

                        //导出元件id
                        eleId: "",

                        //导出元件名称
                        eleMarking: "",

                        //当前页码
                        page: "",

                        //每页显示多少条
                        rows: "",

                        //导出表文件名
                        fileName: "",

                        //列表表头
                        headers: '',

                        // 模板路径 不传为默认
                        path: ""

                    }
            },
            //打印表格数据
            tablePrint: {
                text: "打印表格数据",
                type: "tablePrint",
                eleId: "",
                eleType: "",
                url: "",
                alias: "",
                prop: 0
            },

            /**表单维护*/

            //表单插入
            formInsert: {
                text: "插入",
                type: "formInsert",
                storeList: {}
            },
            //表单删除
            formDelete: {
                text: "删除",
                type: "formDelete",
                storeList: {}
            },
            //表单更新
            formUpdate: {
                text: "更新",
                type: "formUpdate",
                storeList: {}
            },

            /**表格维护 */

            //插入行
            tableInsert: {
                text: "插入行",
                type: "tableInsert",
                tableRow:[]
            },
            // 删除行
            tableDelete: {
                text: "删除行",
                type: "tableDelete",
                tableRow:[]
            },
            //撤销
            tableBackOut: {
                text: "撤销",
                type: "tableBackOut",
                tableRow:[]
            },
            //保存
            tableSave: {
                text: "保存",
                type: "tableSave",
                tableRow:[]
            },


            /**高级部分*/

            //javascript脚本
            javaScriptPage: {
                text: "javascript脚本",
                type: "javaScriptPage",
                opened: true,
                url: "",
                alias: "",
                code: "",
            }

        },

        /** 验证 */
        eleValidate: {
            // url
            fixUrl: {
                text: "验证URL",
                type: "fixUrl",
                message: ""
            },
            fixEmail: {
                text: "验证EMAIL",
                type: "fixEmail",
                message: ""
            },
            fixIdCode: {
                text: "验证身份证",
                type: "fixIdCode",
                message: ""
            },
            fixMobile: {
                text: "验证手机号码",
                type: "fixMobile",
                message: ""
            },
            fixTel: {
                text: "验证固话",
                type: "fixTel",
                message: ""
            },
            fixMobileAndTel: {
                text: "验证手机和固话",
                type: "fixMobileAndTel",
                message: ""
            },
            fixZIP: {
                text: "邮政编码",
                type: "fixZIP",
                message: ""
            },
            fixIp: {
                text: "IP地址",
                type: "fixIp",
                message: ""
            },
            fixQQ: {
                text: "验证QQ号",
                type: "fixQQ",
                message: ""
            },
            typeCHS: {
                text: "验证中文",
                type: "typeCHS",
                inputValue: "0",
                message: ""
            },
            typeEnglish: {
                text: "验证英文",
                type: "typeEnglish",
                inputValue: "0",
                message: ""
            },
            typeNum: {
                text: "验证数字",
                type: "typeNum",
                inputValue: "0",
                message: ""
            },
            typeInt: {
                text: "验证整数",
                type: "typeInt",
                inputValue: "0",
                checked: "false",
                message: ""
            },
            typeDecimals: {
                text: "验证小数",
                type: "typeDecimals",
                inputValue: "0",
                checked: false,
                decimal: "",
                minValue: "",
                maxValue: "",
                message: ""
            },
            typeData: {
                text: "验证日期",
                type: "typeData",
                inputValue: "0",
                message: ""
            },
            lenRange: {
                text: "长度比较",
                type: "lenRange",
                operator: "",
                min: "",
                max: "",
                message: ""
            },
            valRange: {
                text: "数值比较",
                type: "valRange",
                operator: "",
                min: "",
                max: "",
                message: ""
            },
            dateRange: {
                text: "日期比较",
                type: "dateRange",
                operator: "",
                min: "",
                max: "",
                message: ""
            },
            contentRange: {
                text: "字符比较",
                type: "contentRange",
                operator: "",
                min: "",
                max: "",
                message: ""
            },
            loginName: {
                text: "用户名",
                type: "loginName",
                opened: true,
                url: "",
                alias: "",
                tag: "",
                cls: "",
                checkedPart: {}
            },
            password: {
                text: "密码",
                type: "password",
                opened: true,
                url: "",
                alias: "",
                tag: "",
                cls: "",
                checkedPart: {}
            },
            customValidate: {
                text: "自定义校验",
                type: "customValidate",
                name: "",
                regExp: "",
                message: ""
            }
        },

        /** 表格编辑列 */
        editCol: {
            //单选框选中的是哪一个
            editTake: "noEle",
            // 文本框
            colText: {
                isValidate: false,
                nonEmpty: false,
                validate: [],
                validateText: ""
            },
            //下拉框
            colCombo: {
                dataSource:"",
                bindCol: "",
                showCol: "",
                isValidate: false,
                nonEmpty: false,
                validate: [],
                validateText: ""
            },
            //复选框
            colCheckbox: {
                selectVal: "",
                cancelVal: ""
            },
            // 文本框
            colDate: {
                isValidate: false,
                nonEmpty: false,
                validate: [],
                validateText: ""
            }
        }
    }

});
