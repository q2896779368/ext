/**
 * 应用程序主视图控制器
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.top.TopToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.topToolbar',   // 控制器别名
    tip: null,                        // 参数树提示信息
    newFileIdArray: [],               // 新页面id
    serial: 0,
    jump: true,
    previewFlag: false,               // 预览标识
    projectRootId: null,             // 项目的根节点ID
    projectRootName: null,           // 项目的根节点NAME
    projectRootPath: null,            // 项目的根节点NAME

    /** 新建项目 */
    onNewProject: function () {
        /*/新建打开项目弹窗 */
        var win = new Ext.window.Window({
            title: '新建项目',
            height: 560,
            width: 420,
            id: 'createProject',
            layout: 'fit',
            modal: true,
            style: 'background-color:#f1f1f1;',
            header: {
                height: 22,
                style: 'padding:1px 5px;background-image: linear-gradient(-180deg, rgb(238, 238, 238) 0%, rgb(221, 221, 221) 100%);border-radius:5px 5px 0px 0px;',
                border: true
            },
            items: [
                {
                    id: 'creaProjectTree',
                    xtype: 'treepanel',
                    useArrows: true,                // 节点展开+，-图标全部改为小三角
                    expanded: true,                 // 默认展开
                    region: 'west',
                    width: '100%',
                    height: '80%',
                    border: false,
                    bodyBorder: false,
                    headerBoders: false,            // 去掉边框
                    // 资源树（数据集）
                    store: {
                        storeId: 'Resources',       // 数据集ID
                        root: {                     // 根节点配置
                            id: 4,             // 根节点ID
                            expanded: true,         // 默认展开
                            text: '资源文件目录',     // 根节点名称
                            rootVisible: true,                    // 显示根节点
                            projectType: 1,                       // 标识项目
                            iconCls: "icon_project"
                        },
                        proxy: {                    // 访问代理
                            type: 'ajax',           // 类型异步
                            api: {
                                read: window.baseURL + 'catalog/tree?type=dds'
                            }
                        }
                    },
                    bbar: [{
                        frame: true,
                        xtype: "form",
                        buttonAlign: "center",
                        labelWidth: 200,
                        border: false,
                        bodyBorder: false,
                        style: "border:none;border-radius:0;padding: 0 30px;background-color:#f1f1f1;",
                        items: [{
                            id: 'projectUrl',
                            fieldLabel: '路径',
                            width: 330,
                            labelStyle: "width:100px",
                            style: 'background-color:#f1f1f1;margin-bottom: 0px;padding-bottom: 5px;',
                            xtype: 'textfield',
                            readOnly: true,
                            value: '',
                            emptyText: '请选择一个路径',
                            listeners: {
                                specialkey: function (field, e) {         // 回车确定
                                    if (e.getKey() == Ext.EventObject.ENTER) {
                                        Ext.getCmp("saveBtn").handler()
                                    }
                                }
                            }
                        }, {
                            id: 'creaProjectName',
                            fieldLabel: '名称',
                            labelStyle: "width:100px",
                            width: 330,
                            style: 'background-color:#f1f1f1;margin-bottom: 0px;padding-bottom: 5px;',
                            xtype: 'textfield',
                            msgTarget: "under",
                            validationDelay: 0,// 验证时长
                            value: '',
                            //value: editController.getActiveTitle().replace(/\*$/, ''),
                            listeners: {
                                specialkey: function (field, e) {             // 回车确定
                                    if (e.getKey() == Ext.EventObject.ENTER) {
                                        Ext.getCmp("saveBtn").handler()
                                    }
                                }
                            }
                        }]
                    }],
                    listeners: {
                        render: function () {
                            $('#creaProjectTree-body>div').niceScroll({
                                cursorborder: '1px solid #c5c5c5',
                                cursorcolor: '#c5c5c5',
                                autohidemode: 'leave'
                            });
                        },
                        itemclick: function (node, record, item, index, e, eOpts) {
                            /** 点击项目名字，获取id和文件名 */
                            var leftresource = Ext.getCmp('leftresource').getController();
                            leftresource.nodeId = record.data.id;
                            leftresource.fileName = record.data.text;
                            // 根目录
                            if (record.data.node == undefined) {
                                leftresource.filePath = '资源文件目录'
                            } else {
                                leftresource.filePath = record.data.node.path
                            }
                            Ext.getCmp("projectUrl").setValue(leftresource.filePath);

                        }
                    }
                }],
            buttons: [{
                id: 'saveBtn',
                cls: 'sure',
                text: '确定',
                height: '26px',
                width: '76px',
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                handler: function () {
                    var leftresource = Ext.getCmp('leftresource').getController(),
                        fileName = Ext.getCmp("creaProjectName").getValue();
                    nodeId = leftresource.nodeId;
                    Ext.Ajax.request({
                        async: false,
                        method: 'POST',
                        url: window.baseURL + 'catalog/createProject',
                        params: {
                            name: fileName,
                            pId: nodeId,
                        },
                        success: function (response, opts) {
                            var data = Ext.util.JSON.decode(response.responseText);
                            if (data.status == 0) {
                                // 设置新建项目的根节点
                                var treeobj = {
                                    id: data.data.nodeId,   // 根节点ID
                                    expanded: true,         // 默认展开
                                    text: data.data.title    // 根节点名称
                                }
                                Ext.getCmp('leftresource').store.setRootNode(treeobj);
                                Ext.getCmp('leftresource').store.setRootVisible(true);
                                Ext.getCmp('createProject').destroy();
                            } else if (data.status == 1) {
                                Ext.Msg.alert('提示', '新建项目名不能为空！', Ext.emptyFn);
                            } else if (data.status == 2) {
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '保存项目失败！', Ext.emptyFn);
                        }
                    });
                }
            }, {
                text: '取消',
                cls: 'cancel',
                height: '26px',
                width: '76px',
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                handler: function (data) {
                    Ext.getCmp('createProject').destroy();
                }
            }],
            listeners: [{
                afterrender: function () {
                    // 自动获取焦点
                    Ext.getCmp('creaProjectName').focus();
                    $("#creaProjectTree").keyup(function (e) {
                        if (e.keyCode == 13) {
                            Ext.getCmp("saveBtn").handler()
                        }
                    })
                }
            }]
        }).show();
    },


    /** 打开项目的弹窗 */
    openProject: function () {
        var me = this;
        new Ext.window.Window({
            title: '打开项目',
            height: '70%',
            width: 580,
            id: 'projectList',
            layout: 'fit',
            modal: true,
            constrain: true,
            header: {
                height: 22,
                style: 'padding:1px 5px;'
            },
            items: [{
                id: "projectTree",
                xtype: "treepanel",
                useArrows: false,                // 节点展开+，-图标全部改为小三角
                expanded: false,                 // 默认展开
                region: 'west',
                width: "100%",
                height: "80%",
                border: false,
                bodyBorder: false,
                headerBoders: false,            // 去掉边框
                rootVisible: false,             //隐藏根节点
                lines: false,                    // 去掉树线
                icon: '',
                /** 资源树（数据集） */
                store: {
                    storeId: 'Resources',       // 数据集ID
                    proxy: {                    // 访问代理
                        type: 'ajax',           // 类型异步
                        api: {
                            read: window.baseURL + 'catalog/openProject'
                        }
                    }
                },
                columns: [
                    {
                        width: 16,
                        xtype: 'actioncolumn',
                        iconCls: 'icon_project x-tree-icon-parent',
                        dataIndex: 'text',
                    },
                    {
                        width: 160,
                        dataIndex: "text",
                    },
                    {
                        width: 380,
                        renderer: function (node, td, cellIndex, record, tr, rowIndex) {
                            td.tdStyle = "color:#1d0d0d";
                            return cellIndex.data.node.path
                        },
                    }
                ],
                /** 监听器 */
                listeners: {
                    render: function (e) {
                        $('#projectTree-body>div').niceScroll({
                            cursorborder: '1px solid #c5c5c5',
                            cursorcolor: '#c5c5c5',
                            autohidemode: 'leave'
                        })
                    },
                    itemclick: function (node, record, item, index, e, eOpts) {
                        me.projectRootId = record.data.id;
                        me.projectRootName = record.data.text;
                        if (record.node) {
                            me.projectRootPath = record.node.serverPath;
                        } else {
                            me.projectRootPath = item.innerText.split(record.data.text)[1].trim() + record.data.text
                        }

                    }
                }
            }],
            buttons: [{
                id: 'saveBtn',
                text: '确定',
                height: 24,
                width: 80,
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                handler: function () {
                    me.openProjectAction(me.projectRootId, me.projectRootName)
                }
            }, {
                text: '取消',
                id: 'cancelBtn',
                height: 24,
                width: 80,
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                handler: function (data) {
                    Ext.getCmp('projectList').destroy();
                    Ext.getCmp("startDiv") ? Ext.getCmp("startDiv").show() : "";
                }
            }]
        }).show();
    },

    /** 打开项目 */
    openProjectAction: function (node, rootName) {
        var page = Map.get(Const.PAGE_OBJECT),
            leftresource = Ext.getCmp('leftresource').getController(),
            treeobj = {
                id: node,        // 根节点ID
                expanded: true,         // 默认展开
                text: rootName             // 根节点名称
            };
        Ext.getCmp('leftresource').store.setRootNode(treeobj);
        Ext.getCmp('leftresource').store.setRootVisible(true);
        Ext.getCmp('projectList').destroy();
        // 新建项目后将新建，打开的功能启用
        var topToolItems = Ext.getCmp('topRegion').items.items;
        topToolItems.forEach(function (item) {
            if (item.id == "addFile" || item.id == "openObjectPage") {
                item.setDisabled(false);
            }
        })
    },

    /** 新建文件 */
    onNewFile: function (fileType) {
        if (Ext.getCmp('leftresource').store.root.id === '4') {
            Ext.Msg.alert('提示', '请打开项目', Ext.emptyFn);
            return;
        }
        var me = this,
            tabPanel = Ext.getCmp('centerEdit'),    // 中心流程设计区
            tabId = 'newTab' + new Date().getTime();    // 中心流程设计区TAB页ID
        // 加入新建文件ID数组，为新建文件编号
        me.newFileIdArray.push(tabId);
        // 新建流程设计TAB页
        tabPanel.add({
            title: '流程' + me.newFileIdArray.length + "*",
            id: tabId,
            header: {
                height: 22,
                style: 'background: rgba(79, 85, 132, 1)',
                border: false
            },
            autoScroll: false,
            width: "100%",
            height: "100%",
            bodyStyle: 'overflow: auto!important;',
            html: '<div class="graph"  style="width:10000px;height: 10000px;overflow:hidden;cursor: default;background-color:white;"></div>',
            closable: true,
            listeners: {
                afterrender: function () {
                    var activeTabId = this.id;

                },
                beforeclose: tabPanel.getController().onBeforeClose
            }
        });
        // 设置为当前活动页签
        tabPanel.setActiveTab(tabId);
        // PAGE对象
        var page = Map.get(Const.PAGE_OBJECT);
        // 设置PAGE ID
        page.id = tabId;
        // 保存时判断文件、模板
        page.fileType = (fileType && !(typeof fileType === 'object')) ? fileType : '0';
        // 加载MxGraph编辑器
        Ext.getCmp('leftresource').getController().loadEditor(tabId);
        me.serial = 0;
        // 禁用另存
        Ext.getCmp('onSaveAs').setDisabled(true);
        // 页面没保存 检测
        Ext.get(window).on('beforeunload', function (e) {
            var tabPanel = Ext.getCmp('centerEdit');
            var panel = tabPanel.constructor;
            tabPanel.setActiveTab(panel.id);
            var page = Map.get(Const.PAGE_OBJECT);
        });
    },

    /** 执行任务 */
    executeText: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        // 没有保存文件时 提示
        if (Ext.getCmp(page.id).title.indexOf('*') >= 0) {
            Ext.Msg.alert('警告', '请先保存文件 在进行操作', Ext.emptyFn);
            return false;
        }
        // 没有打开的文件时操作提示
        if (!page) {
            Ext.Msg.alert('警告', '当前无可执行文件', Ext.emptyFn);
            return false;
        }
        setTimeout(function () {
            Ext.MessageBox.wait('正在操作', '正在操作，请等待');// 显示等待信息框
        }, 0)
        var graph = page.activeGraph;
        if (!graph) return false;
        var encoder = new mxCodec(),
            node = encoder.encode(graph.getModel()),
            xml = null;
        // 执行任务
        Ext.Ajax.request({
            method: "POST",
            url: window.baseURL + "oozie/executeTheTask",
            params: {
                mxGraph: mxUtils.getPrettyXml(node),
                nodeId: page.id,
                name: Ext.getCmp('centerEdit').getActiveTab().title
            },
            timeout: 1000 * 60 * 10,
            success: function (response, opts) {
                var data = Ext.decode(response.responseText),
                    msg = data.message,
                    code = data.code;

                xml = data.data.workflow;
                if (code == 0) {
                    // 不变
                    Ext.Ajax.request({
                        method: "POST",
                        url: window.baseURL + "oozie/executeOozieTask",
                        params: {
                            oozieString: xml
                        },
                        timeout: 1000 * 60 * 10,
                        success: function (response, opts) {
                            // 系统异常提示
                            if (response.responseText == '系统发生异常') {
                                Ext.Msg.alert('提示', '执行oozie任务失败！', Ext.emptyFn);
                                return false;
                            }
                            // 获取返回数据
                            var data = Ext.decode(response.responseText),
                                code = data.code,
                                message = data.message,
                                resData = data.data;

                            if (code == "0" && (resData != "" && resData != null && resData != undefined && resData.length != undefined)) {
                                new Ext.window.Window({
                                    title: "执行任务的返回值",
                                    height: 260,
                                    width: 200,
                                    id: 'executeId',
                                    modal: true,
                                    html: resData
                                }).show();
                            } else {
                                Ext.Msg.alert('提示', message, Ext.emptyFn);
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '执行oozie任务失败！', Ext.emptyFn);
                        }
                    });
                } else {
                    Ext.Msg.alert('提示', msg);
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '执行失败！', Ext.emptyFn);
            }
        })
    },

    /** 调度任务 */
    dispatcherTask: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        // 没有保存文件时 提示
        if (Ext.getCmp(page.id).title.indexOf('*') >= 0) {
            Ext.Msg.alert('警告', '请先保存文件 在进行操作', Ext.emptyFn);
            return false;
        }
        // 没有打开的文件时操作提示
        if (!page) {
            Ext.Msg.alert('警告', '当前无可执行文件', Ext.emptyFn);
            return false;
        }
        setTimeout(function () {
            Ext.MessageBox.wait('正在操作', '正在操作，请等待');// 显示等待信息框
        }, 0)
        var graph = page.activeGraph;
        if (!graph) return false;
        var encoder = new mxCodec(),
            node = encoder.encode(graph.getModel()),
            xml = null;
        // 执行任务
        Ext.Ajax.request({
            method: "POST",
            url: window.baseURL + "oozie/executeTheTask",
            params: {
                mxGraph: mxUtils.getPrettyXml(node),
                nodeId: page.id,
                name: Ext.getCmp('centerEdit').getActiveTab().title
            },
            timeout: 1000 * 60 * 10,
            success: function (response, opts) {
                var data = Ext.decode(response.responseText),
                    msg = data.message,
                    code = data.code;

                xml = data.data.workflow;
                if (code == 0) {
                    Ext.Ajax.request({
                        method: "POST",
                        url: window.baseURL + "oozie/scheduleOozieTask",
                        params: {
                            coordinator: JSON.stringify(page.coordinator),
                            oozieString: xml
                        },
                        timeout: 1000 * 60 * 10,
                        success: function (response, opts) {
                            if (response.responseText == '系统发生异常') {
                                Ext.Msg.alert('提示', '执行oozie任务失败！', Ext.emptyFn);
                            }
                            var data = Ext.decode(response.responseText),
                                code = data.code,
                                message = data.message,
                                resData = data.data;

                            if (code == "0" && (resData != "" && resData != null && resData != undefined && resData.length != undefined)) {
                                new Ext.window.Window({
                                    title: "执行任务的返回值",
                                    height: 260,
                                    width: 200,
                                    id: 'executeId',
                                    modal: true,
                                    html: resData
                                }).show();
                            } else {
                                Ext.Msg.alert('提示', message, Ext.emptyFn);
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '执行oozie任务失败！', Ext.emptyFn);
                        }
                    });
                } else {
                    Ext.Msg.alert('提示', msg);
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '执行失败！', Ext.emptyFn);
            }
        })
    },

    /** 新建文件夹 */
    onNewFolder: function (fileType) {
        var me = this,
            resourceCtrl = Ext.getCmp('leftresource').getController(),
            resourceCtrlRootId = Ext.getCmp('leftresource').getRootNode().data.id,
            resourceCtrlRootName = Ext.getCmp('leftresource').getRootNode().data.text;

        if (!fileType || (typeof fileType == 'object')) fileType = '0';
        var rootId = 4;
        if (fileType === '1') rootId = 400;
        new Ext.window.Window({
            title: '新建文件夹',
            height: 600,
            width: 560,
            id: 'newFileList',
            layout: 'fit',
            modal: true,
            style: 'padding:1px 5px;background-image: linear-gradient(-180deg, #eee 0%, #ddd 100%);border-radius:5px 5px 0px 0px;',
            header: {
                height: 24,
                style: 'padding:6px 5px;'
            },
            items: [{
                id: 'treeUrl1',
                xtype: 'treepanel',
                useArrows: true,                // 节点展开+，-图标全部改为小三角
                expanded: true,                 // 默认展开
                region: 'west',
                width: '100%',
                height: '60%',
                border: false,
                bodyBorder: false,
                headerBoders: false,            // 去掉边框
                // 资源树（数据集）
                store: {
                    storeId: 'Resources',           // 数据集ID
                    root: {                         // 根节点配置
                        id: resourceCtrlRootId,     // 根节点ID
                        expanded: true,             // 默认展开
                        text: resourceCtrlRootName  // 根节点名称
                    },
                    proxy: {                        // 访问代理
                        type: 'ajax',               // 类型异步
                        api: {
                            read: window.baseURL + 'catalog/tree?type=dds'
                        }
                    }
                },
                bbar: [{
                    id: 'create-form',
                    frame: true,
                    xtype: 'form',
                    buttonAlign: 'left',
                    labelWidth: 200,
                    height: 90,
                    width: '100%',
                    border: false,
                    items: [{
                        id: 'newFilePath',
                        fieldLabel: '路径',
                        width: 440,
                        labelStyle: 'width:100px',
                        labelAlign: 'left',
                        xtype: 'textfield',
                        emptyText: '请选择一个路径',
                        value: ''
                    }, {
                        id: 'newFileName',
                        fieldLabel: '名称',
                        labelStyle: 'width:100px',
                        width: 440,
                        xtype: 'textfield',
                        labelAlign: 'left',
                        allowBlank: false,
                        blankText: '名称不允许为空',
                        invalidText: '名称不允许为空',
                        maskRe: /^[^\s]+$/,
                        regexText: '不允许为空格',
                        msgTarget: 'under',
                        validationDelay: 0 // 验证时长
                    }]
                }],
                /** 监听器 */
                listeners: {
                    render: function (e) {
                        $('#treeUrl1-body>div').niceScroll({
                            cursorborder: '1px solid #c5c5c5',
                            cursorcolor: '#c5c5c5',
                            autohidemode: 'leave'
                        })
                    },
                    afterrender: function (e) {
                        var leftresource = Ext.getCmp('leftresource').getController(),
                            record = leftresource.selected;
                        if (record) {
                            // 如果双击选中的不是叶子节点
                            if (!record.data.leaf) {
                                // 给保存时用到的参数赋值
                                leftresource.nodeId = record.data.id;
                                leftresource.fileName = record.data.text;
                                if (record.parentNode) {
                                    leftresource.pId = record.parentNode.data.id;
                                } else {
                                    leftresource.pId = record.data.id;
                                }
                                if (record.data.node) {
                                    leftresource.serverPath = record.data.node.path;
                                    Ext.getCmp('leftresource').getController().serverPath = record.data.node.path;
                                }
                                Ext.getCmp('newFilePath').setValue(leftresource.getParentNamePath(record));
                            } else {
                                Ext.getCmp('newFilePath').setValue(leftresource.getParentNamePath(record.parentNode));
                            }
                        }
                    },
                    itemclick: function (node, record, item, index, e, eOpts) {
                        var me = this,
                            leftresource = Ext.getCmp('leftresource').getController();

                        // 如果双击选中的不是叶子节点
                        if (!record.data.leaf) {
                            // 当前选中节点
                            leftresource.selected = record;
                            // 给保存时用到的参数赋值
                            leftresource.nodeId = record.data.id;
                            leftresource.fileName = record.data.text;
                            if (record.parentNode) {
                                leftresource.pId = record.parentNode.data.id;
                            }
                            if (record.data.node) {
                                leftresource.serverPath = record.data.node.path;
                                Ext.getCmp('leftresource').getController().serverPath = record.data.node.path
                            }
                            Ext.getCmp('newFilePath').setValue(leftresource.getParentNamePath(leftresource.selected))
                        } else {
                            Ext.getCmp('newFilePath').setValue(leftresource.getParentNamePath(record.parentNode))
                        }
                    }
                }
            }],
            buttons: [{
                id: 'saveBtn',
                cls: 'sure',
                text: '确定',
                style: 'background:rgba(74,144,226,1);border-radius:2px;margin: 4px 10px;',
                height: 30,
                width: 84,
                handler: function () {
                    if (!Ext.getCmp('create-form').isValid()) return false;
                    var leftresource = Ext.getCmp('leftresource').getController(),
                        newFileName = Ext.getCmp('newFileName').getValue(),
                        newFilePath = Ext.getCmp('newFilePath').getValue();

                    // 判断路径不能为空
                    if (!newFilePath) {
                        me.onSaveErroTip('#saveBtn', '130px', '请选择保存路径！');
                        return false;
                    }
                    var createNode;
                    if (leftresource.selected) {
                        if (leftresource.selected.data.leaf) {
                            createNode = leftresource.selected.parentNode;
                        } else {
                            createNode = leftresource.selected;
                        }
                    }
                    Ext.Ajax.request({
                        async: false,
                        method: "POST",
                        url: window.baseURL + 'catalog/save',
                        params: {
                            file: '',
                            serverPath: '',
                            fileName: newFileName,
                            pId: createNode ? createNode.id : 4,
                            userId: '',
                            objType: 'F'
                        },
                        success: function (response, opts) {
                            var data = Ext.decode(response.responseText);
                            switch (data.status) {
                                case 0:
                                    // 成功
                                    Ext.getCmp('newFileList').destroy();
                                    // 刷新左侧树，保证文件夹加入后被正确显示
                                    Ext.getCmp('leftresource').getView().getStore().load();
                                    var treeController = Ext.getCmp('leftresource').getController()
                                    // 展开到编辑节点
                                    treeController.expandTo(treeController.selected);
                                    // 清空保存用数据
                                    leftresource.selected = null;
                                    leftresource.nodeId = null;
                                    leftresource.fileName = null;
                                    leftresource.pId = null;
                                    leftresource.serverPath = null;
                                    Ext.Msg.alert('提示', '新建' + newFileName + '成功！', Ext.emptyFn);
                                    break;
                                case 1:
                                    // 失败
                                    Ext.Msg.alert('提示', '新建' + newFileName + '失败！', Ext.emptyFn);
                                    break;
                                case 2:
                                    // 名称已存在
                                    Ext.Msg.alert('提示', newFileName + '名称已存在！', Ext.emptyFn);
                                    break;
                            }
                        },

                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '新建文件夹失败！', Ext.emptyFn);
                        }
                    });
                }
            }, {
                text: '取消',
                cls: 'cancel',
                height: 30,
                width: 84,
                style: 'background:rgba(74,144,226,1);border-radius:2px;margin: 4px 10px;',
                handler: function (data) {
                    Ext.getCmp('newFileList').destroy();
                }
            }],
            listeners: {
                show: function () {
                    Ext.getCmp('newFileName').focus();
                }
            }
        }).show();
    },

    /** 导入文件 */
    importProject: function () {
        /** 新建打开项目弹窗 */
        Ext.create('Ext.window.Window', {
            title: '导入项目',
            tooltip: '导入项目',
            id: 'importProject',
            width: 420,
            height: 550,
            modal: true,
            plain: true,
            layout: 'border',
            closable: true,
            border: false,
            header: {
                height: 22,
                style: 'padding:1px 5px;background-image: linear-gradient(-180deg, #eee 0%, #ddd 100%);border-radius:5px 5px 0px 0px;',
                border: true
            },
            items: [{
                region: 'center',
                width: 320,
                layout: 'anchor',
                border: false,
                style: "background:rgba(74,144,226,1);border-radius:2px;",
                items: [{
                    anchor: '100% 100%',
                    layout: 'anchor',
                    autoScroll: false,
                    border: false,
                    id: 'treeOpen',
                    items: [{
                        id: "treeUrl",
                        xtype: "treepanel",
                        useArrows: true,                // 节点展开+，-图标全部改为小三角
                        expanded: true,                 // 默认展开
                        region: 'west',
                        width: '30%',
                        rootVisible: false,
                        bodyBorder: false,
                        headerBoders: false,
                        // 资源树（数据集)
                        store: {
                            storeId: 'Resources',       // 数据集ID
                            root: {                     // 根节点配置
                                id: '4',                // 根节点ID
                                expanded: true,         // 默认展开
                                text: ''                // 根节点名称
                            },
                            proxy: {                    // 访问代理
                                type: 'ajax',           // 类型异步
                                api: {
                                    read: window.baseURL + 'catalog/folderTree'
                                }
                            }
                        },
                        listeners: {
                            render: function () {
                                $('#treeOpen-body').niceScroll({
                                    cursorborder: '1px solid #c5c5c5',
                                    cursorcolor: '#c5c5c5',
                                    autohidemode: 'leave'
                                });
                            },
                            itemclick: function (node, record, item, index, e, eOpts) {
                                // 点击项目名字，获取id和文件名
                                var leftresource = Ext.getCmp('leftresource').getController();
                                leftresource.nodeId = record.data.id;
                                leftresource.fileName = record.data.text;
                            },
                            resize: function () {
                                $('#treeOpen-body').getNiceScroll().resize();
                            }
                        }
                    }]
                }]
            }],
            buttons: [{
                cls: 'sure',
                text: '确定',
                width: '76px',
                height: '26px',
                border: false,
                style: 'background:rgba(74,144,226,1);border-radius:2px;padding:0px',
                handler: function () {
                    var leftresource = Ext.getCmp('leftresource').getController();
                    // 导入接口
                    Ext.Ajax.request({
                        async: false,
                        method: 'POST',
                        url: window.baseURL + 'catalog/importProject',
                        params: {
                            node: leftresource.nodeId
                        },
                        success: function (response, opts) {
                            var data = Ext.util.JSON.decode(response.responseText);
                            if (data.status == 0) {
                                // 刷新数据
                                var page = Map.get(Const.PAGE_OBJECT),
                                    leftresource = Ext.getCmp('leftresource').getController(),
                                    treeobj = {
                                        id: leftresource.nodeId,        // 根节点ID
                                        expanded: true,         // 默认展开
                                        text: leftresource.fileName              // 根节点名称
                                    };
                                Ext.getCmp('leftresource').store.setRootNode(treeobj);
                                Ext.getCmp('leftresource').store.setRootVisible(true);
                                Ext.getCmp('importProject').destroy();
                                // 新建项目后将新建，打开的功能启用
                                var topToolItems = Ext.getCmp('topRegion').items.items;
                                topToolItems.forEach(function (item) {
                                    if (item.id == 'addFile' || item.id == 'openObjectPage' || item.id == "importProject") {
                                        item.setDisabled(false);
                                    }
                                })
                            }
                        },
                        failure: function (response, opts) {
                            loadMask.destroy();
                            Ext.Msg.alert('提示', '保存文件失败！', Ext.emptyFn);
                        }
                    });
                }
            }, {
                cls: 'cancel',
                text: '取消',
                width: '76px',
                height: '26px',
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                handler: function (data) {
                    Ext.getCmp('importProject').destroy();
                }
            }]
        }).show();
    },

    /** 添加现有项 */
    existingProject: function () {
        var me = this;
        Ext.create('Ext.window.Window', {
            title: '资源：',
            tooltip: '资源：',
            id: 'existingProject',
            width: 420,
            height: 550,
            modal: true,
            plain: true,
            layout: 'border',
            closable: true,
            border: false,
            header: {
                height: 22,
                style: 'padding:1px 5px;background-image: linear-gradient(-180deg, #eee 0%, #ddd 100%);border-radius:5px 5px 0px 0px;',
                border: true
            },
            items: [{
                region: 'center',
                width: 320,
                layout: 'anchor',
                border: false,
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                items: [{
                    anchor: '100% 100%',
                    layout: 'anchor',
                    autoScroll: false,
                    border: false,
                    id: 'treeOpen',
                    items: [{
                        id: 'treeUrl',
                        xtype: 'treepanel',
                        useArrows: true,                // 节点展开+，-图标全部改为小三角
                        expanded: true,                 // 默认展开
                        region: 'west',
                        width: '30%',
                        rootVisible: false,
                        bodyBorder: false,
                        headerBoders: false,
                        // 资源树（数据集）
                        store: {
                            storeId: 'Resources',       // 数据集ID
                            root: {                     // 根节点配置
                                id: '4',                // 根节点ID
                                expanded: true,         // 默认展开
                                text: ''                // 根节点名称
                            },
                            proxy: {                    // 访问代理
                                type: 'ajax',           // 类型异步
                                api: {
                                    read: window.baseURL + 'catalog/tree?type=dds'
                                }
                            }
                        },
                        listeners: {
                            render: function () {
                                $('#treeOpen-body').niceScroll({
                                    cursorborder: '1px solid #c5c5c5',
                                    cursorcolor: '#c5c5c5',
                                    autohidemode: 'leave'
                                });
                            },
                            itemclick: function (node, record, item, index, e, eOpts) {
                                // 点击项目名字，获取id和文件名
                                var leftresource = Ext.getCmp('leftresource').getController();
                                leftresource.nodeId = record.data.id;
                                leftresource.fileName = record.data.text;
                                Ext.getCmp("new_mbt_exp1").setValue(record.data.node.memo);
                            }
                        }
                    }]
                }]
            }],
            buttons: [{
                cls: 'sure',
                text: '确定',
                width: '76px',
                height: '26px',
                border: false,
                style: 'background:rgba(74,144,226,1);border-radius:2px;padding:0px',
                handler: function () {
                    var leftresource = Ext.getCmp('leftresource').getController(),
                        // 获取选中文件nodeid
                        subfileNodeId = Ext.getCmp('leftresource').getController().getView().getSelectionModel().getSelection()[0].id,
                        // 获取选中文件name
                        projectName = Ext.getCmp('leftresource').getController().getView().getSelectionModel().getSelection()[0].data.text;

                    // 导入接口
                    Ext.Ajax.request({
                        async: false,
                        method: "POST",
                        url: window.baseURL + "catalog/addExistItem",
                        params: {
                            sourceId: leftresource.nodeId,
                            targetId: subfileNodeId
                        },
                        success: function (response, opts) {
                            var data = Ext.util.JSON.decode(response.responseText);
                            if (data.status == 0) {
                                Ext.getCmp('existingProject').destroy();
                                // 刷新资源
                                Ext.getCmp('leftresource').getView().getStore().load();
                                var treeController = Ext.getCmp('leftresource').getController()
                                // 展开到编辑节点
                                treeController.expandTo(treeController.selected);
                            }
                        },
                        failure: function (response, opts) {
                            loadMask.destroy();
                            Ext.Msg.alert('提示', '保存文件失败！', Ext.emptyFn);
                        }
                    });

                    // 新建项目后将新建，打开的功能启用
                    var topToolItems = Ext.getCmp('topRegion').items.items;
                    topToolItems.forEach(function (item) {
                        if (item.id == 'addFile' || item.id == 'importProject') {
                            item.setDisabled(false);
                        }
                    })
                }
            }, {
                cls: 'cancel',
                text: '取消',
                width: '76px',
                height: '26px',
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                handler: function (data) {
                    Ext.getCmp('existingProject').destroy();
                }
            }]
        }).show();
    },


    /** 打开项目文件 */
    onOpen: function () {
        // 如果未打开项目,提示警告
        if (Ext.getCmp('leftresource').store.root.id == '4') {
            Ext.Msg.alert('警告', '请先打开项目', Ext.emptyFn)
            return false;
        }
        var leftresource = Ext.getCmp('leftresource').getController(),
            resourceCtrl = Ext.getCmp('leftresource').getController(),
            resourceCtrlRootId = Ext.getCmp('leftresource').getRootNode().data.id,
            resourceCtrlRootName = Ext.getCmp('leftresource').getRootNode().data.text;

        if (Ext.get('treeOpenUrl')) {
            Ext.get('treeOpenUrl').destroy();
        }
        Ext.create('Ext.window.Window', {
            title: '打开：',
            height: 320,
            width: 400,
            id: 'openFile',
            layout: 'fit',
            header: {
                height: 22,
                style: 'padding:1px 5px;background-image: linear-gradient(-180deg, #eee 0%, #ddd 100%);border-radius:5px 5px 0px 0px;',
                border: true
            },
            items: [{
                id: 'treeOpenUrl',
                xtype: 'treepanel',
                useArrows: true,                // 节点展开+，-图标全部改为小三角
                expanded: true,                 // 默认展开
                region: 'west',
                width: '50%',
                rootVisible: false,
                bodyBorder: false,
                headerBoders: false,
                // 资源树（数据集）
                store: {
                    storeId: 'Resources',       // 数据集ID
                    root: {                     // 根节点配置
                        id: resourceCtrlRootId, // 根节点ID
                        expanded: true,         // 默认展开
                        text: resourceCtrlRootName
                    },
                    proxy: {                    // 访问代理
                        type: 'ajax',           // 类型异步
                        api: {
                            read: window.baseURL + 'catalog/tree?type=dds'
                        }
                    }
                },
                // 监听器
                listeners: {
                    render: function () {
                        // 滚动条
                        $('#treeOpenUrl-body>div').niceScroll({
                            cursorborder: '1px solid #c5c5c5',
                            cursorcolor: '#c5c5c5',
                            autohidemode: 'leave'
                        })
                    },
                    itemclick: function (node, record, item, index, e, eOpts) {
                        var me = this,
                            leftresource = Ext.getCmp('leftresource').getController();

                        preOpenfile_Record = record;
                        preOpenfile_serverPath = leftresource.serverPath;
                        // 如果双击选中的是叶子节点
                        if (record.data.leaf) {
                            window.parent.flage = false;
                            leftresource.primitive = record;
                            // 当前选中节点
                            leftresource.selected = record;
                            // 给保存时用到的参数赋值
                            leftresource.nodeId = record.data.id;
                            leftresource.serverPath = record.data.node.path;
                        }
                    }
                }
            }],
            buttons: [{
                cls: 'sure',
                text: '确定',
                height: '26px',
                width: '76px',
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                handler: function () {
                    var me = this,
                        leftresource = Ext.getCmp('leftresource').getController();

                    if (!leftresource.selected) {
                        Ext.Msg.alert('无效操作', '请正确选择文件！');
                        return false;
                    }
                    // 添加/切换Tab页
                    var tabPanel = Ext.getCmp('centerEdit'),
                        pageId = 'newTab' + leftresource.nodeId,
                        t = Ext.getCmp(pageId);
                    if (!t) {
                        // 不存在新增panel
                        tabPanel.add({
                            title: preOpenfile_Record.data.node.title.replace('.dds', ''),
                            id: pageId,
                            autoScroll: false,
                            width: "100%",
                            height: "100%",
                            bodyStyle: 'overflow: auto!important;',
                            html: '<div class="graph"  style="width:10000px;height: 10000px;overflow:hidden;cursor: default; background-color:white;"><div style="position:fixed;right:0px;top:100px;width: 100%;"></div></div>',
                            closable: true,
                            listeners: {
                                beforeclose: tabPanel.getController().onBeforeClose
                            }
                        });
                    }
                    tabPanel.setActiveTab(pageId);
                    // 加载MxGraph编辑器
                    leftresource.loadEditor(pageId);
                    var page = Map.get(Const.PAGE_OBJECT);
                    // 加载元件到编辑区
                    leftresource.load();
                    Ext.getCmp('openFile').destroy();
                    // 设置另存 disabled
                    Ext.getCmp('onSaveAs').setDisabled(false);
                    // 还原路径
                    leftresource.serverPath = preOpenfile_serverPath;
                }
            }, {
                text: '取消',
                cls: 'cancel',
                height: '26px',
                width: '76px',
                style: 'background:rgba(74,144,226,1);border-radius:2px;',
                handler: function (data) {
                    Ext.getCmp('openFile').destroy();
                }
            }]
        }).show();
    },

    /** 保存另存失败提示信息 */
    onSaveErroTip: function (dom, left, message) {
        $(dom).before('<span class="savaErro" style="left:' + left + '">' + message + '</span>');
        setTimeout(function () {
            $(".savaErro").remove();
        }, 1000);
    },

    /** 保存 */
    onSave: function () {
        // 如果未打开项目,提示警告
        if (Ext.getCmp('leftresource').store.root.id == '4') {
            Ext.Msg.alert('警告', '请先打开项目再保存！', Ext.emptyFn);
            return false;
        }
        window.parent.flage = true;
        var me = this,
            loadMask,
            // 编辑区控制器
            editController = Ext.getCmp('centerEdit').getController(),
            // 资源树控制器
            resourceCtrl = Ext.getCmp('leftresource').getController(),
            resourceCtrlRootId = Ext.getCmp('leftresource').getRootNode().data.id,
            resourceCtrlRootName = Ext.getCmp('leftresource').getRootNode().data.text;

        // 当前活动页是默认页面时不执行任何操作
        if (Const.DEFAULT_TAB === editController.getActiveId()) {
            return false;
        }
        // 当前Page对象
        var page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph;
        if (!graph) return false;
        var encoder = new mxCodec(),
            node = encoder.encode(graph.getModel());
        page.graphXml = mxUtils.getPrettyXml(node);

        // 保存文件
        function toSave(page) {
            // 文件类型（0：资源树文件；1：模板树文件）
            var fileType = page.fileType,
                rootId = 4;
            if (fileType === '1') rootId = 400;
            var json = me.pageToJson(page),
                create = false;
            // 是否新建资源文件
            for (var i = 0; i < me.newFileIdArray.length; i++) {
                if (me.newFileIdArray[i] == page.id) create = true;
            }
            // 保存文件弹框
            if (create) {
                var win = new Ext.window.Window({
                    title: '保存文件',
                    height: 360,
                    width: 400,
                    id: 'newFileList2',
                    layout: 'fit',
                    modal: true,
                    style: 'background-color:#f1f1f1;',
                    header: {
                        height: 22,
                        style: 'padding:1px 5px;background-image: linear-gradient(-180deg, rgb(238, 238, 238) 0%, rgb(221, 221, 221) 100%);border-radius:5px 5px 0px 0px;',
                        border: true
                    },
                    items: [
                        {
                            id: 'treeUrl2',
                            xtype: 'treepanel',
                            useArrows: true,                // 节点展开+，-图标全部改为小三角
                            expanded: true,                 // 默认展开
                            region: 'west',
                            width: '100%',
                            height: '40%',
                            border: false,
                            bodyBorder: false,
                            headerBoders: false,            // 去掉边框
                            // 资源树（数据集）
                            store: {
                                storeId: 'Resources',       // 数据集ID
                                root: {                     // 根节点配置
                                    id: resourceCtrlRootId, // 根节点ID
                                    expanded: true,         // 默认展开
                                    text: resourceCtrlRootName // 根节点名称
                                },
                                proxy: {                    // 访问代理
                                    type: 'ajax',           // 类型异步
                                    api: {
                                        read: window.baseURL + 'catalog/tree?type=dds'
                                    }
                                }
                            },
                            bbar: [{
                                id: "createProjectBar",
                                frame: true,
                                xtype: "form",
                                buttonAlign: "center",
                                labelWidth: 200,
                                border: false,
                                bodyBorder: false,
                                style: "border:none;border-radius:0;padding: 0 30px;background-color:#f1f1f1;",
                                items: [{
                                    id: 'newFilePath2',
                                    fieldLabel: '路径',
                                    width: 330,
                                    labelStyle: "width:100px",
                                    style: 'background-color:#f1f1f1;margin-bottom: 0px;padding-bottom: 5px;',
                                    xtype: 'textfield',
                                    value: '',
                                    emptyText: '请选择一个路径',
                                    listeners: {
                                        specialkey: function (field, e) {         // 回车确定
                                            if (e.getKey() == Ext.EventObject.ENTER) {
                                                Ext.getCmp("saveBtn").handler()
                                            }
                                        }
                                    }
                                }, {
                                    id: 'newFileName2',
                                    fieldLabel: '名称',
                                    labelStyle: "width:100px",
                                    width: 330,
                                    style: 'background-color:#f1f1f1;margin-bottom: 0px;padding-bottom: 5px;',
                                    xtype: 'textfield',
                                    msgTarget: "under",
                                    validationDelay: 0,// 验证时长
                                    value: editController.getActiveTitle().replace(/\*$/, ''),
                                    listeners: {
                                        specialkey: function (field, e) {             // 回车确定
                                            if (e.getKey() == Ext.EventObject.ENTER) {
                                                Ext.getCmp("saveBtn").handler()
                                            }
                                        }
                                    }
                                }]
                            }],
                            listeners: {
                                render: function () {
                                    $('#treeUrl2-body>div').niceScroll({
                                        cursorborder: '1px solid #c5c5c5',
                                        cursorcolor: '#c5c5c5',
                                        autohidemode: 'leave'
                                    });
                                },
                                itemclick: function (node, record, item, index, e, eOpts) {
                                    // 如果单击选中的不是叶子节点
                                    if (!record.data.leaf) {
                                        // 当前选中文件夹
                                        page.treeSource.selected = record;
                                        // 给保存时用到的参数赋值
                                        page.treeSource.nodeId = '';
                                        page.treeSource.pId = record.data.id;
                                        page.treeSource.serverPath = '/Project/Reports/' + resourceCtrlRootName;
                                        Ext.getCmp('newFilePath2').setValue('资源文件目录/' + resourceCtrl.getParentNamePath(page.treeSource.selected));
                                    } else {
                                        page.treeSource.selected = record;
                                        var fileName = record.data.node.path.split('/')[record.data.node.path.split('/').length - 1]
                                        page.treeSource.serverPath = record.data.node.path.replace('/' + fileName, '')
                                        page.treeSource.pId = record.data.node.pId
                                        Ext.getCmp('newFilePath2').setValue(resourceCtrl.getParentNamePath(record.parentNode))
                                        Ext.getCmp('newFileName2').setValue(record.raw.text.replace(/\.dds/, ''))
                                    }
                                },
                                afterRender: function () {
                                    if (page.treeSource.selected) {
                                        var record = page.treeSource.selected;
                                        // 给保存时用到的参数赋值
                                        page.treeSource.nodeId = '';
                                        page.treeSource.pId = record.data.id;
                                        page.treeSource.serverPath = '/Project/Reports';
                                        // 如果单击选中的是叶子节点
                                        if (record.data.leaf) {
                                            Ext.getCmp('newFilePath2').setValue(resourceCtrl.getParentNamePath(record.parentNode))
                                        } else {
                                            Ext.getCmp('newFilePath2').setValue(resourceCtrl.getParentNamePath(page.treeSource.selected))
                                        }
                                    }
                                }
                            }
                        }],
                    buttons: [{
                        id: 'saveBtn',
                        cls: 'sure',
                        text: '确定',
                        height: '26px',
                        width: '76px',
                        style: 'background:rgba(74,144,226,1);border-radius:2px;',
                        handler: function () {
                            if (!Ext.getCmp('createProjectBar').isValid()) return false;
                            var loadMask = new Ext.LoadMask(Ext.getCmp('newFileList2'), {
                                removeMask: false,
                                hideMode: 'display',
                                userCls: 'successMask',
                                msg: '保存成功！'
                            });
                            if (Ext.getCmp('centerEdit').getActiveTab()) {
                                var page = Map.get(Const.PAGE_OBJECT),
                                    graph = page.activeGraph;
                                if (Ext.getCmp('centerEdit').getActiveTab().title.replace(/\*$/, '') == page.property.title) {
                                    page.property.title = Ext.getCmp('newFileName2').getValue();
                                } else {
                                    page.property.title = $(".pageTitle").val();
                                }
                            } else {
                                page.property.title = $(".pageTitle").val();
                            }

                            var treeController = Ext.getCmp('leftresource').getController();
                            if (Ext.getCmp('newFileName2').getValue())
                                page.treeSource.fileName = Ext.getCmp('newFileName2').getValue() + '.dds';
                            var serverPath = page.treeSource.serverPath,
                                pId = page.treeSource.pId;
                            // 如果选中的是子节点，取父文件夹
                            if (page.treeSource.selected.data && page.treeSource.selected.data.leaf) {
                                var record = page.treeSource.selected,
                                    selectedName = record.data.node.path.split('/')[record.data.node.path.split('/').length - 1];
                                serverPath = record.data.node.path.replace('/' + selectedName, '');
                                pId = record.data.node.pId;
                            } else {
                                if (page.treeSource.selected.data) {
                                    if (page.treeSource.selected.data.node) {
                                        serverPath = page.treeSource.selected.data.node.path
                                    } else {
                                        serverPath = "/Project/Reports/" + page.treeSource.selected.data.text
                                    }
                                }
                            }
                            serverPath += '/' + page.treeSource.fileName;

                            // 为任务绑定表单的元件添加serverPath
                            var cells = page.activeGraph.getChildCells();
                            for (var w = 0; w < cells.length; w++) {
                                if (page.items && page.items[cells[w].id] && page.items[cells[w].id].formReference) {
                                    cells[w].setAttribute('formReference', serverPath)
                                }
                            }
                            var encoder = new mxCodec(),
                                page = Map.get(Const.PAGE_OBJECT),
                                graph = page.activeGraph;
                            node = encoder.encode(graph.getModel());
                            page.graphXml = mxUtils.getPrettyXml(node);
                            var json = me.pageToJson(page, page.treeSource.fileName);
                            // 判断文件名不能为空
                            if (page.treeSource.fileName == '') {
                                me.onSaveErroTip('#saveBtn', '130px', '文件名不能为空！');
                                return false;
                            }
                            // 判断路径不能为空
                            if (!page.treeSource.serverPath) {
                                me.onSaveErroTip('#saveBtn', '135px', '路径不能为空！');
                                return false
                            }
                            loadMask.show();

                            /* 取得文件内容 */
                            Ext.Ajax.request({
                                async: false,
                                method: "POST",
                                url: window.baseURL + 'catalog/save',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                                params: {
                                    node: page.treeSource.nodeId,
                                    file: json,
                                    fileName: page.treeSource.fileName,
                                    serverPath: serverPath,
                                    pId: pId,
                                    objType: 'dds',
                                    userId: ''
                                },
                                success: function (response, opts) {
                                    var data = Ext.util.JSON.decode(response.responseText);
                                    if (data.status == 0) {
                                        // 显示文件内容用的，改了就没有回显了
                                        //treeController.serverPath = serverPath;
                                        // 设置另存 disabled
                                        Ext.getCmp('onSaveAs').setDisabled(false);
                                        // 展开到编辑节点
                                        var treeController = Ext.getCmp('leftresource').getController();
                                        treeController.expandTo(page.treeSource.selected);
                                    } else if (data.status == 1) {
                                        loadMask.destroy();
                                        Ext.Msg.alert('提示', '保存文件失败！', Ext.emptyFn);
                                        return false
                                    } else if (data.status == 2) {
                                        loadMask.destroy();
                                        me.onSaveErroTip('#saveBtn', '85px', '文件名称已存在！请修改');
                                        return false
                                    }
                                    // 关闭当前新建页
                                    Ext.getCmp('centerEdit').remove(page.id);
                                    treeController = rootId == 4 ? Ext.getCmp('leftresource').getController() : Ext.getCmp('lefttemplate').getController();

                                    // 保留保存使用到的全局变量
                                    treeController.fileName = data.data.name;
                                    treeController.serverPath = data.data.path;
                                    treeController.pId = data.data.PId;
                                    treeController.nodeId = data.data.nodeId;

                                    // 打开当前新建页
                                    var openSave = treeController.getView().getStore().on({
                                        load: function (store, records, options) {
                                            for (var i = 0; i < store.getCount(); i++) {
                                                var recored = store.getAt(i);
                                                if (recored.data.id == treeController.nodeId) {
                                                    // 回显选中树
                                                    var tree = rootId == 4 ? Ext.getCmp('leftresource') : Ext.getCmp('lefttemplate');
                                                    tree.getSelectionModel().select(tree.getStore().getNodeById(data.data.nodeId))
                                                    treeController.onItemdblclick(this, recored)
                                                    setTimeout(function () {
                                                        $('#newTab' + data.data.nodeId + '-body').css("height", "100%");
                                                        openSave.destroy();
                                                    }, 0)
                                                }
                                            }
                                        },
                                        destroyable: true
                                    });

                                    setTimeout(function () {
                                        loadMask.destroy();
                                        Ext.getCmp('newFileList2').destroy();
                                        if (me.previewFlag) {
                                            me.onPreview();
                                            me.previewFlag = false;
                                        }
                                    }, 500);
                                    this.newFileIdArray = [];
                                    // 清空该页面回退历史
                                    if (page.history) {
                                        if (page.history.back) {
                                            if (page.history.back[page.id]) {
                                                delete page.history.back[page.id];
                                            }
                                        }
                                        if (page.history.forward) {
                                            if (page.history.forward[page.id]) {
                                                delete page.history.forward[page.id];
                                            }
                                        }
                                    }
                                },
                                failure: function (response, opts) {
                                    loadMask.destroy();
                                    Ext.Msg.alert('提示', '保存文件失败！', Ext.emptyFn);
                                }
                            });
                        }
                    }, {
                        text: '取消',
                        cls: 'cancel',
                        height: '26px',
                        width: '76px',
                        style: 'background:rgba(74,144,226,1);border-radius:2px;',
                        handler: function (data) {
                            Ext.getCmp('newFileList2').destroy();
                        }
                    }],
                    listeners: [{
                        afterrender: function () {
                            // 自动获取焦点
                            Ext.getCmp('newFileName2').focus();
                            $("#treeUrl2").keyup(function (e) {
                                if (e.keyCode == 13) {
                                    Ext.getCmp("saveBtn").handler()
                                }
                            })
                        }
                    }]
                }).show();
            } else {
                // 取得文件内容
                // 子文件nodeArr集合
                var nodeSubfileArr = '',
                    page = Map.get(Const.PAGE_OBJECT),
                    graph = page.activeGraph,
                    nodes = graph.getDefaultParent().children;
                if (nodes != null) {
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].style == 'SubWorkFlow') {
                            nodeSubfileArr += nodes[i].getAttribute('node') + ',';
                        }
                    }
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].style == 'SubWorkFlow') {
                            if (nodes[i].getAttribute('noidArr')) {
                                nodeSubfileArr += nodes[i].getAttribute('noidArr') + ',';
                            }
                        }
                    }
                    // 过滤字符
                    nodeSubfileArr = nodeSubfileArr.substring(0, nodeSubfileArr.length - 1);
                }
                Ext.Ajax.request({
                    async: false,
                    method: 'POST',
                    url: window.baseURL + 'catalog/save',
                    params: {
                        node: page.treeSource.nodeId,
                        file: json,
                        fileName: page.treeSource.fileName,
                        serverPath: page.treeSource.serverPath,
                        pId: page.treeSource.pId,
                        objType: 'dds',
                        userId: '',
                        memo: nodeSubfileArr
                    },
                    success: function (response, opts) {
                        var data = Ext.util.JSON.decode(response.responseText);
                        if (data.status == 0) {
                            if (loadMask) {
                                setTimeout(function () {
                                    loadMask.destroy();
                                }, 100);
                            }
                            if (/\*$/.test(Ext.getCmp('centerEdit').getActiveTab().getTitle())) {
                                Ext.getCmp('centerEdit').getActiveTab().setTitle(Ext.getCmp('centerEdit').getActiveTab().getTitle().replace(/\*$/, ''))
                            }
                            // 设置保存弹窗的根节点与打开项目的节点相同
                            var leftresource = Ext.getCmp('leftresource').getController();
                            // 文件保存成功提示
                            Ext.Msg.alert('提示', '保存文件成功', Ext.emptyFn);
                        } else if (data.status == 1) {
                            if (loadMask) {
                                loadMask.destroy();
                            }
                            Ext.Msg.alert('提示', '保存文件失败！', Ext.emptyFn);
                            return false
                        } else if (data.status == 2) {
                            loadMask.destroy();
                            Ext.Msg.alert('提示', '文件名称已存在！请修改！', Ext.emptyFn);
                            return false
                        }

                        // 清空该页面回退历史
                        if (page.history) {
                            if (page.history.back) {
                                if (page.history.back[page.id]) {
                                    delete page.history.back[page.id];
                                }
                            }
                            if (page.history.forward) {
                                if (page.history.forward[page.id]) {
                                    delete page.history.forward[page.id];
                                }
                            }
                        }
                    },
                    failure: function (response, opts) {
                        loadMask.hide();
                        Ext.Msg.alert('提示', '保存文件失败！', Ext.emptyFn);
                    }
                });
            }
        }

        toSave(page);
        window.flage = true;
    },

    /** Page对象转JSON */
    pageToJson: function (page, fileNameValue) {
        var currentItem, currentItems = {};
        for (var objId in page.items) {
            currentItem = page.items[objId];
            currentItems[objId] = {};
            for (var att in currentItem) {
                if ((!Ext.isFunction(
                    currentItem[att]))
                    && att != 'domProxy'
                    && att != 'superclass'
                    && att != 'defaultConfig'
                    && att != 'config'
                    && att != 'alternateClassName'
                    && att != 'requires'
                    && att != '$className'
                    && att != 'isInstance'
                    && att != '$configPrefixed'
                    && att != '$configStrict'
                    && att != 'isConfiguring'
                    && att != 'isFirstInstance'
                    && att != 'destroyed'
                    && att != '$links'
                    && att != 'clearPropertiesOnDestroy'
                    && att != 'clearPrototypeOnDestroy'
                )
                    currentItems[objId][att] = currentItem[att];
            }
        }
        var json = '{"version":"',
            fileName = '',
            nodeId = '"' + Map.get(Const.PAGE_OBJECT).treeSource.nodeId + '"',
            nodeSubfileArr = '',
            page = Map.get(Const.PAGE_OBJECT),
            editor = page.activeEditor,
            graph = page.activeGraph;
        // 文件格式处理
        if (fileNameValue) {
            fileName = '"' + fileNameValue.split('.dds')[0] + '"';
        } else {
            fileName = '"' + Ext.getCmp('centerEdit').getActiveTab().title.split('*')[0] + '"';
        }
        // 子文件nodeArr集合
        var nodes = graph.getDefaultParent().children;
        if (nodes != null) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].style == 'SubWorkFlow') {
                    nodeSubfileArr += nodes[i].getAttribute('node') + ',';
                }
            }
            // 过滤字符
            nodeSubfileArr = nodeSubfileArr.substring(0, nodeSubfileArr.length - 1);
        }
        // 子文件内包含文件集合
        var nodeArrs = null
        if (nodeArrs != null) {
            nodeArrs = nodeArrs.split(',')
            for (var i = 0; i < nodeArrs.length; i++) {
                nodeSubfileArr += nodeArrs[i] + ',';
            }
            nodeSubfileArr = nodeSubfileArr.substring(0, nodeSubfileArr.length - 1);
        }
        nodeSubfileArr = '"' + nodeSubfileArr + '"'

        //日期时间
        var dateNYREnd = Ext.getCmp('rightProperty').getController().transTime(page.coordinator.dateFieldEnd),
            dateNYREndHour = page.coordinator.dateFieldEndTimeHours,
            dateNYREndMinutes = page.coordinator.dateFieldEndTimeMinutes,
            dateNYRStart = Ext.getCmp('rightProperty').getController().transTime(page.coordinator.dateFieldStart),
            dateNYRStartHour = page.coordinator.dateFieldStartTimeHours,
            dateNYRStartMinutes = page.coordinator.dateFieldStartTimeMinutes;
        page.coordinator.end = dateNYREnd + 'T' + dateNYREndHour + ':' + dateNYREndMinutes + '+0800';
        page.coordinator.start = dateNYRStart + 'T' + dateNYRStartHour + ':' + dateNYRStartMinutes + '+0800';

        json += page.version + '",';
        json += '"memo":';
        json += nodeSubfileArr + ',';
        json += '"id":';
        json += Ext.encode(page.id) + ',';
        json += '"coordinator":';
        json += Ext.encode(page.coordinator) + ',';
        json += '"name":';
        json += fileName + ',';
        json += '"node":';
        json += nodeId + ',';
        json += '"fileType":';
        json += Ext.encode(page.fileType) + ',';
        json += '"param":';
        json += Ext.encode(page.param) + ",";
        json += '"params":';
        json += Ext.encode(page.params) + ",";
        json += '"graphXml":';
        json += Ext.encode(page.graphXml) + ",";
        json += '"property":';
        json += Ext.encode(page.property) + ",";
        json += '"items":';
        json += Ext.encode(page.items) + ",";
        json += '"cellParam":';
        json += Ext.encode(page.cellParam);
        json += '}';
        return json;
    },

    /** 另存 */
    onSaveAs: function () {
        // 如果未打开项目,提示警告
        if (Ext.getCmp('leftresource').store.root.id == '4') {
            Ext.Msg.alert('警告', '请先打开项目再另存！', Ext.emptyFn);
            return false;
        }
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            // 文件类型（0：资源树文件；1：模板树文件）
            fileType = page.fileType,
            rootId = 4;
        if (fileType === '1') rootId = 400;
        var newPage = {};
        $.extend(true, newPage, page);
        // 资源树控制器
        var treeController = Ext.getCmp('leftresource').getController(),
            // 编辑区控制器
            editController = Ext.getCmp('centerEdit').getController();

        // 当前活动页是默认页面时不执行任何操作
        if (Const.DEFAULT_TAB === editController.getActiveId()) return false;
        // 为另存修改page的组件的id
        // var newItems = {}
        var treeSource = {};
        $.extend(true, treeSource, page.treeSource);
        for (var item in newPage.items) {
            // 修改内部id
            var newID = editController.createCmpId(newPage.items[item]);
            // 替换page对象中的所有id
            newPage = JSON.parse(me.pageToJson(newPage).replace(new RegExp(item, 'g'), newID))
        }
        // 将treeSource
        newPage.treeSource = treeSource;
        // 当前Page对象
        var json = me.pageToJson(newPage);
        for (var i = 0; i < me.newFileIdArray.length; i++) {
            if (me.newFileIdArray[i] == page.id) {
                return false
            }
        }
        // 另存类型
        var typeStore = rootId == 4 ? [['0', '页面'], ['1', '模板']] : [['0', '模板'], ['1', '页面']];
        new Ext.window.Window({
            title: '另存',
            height: 360,
            width: 400,
            id: 'newFileList3',
            layout: 'fit',
            modal: true,
            autoShow: true,
            style: 'background-color:#f1f1f1;',
            header: {
                height: 22,
                style: 'padding:3px 5px;background-image: linear-gradient(-180deg, rgb(238, 238, 238) 0%, rgb(221, 221, 221) 100%);border-radius:5px 5px 0px 0px;',
            },
            items: [{
                id: 'treeUrlSave',
                xtype: 'treepanel',
                useArrows: true,                // 节点展开+，-图标全部改为小三角
                expanded: true,                 // 默认展开
                region: 'west',
                width: '100%',
                height: '80%',
                border: false,
                bodyBorder: false,
                headerBoders: false,            // 去掉边框
                rootVisible: false,
                // 资源树（数据集）
                store: {
                    storeId: 'Resources',       // 数据集ID
                    root: {                     // 根节点配置
                        id: rootId,             // 根节点ID
                        expanded: true,         // 默认展开
                        text: ''     // 根节点名称
                    },
                    proxy: {                    // 访问代理
                        type: 'ajax',           // 类型异步
                        api: {
                            read: window.baseURL + 'catalog/tree?type=dds'
                        }
                    }
                },
                bbar: [{
                    id: 'create-form3',
                    frame: true,
                    xtype: 'form',
                    buttonAlign: 'center',
                    labelWidth: 200,
                    style: 'border:none;border-radius:0;padding: 0 30px;background-color:#f1f1f1;',
                    items: [
                        {
                            id: 'newFilePath3',
                            fieldLabel: '路径',
                            width: 330,
                            labelStyle: 'width:100px',
                            style: 'background-color:#f1f1f1;margin-bottom: 0px;padding-bottom: 5px;',
                            xtype: 'textfield',
                            value: page.treeSource.selected ? Ext.getCmp('leftresource').getController().getParentNamePath(page.treeSource.selected.parentNode) : '',
                            listeners: {
                                // 回车确定
                                specialkey: function (field, e) {
                                    if (e.getKey() == Ext.EventObject.ENTER) {
                                        Ext.getCmp("saveConfirm").handler();
                                    }
                                }
                            }
                        }, {
                            id: 'newFileName3',
                            fieldLabel: '名称',
                            labelStyle: "width:100px",
                            style: 'background-color:#f1f1f1;margin-bottom: 0px;padding-bottom: 5px;',
                            width: 330,
                            xtype: 'textfield',
                            msgTarget: "under",
                            validationDelay: 0,// 验证时长
                            value: page.treeSource.fileName.split('.dds')[0],
                            listeners: {
                                specialkey: function (field, e) {
                                    // 回车确定
                                    if (e.getKey() == Ext.EventObject.ENTER) {
                                        Ext.getCmp("saveConfirm").handler();
                                    }
                                }
                            }
                        }]
                }],
                /** 监听器 */
                listeners: {
                    render: function () {
                        // 回显选中树
                        if (newPage.treeSource.selected) {
                            var myThis = this,
                                path = Ext.getCmp("leftresource").getController().getIdPath(page.treeSource.selected).split("/"),
                                childUrl = path.pop(),
                                parentUrl = path.join("/");
                            this.expandPath(parentUrl, 'id');
                            var num = 0,
                                time = setInterval(function () {
                                    num++;
                                    if (myThis.getSelectionModel().select(myThis.getStore().getNodeById(childUrl)) != undefined || num > 5) {
                                        clearInterval(time);
                                        myThis.getSelectionModel().select(myThis.getStore().getNodeById(parentUrl.split('/').pop()));
                                        return false;
                                    }
                                }, 100);
                        }
                        $('#treeUrlSave-body>div').niceScroll({
                            cursorborder: '1px solid #c5c5c5',
                            cursorcolor: '#c5c5c5',
                            autohidemode: 'leave'
                        })
                    },
                    itemclick: function (node, record, item, index, e, eOpts) {
                        var me = this,
                            leftresource = Ext.getCmp('leftresource').getController();
                        // 如果单击选中的不是叶子节点
                        if (!record.data.leaf) {
                            // 当前选中文件夹
                            newPage.treeSource.selected = record;
                            // 给保存时用到的参数赋值
                            newPage.treeSource.nodeId = '';
                            if (record.parentNode) {
                                newPage.treeSource.pId = record.data.id;
                            }
                            if (record.data.node) {
                                newPage.treeSource.serverPath = record.data.node.path;
                            }
                            Ext.getCmp('newFilePath3').setValue(leftresource.getParentNamePath(newPage.treeSource.selected));
                        } else {
                            Ext.getCmp('newFilePath3').setValue(leftresource.getParentNamePath(record.parentNode));
                            Ext.getCmp('newFileName3').setValue(record.raw.text.replace(/\.dds/, ''))
                        }
                    }
                }
            }],
            buttons: [{
                text: '确定',
                id: "saveConfirm",
                cls: "sure",
                height: '26px',
                width: '76px',
                style: "background:rgba(74,144,226,1);border-radius:2px;",
                handler: function () {
                    if (!Ext.getCmp('create-form3').isValid()) return false;
                    var loadMask = new Ext.LoadMask(Ext.getCmp('newFileList3'), {
                        removeMask: false,
                        hideMode: 'display',
                        userCls: 'successMask',
                        msg: '保存成功！'
                    });
                    loadMask.show();
                    var treeController = Ext.getCmp('leftresource').getController();
                    newPage.treeSource.fileName = Ext.getCmp('newFileName3').getValue() + '.dds';
                    if (/(\.dds)$/.test(newPage.treeSource.serverPath)) {
                        var path = newPage.treeSource.serverPath.split('/'),
                            childrenUrl = path.pop(),
                            parentUrl = path.join('/');
                        newPage.treeSource.serverPath = parentUrl;
                    }
                    newPage.treeSource.serverPath += '/' + newPage.treeSource.fileName;
                    if (!Ext.getCmp('newFileName3').getValue()) {
                        me.onSaveErroTip('#saveConfirm', '130px', '文件名不能为空！');
                        loadMask.destroy();
                        return false;
                    }
                    // 取得文件内容
                    Ext.Ajax.request({
                        async: false,
                        method: "POST",
                        url: window.baseURL + "catalog/save",
                        params: {
                            node: '',
                            file: json,
                            fileName: newPage.treeSource.fileName,
                            serverPath: newPage.treeSource.serverPath,
                            pId: newPage.treeSource.pId,
                            objType: "dds",
                            userId: ''
                        },
                        success: function (response, opts) {
                            var data = Ext.util.JSON.decode(response.responseText);
                            if (data.status == 1) {
                                loadMask.destroy();
                                Ext.Msg.alert('提示', '保存文件失败！', Ext.emptyFn);
                                return false;
                            } else if (data.status == 2) {
                                loadMask.destroy();
                                Ext.Msg.alert('提示', '文件名称已存在！请修改', Ext.emptyFn);
                                return false;
                            }
                            // 展开到编辑节点
                            treeController.expandTo(newPage.treeSource.selected);
                            treeController = rootId == 4 ? Ext.getCmp('leftresource').getController() : Ext.getCmp('lefttemplate').getController();
                            // 保留保存使用到的全局变量
                            treeController.fileName = data.data.name;
                            treeController.serverPath = data.data.path;
                            treeController.pId = data.data.PId;
                            treeController.nodeId = data.data.nodeId;
                            treeController.selected = data.data.selected;
                            // 打开另存页面
                            var openOnSave = treeController.getView().getStore().on({
                                load: function (store, records, options) {
                                    for (var i = 0; i < store.getCount(); i++) {
                                        var recored = store.getAt(i);
                                        if (recored.data.id == treeController.nodeId) {
                                            // 回显选中树
                                            var newTreeId = data.data.nodeId;
                                            var tree = rootId == 4 ? Ext.getCmp('leftresource') : Ext.getCmp('lefttemplate');
                                            tree.getSelectionModel().select(tree.getStore().getNodeById(newTreeId))
                                            // 打开另存页面
                                            treeController.onItemdblclick(this, recored)
                                            setTimeout(function () {
                                                $('#newTab' + data.data.nodeId + '-body').css("height", "100%");
                                                openOnSave.destroy()
                                            }, 0)
                                        }
                                    }
                                },
                                destroyable: true
                            });
                            setTimeout(function () {
                                loadMask.destroy();
                                Ext.getCmp('newFileList3').destroy();

                            }, 500)
                        },
                        failure: function (response, opts) {
                            loadMask.destroy();
                            Ext.Msg.alert('提示', '保存文件失败！', Ext.emptyFn);
                        }
                    });
                }
            }, {
                text: '取消',
                cls: "cancel",
                height: '26px',
                width: '76px',
                style: "background:rgba(74,144,226,1);border-radius:2px;",
                handler: function (data) {
                    Ext.getCmp('newFileList3').destroy();
                }
            }],
            listeners: {
                afterRender: function () {
                    $("#treeUrlSave").keyup(function (e) {
                        if (e.keyCode == 13) {
                            Ext.getCmp("saveConfirm").handler();
                        }
                    })
                },
                show: function () {
                    Ext.getCmp('newFileName3').focus();
                }
            }
        })
    },

    /** 复制 */
    onCopy: function (flag) {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        mxClipboard.copy(graph, graph.getSelectionCells());
    },

    /** 剪切 */
    onCut: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        mxClipboard.cut(graph, graph.getSelectionCells());
    },

    /** 粘贴 */
    onPaste: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        mxClipboard.paste(graph, graph.getSelectionCells());
    },

    /** 前进 */
    onProgress: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph,
            leftResource = Ext.getCmp('leftresource').getController();
        if (!graph || !leftResource.undoMng) return false;
        leftResource.undoMng.redo()
    },

    /** 后退 */
    onBack: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph,
            leftResource = Ext.getCmp('leftresource').getController();
        if (!graph || !leftResource.undoMng) return false;
        leftResource.undoMng.undo()
    },

    /** 左对齐 */
    onAlignLeft: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        graph.alignCells(mxConstants.ALIGN_LEFT);
    },

    /** 右对齐 */
    onAlignRight: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        graph.alignCells(mxConstants.ALIGN_RIGHT);
    },

    /** 顶部对齐 */
    onAlignTop: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        graph.alignCells(mxConstants.ALIGN_TOP);
    },

    /** 底部对齐 */
    onAlignBottom: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        graph.alignCells(mxConstants.ALIGN_BOTTOM);
    },

    /** 左右居中 */
    onAlignLRCenter: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        graph.alignCells(mxConstants.ALIGN_CENTER);
    },

    /** 上下居中 */
    onAlignTBCenter: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        graph.alignCells(mxConstants.ALIGN_MIDDLE);
    },

    /** 垂直分布 */
    onHeight: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        graph.alignCells(mxConstants.ELBOW_VERTICAL);
    },

    /** 水平分布 */
    onWidth: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        graph.alignCells(mxConstants.DIRECTION_WEST);
    },

    /** 置顶 */
    onTop: function () {
        //当前页
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph,
            editor = page.activeEditor;
        if (!graph || !editor) return false;
        editor.execute('toFront', graph.getSelectionCells())
    },

    /** 置底 */
    onBottom: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph,
            editor = page.activeEditor;
        if (!graph || !editor) return false;
        editor.execute('toBack', graph.getSelectionCells())
    },

    /** 全选/反选 */
    onSelectAll: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (!page) return false;
        var graph = page.activeGraph;
        if (!graph) return false;
        if (graph.getChildCells().length == graph.getSelectionCells().length) {
            graph.clearSelection()
        } else {
            graph.selectAll();
        }
    },

    /** 参数 */
    onParam: function () {
        // 当前活动页的对象
        var page = Map.get(Const.PAGE_OBJECT);
        var graph = page.activeGraph;
        // 未打开或参数为空不执行
        if (!page || !page.params || !page.activeGraph) return false;
        var me = this,
            // 表格数据
            data = page.params,
            // 表格标题（表头）
            columns = [
                new Ext.grid.RowNumberer({
                    header: "编号",
                    id: 'parmaNumber',
                    style: 'border-color:#f1f1f1;color:#fff;text-align:center;',
                    width: 50,
                    editor: {
                        allowBlank: false
                    }
                }), {
                    header: '名称',
                    dataIndex: 'name',
                    flex: 1,
                    id: 'parmaName',
                    style: 'border-color:#f1f1f1;color:#fff;text-align:center;',
                    editor: {
                        allowBlank: true
                    }
                }, {
                    header: '默认值',
                    dataIndex: 'default',
                    flex: 1,
                    id: 'parmaDefault',
                    style: 'border-color:#f1f1f1;color:#fff;text-align:center;',
                    editor: {
                        allowBlank: true
                    }
                }, {
                    header: '备注',
                    dataIndex: 'remark',
                    flex: 1,
                    id: 'parmaRemark',
                    style: 'border-color:#f1f1f1;color:#fff;text-align:center;',
                    editor: {
                        allowBlank: true
                    }
                }
            ],
            // 表格数据集
            store = new Ext.data.ArrayStore({
                data: data,
                fields: [{name: 'name'}, {name: 'default'}, {name: 'remark'}]
            }),
            // 弹出框的确定按钮
            confirmBtn = new Ext.Button({
                // iconCls: "Tick",
                cls: "sure",
                text: '确定',
                style: "background:rgba(74,144,226,1);border-radius:2px;",
                xtype: "button",
                listeners: {
                    "click": function () {     //弹出框的取消按钮
                        var page = Map.get(Const.PAGE_OBJECT);
                        var oldParams = page.params;
                        //二维数组结构
                        var paramsListData = store.data.items;
                        var importData = [];
                        var alterData = [];
                        for (var i = 0; i < paramsListData.length; i++) {
                            var newArray = [];
                            for (var j in paramsListData[i].data) {
                                newArray.push(paramsListData[i].data[j])
                                if (paramsListData[i].data.name == 0 || paramsListData[i].data.default == 0) {
                                    var flag = false;
                                }
                            }
                            importData.push(newArray)
                        }
                        if (flag == false) {
                            var config = {
                                title: '提示',
                                msg: '名称和默认值不能为空！'
                            };
                            Ext.Msg.show(config);
                            return false;
                        }
                        // 编辑区页签加*号标识
                        Ext.getCmp('centerEdit').getController().showTabChangeStatus('', 'params');
                        page.params = importData;

                        for (var i = 0; i < paramsListData.length; i++) {
                            var alterArray = [];
                            alterArray.push(paramsListData[i].data)
                            alterData.push(alterArray)
                        }
                        page.param = alterData;

                        // 组件变量保存
                        var tree = Ext.getCmp('cellParamTree'),
                            treeStore = tree.getStore().data.items;
                        for (var k = 0; k < treeStore.length; k++) {
                            if (!treeStore[k].data.leaf && !treeStore[k].data.root) {
                                var children = [];
                                for (var l = k + 1; treeStore.length; l++) {
                                    if (!treeStore[l] || !treeStore[l].data.leaf) break;
                                    children.push(treeStore[l].data.text)
                                }
                                page.cellParam[treeStore[k].data.id] = children;
                            }
                        }

                        me.paramWindow.hide();
                        me.paramWindow.destroy();
                        //右下角参数显示
                        me.loadParams();

                        // 判断修改参数数据
                        if (oldParams != page.params) {
                            // 重绘组件
                            var items = page.items;
                            for (var item in items) {
                                if (items[item].type == "panel" && items[item].property.textCombo.join().indexOf(",href=") != -1) {
                                    // 重绘组建
                                    var activeId = item,
                                        html = Cosmo.Panel.reParse(item);
                                    // 根据当前组件类型动态获取方法
                                    var activeClickTab = Ext.getCmp("centerEdit").getActiveTab().getId();
                                    // 处理css宽高样式
                                    $("#" + activeClickTab).find("#" + activeId).html("");
                                    $("#" + activeClickTab).find("#" + activeId).append(html);
                                    $.parser.parse('#' + activeId);
                                }
                            }
                        }
                    }
                }
            }),
            // 弹出框的取消按钮
            cancelBtn = new Ext.Button({
                // iconCls: "Cancel",
                text: "取消",
                xtype: "button",
                listeners: {
                    "click": function () {
                        me.paramWindow.hide();
                        me.paramWindow.destroy();
                    }
                }
            }),
            // 复制变量数组
            copyChildren = [];

        // 生成左侧树store
        function createTreeStore() {
            var allCells = graph.getChildCells();
            var newStore = [];
            for (var i = 0; i < allCells.length; i++) {
                var cell = allCells[i];
                // 为启动事件和任务的时候加入到树store中
                if (cell.getStyle() == "StartEvent"
                    || cell.getStyle() == "StartEvents"
                    || cell.getStyle() == "StartMessageEvent"
                    || cell.getStyle() == "StartTimerEvent"
                    || cell.getStyle() == "StartSignalEvent"
                    || cell.getStyle() == "UserTask"
                    || cell.getStyle() == "ServiceTask"
                    || cell.getStyle() == "ScriptTask"
                    || cell.getStyle() == "BusinessRuleTask"
                    || cell.getStyle() == "ReceiveTask"
                    || cell.getStyle() == "ManualTask"
                    || cell.getStyle() == "MailTask"
                    || cell.getStyle() == "Tasks") {

                    // 循环cell的参数
                    var children = [],
                        cellParam = page.cellParam[cell.id];
                    if (cellParam) {
                        for (var j = 0; j < cellParam.length; j++) {
                            children.push({
                                text: cellParam[j],
                                leaf: true
                            });
                        }
                    }

                    newStore.push({
                        text: cell.getAttribute('label'),
                        id: cell.id,
                        children: children
                    })

                } else {
                    continue;
                }
            }
            return newStore;
        }

        // 展开树节点
        function expandTo(node) {
            var path = [];
            var pathNode = node;
            for (var i = 0; i < Number.MAX_VALUE; i++) {
                if (!pathNode.parentNode) {
                    path.unshift(pathNode.data.id);
                    break;
                }
                path.unshift(pathNode.data.id);
                pathNode = pathNode.parentNode;
            }
            var idPath = path.join("/");
            var tree = Ext.getCmp('cellParamTree');
            tree.expandPath(idPath, 'id');
        }

        // 组件变量树右键菜单
        function menu(node, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            e.preventDefault();
            if (Ext.getCmp('cellTreeMenu')) Ext.getCmp('cellTreeMenu').showAt(e.getXY());
            else Ext.create('Ext.menu.Menu', {
                floating: true,
                renderTo: document.body,
                items: [{
                    text: '复制变量',
                    iconCls: 'x-fa fa-refresh',
                    handler: function () {
                        copyChildren = [];
                        if (record.data.leaf) {
                            copyChildren.push({
                                leaf: true,
                                text: record.data.text
                            })
                        } else {
                            for (var i = 0; i < record.childNodes.length; i++) {
                                if (!record.childNodes[i].data.leaf) continue;
                                copyChildren.push({
                                    leaf: true,
                                    text: record.childNodes[i].data.text
                                });
                            }
                        }

                    }
                }, {
                    text: '粘贴变量',
                    iconCls: 'x-fa fa-refresh',
                    handler: function () {
                        if (record.data.leaf) return false;
                        var node = Ext.getCmp('cellParamTree').getRootNode().childNodes[record.data.index];
                        for (var i = 0; i < copyChildren.length; i++) {
                            var flag = true;
                            for (var j = 0; j < record.childNodes.length; j++) {
                                if (record.childNodes[j].data.text == copyChildren[i].text) flag = false;
                            }
                            if (flag) node.appendChild(copyChildren[i]);
                        }
                        expandTo(node);
                    }
                }, {
                    text: '删除变量',
                    iconCls: 'x-fa fa-refresh',
                    handler: function () {
                        var node = Ext.getCmp('cellParamTree').getRootNode().childNodes[record.data.index];
                        if (record.data.leaf) {
                            node = Ext.getCmp('cellParamTree').getRootNode().childNodes[record.parentNode.data.index];
                        }
                        if (!node.data.root) {
                            if (record.data.leaf) {
                                node.removeChild(record);
                            } else {
                                var len = node.childNodes.length;
                                for (var i = 0; i < len; i++) {
                                    node.removeChild(node.childNodes[0])
                                }
                            }
                        }
                    }
                }]
            }).showAt(e.getXY())
        }

        me.jump = true;
        // 参数弹出窗口
        me.paramWindow = new Ext.Window({
            id: 'paramPage',
            width: 664,
            height: 444,
            title: '变量列表',
            style: 'border:0 !important;z-index:999 !important',
            modal: true,
            resizable: false,
            layout: 'hbox',
            items: [
                Ext.create('Ext.tree.Panel', {
                    id: 'cellParamTree',
                    width: '30%',
                    height: 408,
                    border: false,
                    bodyBorder: false,
                    lines: false,
                    style: 'background:#f1f1f1;padding:8px;overflow-x:hidden;',
                    useArrows: true,        //节点展开时，图标换为小三角
                    rootVisible: true,
                    animate: false,
                    root: {
                        expanded: true,
                        text: '组件',
                        rootVisible: true,               // 隐藏根节点，默认显示根节点下的子节点
                        children: createTreeStore()
                    },
                    listeners: {
                        afterrender: function () {
                            var body = this.el.dom;
                            new Ext.dd.DropTarget(body, {
                                ddGroup: 'grid-to-form',
                                notifyDrop: function (ddSource, e, data) {
                                    var selectedRecord = ddSource.dragData.records[0];
                                    if (e.record && e.record.id != 'root') {
                                        var index = e.record.data.index,
                                            node = Ext.getCmp('cellParamTree').getRootNode().childNodes[index];
                                        // 判断已经包含的不加了
                                        for (var i = 0; i < node.childNodes.length; i++) {
                                            if (node.childNodes[i].data.text == selectedRecord.data.name) return true;
                                        }
                                        node.appendChild({
                                            leaf: true,
                                            text: selectedRecord.data.name
                                        });
                                        expandTo(node);
                                    }
                                    return true;
                                }
                            });
                        },
                        beforecellcontextmenu: menu
                    }
                }),
                {
                    id: 'grid',
                    xtype: 'grid',
                    width: '70%',
                    height: 408,
                    border: false,
                    renderTo: Ext.getBody(),
                    autoHeight: true,
                    style: 'background:#f1f1f1;padding:8px;overflow-x:hidden;',
                    store: store,
                    columns: columns,           //显示列
                    stripeRows: false,          //斑马线效果
                    selType: 'cellmodel',
                    sortableColumns: false,     // 禁用排序
                    enableColumnHide: false,    // 禁用menu
                    columnLines: true,          // 列间线
                    enableDragDrop: true,
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1,     //设置单击单元格编辑(设置为2是双击进行修改)
                            allowBlank: false,   //表示不允许输入空值
                            listeners: {
                                beforeedit: function (editor, context, eOpts) { //索引如果为0 返回false   不可编辑
                                    if (context.colIdx == 0) {
                                        return false;
                                    }
                                },
                                validateedit: function (editor, context, eOpts) {
                                    if (context.colIdx == 1) {
                                        var items = store.data.items;
                                        items.forEach(function (item) {
                                            if (context.value == item.data.name && item.data.id != context.record.data.id) {
                                                context.cancel = true;
                                                if (context.value != "") {
                                                    setTimeout(function () {
                                                        Ext.Msg.show({
                                                            title: '警告',
                                                            msg: '参数名称不允许重复，请您重新输入！',
                                                            buttons: Ext.Msg.OK,
                                                            icon: Ext.Msg.ERROR      //注意此处为ERROR
                                                        });
                                                    }, 0)
                                                }
                                                return false;
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    ],
                    viewConfig: {
                        plugins: {
                            ddGroup: 'grid-to-form',
                            ptype: 'gridviewdragdrop',
                            enableDrop: false
                        }
                    },
                    tbar: [{
                        text: '添加',
                        iconCls: "x-fa fa-plus",
                        //ui:'Cosmo-blue',
                        handler: function () {
                            if (me.jump == false) {
                                Ext.Msg.alert("提示", "请您先修改名称");
                                return false;
                            }
                            var p = {
                                name: '',
                                default: '',
                                remarrk: '',
                                id: ''
                            };
                            me.serial++;
                            // 参数序号
                            p.id = page.id + (page.params.length + me.serial);
                            store.insert(page.params.length + me.serial, p);
                            $('#paramPage .x-grid-view').getNiceScroll().resize();   //重新获取高度
                        }
                    }, {
                        text: '上移',
                        iconCls: "x-fa fa-arrow-up",
                        //ui:'Cosmo-blue',
                        handler: function () {
                            var grid = Ext.getCmp('grid'),
                                records = grid.getSelectionModel().getSelection();
                            for (var i in records) {
                                var record = records[i];
                                var index = store.indexOf(record);
                                if (index > 0) {
                                    store.removeAt(index);
                                    store.insert(index - 1, record);
                                    grid.getView().refresh();
                                    grid.getSelectionModel().select(record, true);

                                    $("#grid-body table").find("div").css("background", "#1f2c38");
                                    $("#grid-body table").eq(index - 1).find("div").css("background", "#167195");

                                }
                            }
                        }
                    }, {
                        text: '下移',
                        iconCls: "x-fa fa-arrow-down",
                        //ui:'Cosmo-blue',
                        handler: function () {
                            var grid = Ext.getCmp('grid');
                            var records = grid.getSelectionModel().getSelection();
                            for (var i in records) {
                                var record = records[i];
                                var index = store.indexOf(record);
                                if (index < store.getCount() - 1) {
                                    store.removeAt(index);
                                    store.insert(index + 1, record);
                                    grid.getView().refresh();
                                    grid.getSelectionModel().select(record, true);

                                    $("#grid-body table").find("div").css("background", "#1f2c38");
                                    $("#grid-body table").eq(index + 1).find("div").css("background", "#167195");
                                }
                            }
                        }
                    }, {
                        text: '删除',
                        iconCls: "x-fa fa-close",
                        //ui:'Cosmo-blue',
                        handler: function () {
                            var grid = Ext.getCmp('grid');
                            var records = grid.getSelectionModel().getSelection();
                            for (var i in records) {
                                var record = records[i],
                                    index = store.indexOf(record);
                                store.removeAt(index);
                                grid.getView().refresh();
                                if (index && index >= 1) {
                                    grid.getSelectionModel().select(index - 1);
                                    $("#grid-body table").find("div").css("background", "#1f2c38");
                                    $("#grid-body table").eq(index - 1).find("div").css("background", "#167195");
                                    return false;
                                }
                            }
                        }
                    }],
                    buttons: [{
                        xtype: 'box',
                        id: 'parmaButton',
                        html: ''
                    }, confirmBtn, cancelBtn]
                }
            ]
        });
        me.paramWindow.show();
        $('#paramPage .x-grid-view').niceScroll({
            cursorborder: '1px solid #c5c5c5',
            cursorcolor: '#c5c5c5',
            autohidemode: 'leave',
            zindex: 999
        });
    },

    /** 右下角参数 */
    loadParams: function () {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT);// 取得当前活动页签Page对象
        if (Ext.getCmp('paramsTreePanel')) Ext.getCmp('paramsTreePanel').destroy();
        var paramsTreePanel = new Ext.create('Ext.tree.Panel', {
            width: '100%',
            border: false,
            lines: false,
            useArrows: true,        //节点展开时，图标换为小三角
            id: 'paramsTreePanel',
            rootVisible: false,
            root: {
                expanded: true,
                rootVisible: false,               // 隐藏根节点，默认显示根节点下的子节点
                children: [{
                    text: '自定义参数',
                    expanded: true,
                    children: []
                }, {
                    text: '共享区参数',
                    expanded: true,
                    children: []
                }, {
                    text: '系统变量',
                    expanded: true,
                    children: []
                }]
            },
            listeners: {
                itemmouseenter: function (_this, record, item, index, e, eOpts) {
                    if (!record.data.leaf) return false;
                    if (me.tip) me.tip.destroy();
                    var view = _this.grid.getView();
                    me.tip = Ext.create('Ext.tip.ToolTip', {
                        target: item,
                        delegate: view.itemSelector,
                        trackMouse: true,
                        renderTo: Ext.getBody(),
                        listeners: {
                            beforeshow: function updateTipBody(tip) {
                                tip.update('值：' + record.data.value + '<br/>备注：' + (record.data.desc ? record.data.desc : '暂无备注信息'));
                            }
                        }
                    });
                }
            }
        });
        // 自定义参数
        for (var i = 0; i < page.params.length; i++) {
            Ext.getCmp('paramsTreePanel').getRootNode().firstChild.appendChild({
                leaf: true,
                expanded: false,
                desc: (page.params[i][2]),
                value: (page.params[i][1]),
                text: (page.params[i][0])
            })
        }
        // 共享区参数
        var csaLength = page.importCsa.length;
        for (var i = 0; i < csaLength; i++) {
            var parent;  // 如果引用多个共享区，参数分开显示
            if (csaLength > 1) {
                var text = page.importCsa[i].path.split('/').pop().split('.')[0];
                parent = Ext.getCmp('paramsTreePanel').getRootNode().firstChild.nextSibling.appendChild({
                    text: text,
                    expanded: true,
                    children: [{
                        text: '全局变量',
                        expanded: true,
                        children: []
                    }, {
                        text: '常量',
                        expanded: true,
                        children: []
                    }, {
                        text: '列表',
                        expanded: true,
                        children: []
                    }]
                });
            } else {
                parent = Ext.getCmp('paramsTreePanel').getRootNode().firstChild.nextSibling.appendChild({
                    text: '全局变量',
                    expanded: true,
                    children: []
                }).parentNode.appendChild({
                    text: '常量',
                    expanded: true,
                    children: []
                }).parentNode.appendChild({
                    text: '列表',
                    expanded: true,
                    children: []
                }).parentNode;
            }
            Ext.Ajax.request({
                async: false,
                method: "POST",
                url: window.baseURL + "catalog/open",
                params: {
                    serverPath: page.importCsa[i].path
                },
                parent: parent,
                success: function (response, opts) {
                    var obj = Ext.util.JSON.decode(response.responseText);
                    if (obj && obj.data && obj.data.length > 0) {
                        var data = obj.data;
                        data.forEach(function (item) {
                            if ('data' == item.type) {
                                opts.parent.firstChild.appendChild({
                                    leaf: true,
                                    expanded: false,
                                    text: item.key,
                                    desc: item.type,
                                    value: item.value
                                });
                            }
                            if ('value' == item.type) {
                                opts.parent.firstChild.nextSibling.appendChild({
                                    leaf: true,
                                    expanded: false,
                                    text: item.key,
                                    desc: item.type,
                                    value: item.value
                                });
                            }
                            if ('list' == item.type) {
                                opts.parent.firstChild.nextSibling.nextSibling.appendChild({
                                    leaf: true,
                                    expanded: false,
                                    text: item.key,
                                    desc: item.type,
                                    value: item.value
                                });
                            }
                        });
                    }
                },
                failure: function (response, opts) {
                    return false;
                }
            });
        }
        Ext.getCmp("pageVariable").add(paramsTreePanel);
        $('#pageVariable .x-scroller').niceScroll({
            cursorborder: '1px solid #c5c5c5',
            cursorcolor: '#c5c5c5',
            autohidemode: 'leave',
            zindex: 999
        });
    },

    /** 共享区 */
    onShare: function () {
        var page = Map.get(Const.PAGE_OBJECT);
        if (page) {
            new Ext.window.Window({
                id: 'importCsaWin',
                width: 664,
                height: 448,
                resizable: false,
                modal: true,
                title: '引用共享文件',
                style: 'z-index:200000;left:600px;top:15%;background-color:#233646;',
                header: {
                    height: 22,
                    style: 'padding:1px 5px;'
                },
                items: [
                    {
                        xtype: "importcsa"
                    }
                ]
            }).show();
        }
    },

    /** 流程管理界面 */
    onProcessManager: function () {
        window.open(window.location.href + "#/manager");
    },

    /** 查看xml */
    onQuestion: function () {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph;
        if (!graph) return false;
        var encoder = new mxCodec(),
            node = encoder.encode(graph.getModel());
        mxUtils.popup(mxUtils.getPrettyXml(node), true);
        setTimeout(function () {
            me.onCheckout()
        }, 300)
    },

    /** 校验xml */
    onCheckout: function () {
        var page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph;
        if (!graph) return false;
        var encoder = new mxCodec(),
            node = encoder.encode(graph.getModel());
    }
});
