/**
 * 资源视图控制器
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.left.LeftController', {
    extend: 'Ext.app.ViewController',

    /** 控制器别名 */
    alias: 'controller.LeftController',

    requires: ['Cosmo.Page', 'Cosmo.Const', 'Cosmo.ECharts'],

    /** 资源树选中节点 */
    selected: null,

    /** 保存使用到的数据 */
    nodeId: null,                // 节点ID
    fileName: null,              // 文件名称
    serverPath: null,            // 资源路径
    pId: null,                   // 父节点ID
    idPaths: null,               // 刷新树用到的ID路径

    activeElementId: null,       // 当前选中元件ID
    activeGraph: null,           // 当前页签的graph对象
    activeEditor: null,          // 当前页签的editor对象
    elementId: [],               // 定义右侧属性每个元素组件id

    primitive: null,

    treeFlag: 0,                 // 树第一次加载标识

    cmpFlag: 0,                  // 元件库加载完成标识

    clickFlag: false,            // 判断是否要刷新右侧属性页
    dragFlag: false,             // 判断是否为拖放的新组件

    items: [],                   // 所有cell（包括线）id

    openFlag: true,              // 根据权限打开控制

    /** 渲染事件 */
    onRender: function () {
        var me = this;
        me.treeFlag = 1;
        // 给树绑定键盘事件
        // ctrl+C/V  上下键
        new Ext.KeyMap(this.getView().getId(), [{
            key: Ext.event.Event.DELETE,
            fn: function () {
                me.selected = me.getView().getSelectionModel().getSelection()[0];
                if (me.selected.id == 4) {
                    Ext.Msg.alert('提示', '不能删除此目录！', Ext.emptyFn);
                    return;
                }
                // 若文件打开中，提示关闭
                var objType = me.selected.data.node.objType,
                    tabPanelIds = Ext.getCmp('centerEdit').items.keys;
                if (objType == "F") {
                    for (var j = 0; j < me.selected.childNodes.length; j++) {
                        for (var k = 0; k < tabPanelIds.length; k++) {
                            if (tabPanelIds[k].replace(/newTab/, '') == me.selected.childNodes[j].id) {
                                Ext.Msg.alert("提示", "文件夹中有打开文件，请先关闭！", Ext.emptyFn);
                                return;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < tabPanelIds.length; i++) {
                        if (tabPanelIds[i].replace(/newTab/, '') == me.selected.id) {
                            Ext.Msg.alert("提示", "无法删除打开的文件，请先关闭！", Ext.emptyFn);
                            return;
                        }
                    }
                }

                // 删除文件(夹)
                Ext.Msg.confirm("提示", '确定要删除此' + objType + '“' + me.selected.data.text + '”嘛？', function (id, val, opt) {
                    if (id == 'yes' || id == 'ok') me.delCatalog(objType);
                });
            }
        }]);

        $('#leftresource-body>div').niceScroll({
            enablekeyboard: false,
            cursorborder: '1px solid #c5c5c5',
            cursorcolor: '#c5c5c5',
            autohidemode: 'leave',
            preservenativescrolling: false
        });
        // 给jquery原型上绑定插入到光标位置方法
        $.fn.extend({
            "insert": function (value) {
                // 默认参数
                value = $.extend({
                    "text": ""
                }, value);
                var dthis = $(this)[0]; // 将jQuery对象转换为DOM元素
                // IE下
                if (document.selection) {
                    $(dthis).focus();         // 输入元素textara获取焦点
                    var fus = document.selection.createRange();    // 获取光标位置
                    fus.text = value.text;    // 在光标位置插入值
                    $(dthis).focus();         /// 输入元素textara获取焦点
                }
                //火狐下标准
                else if (dthis.selectionStart || dthis.selectionStart == '0') {
                    var start = dthis.selectionStart,
                        end = dthis.selectionEnd,
                        top = dthis.scrollTop;
                    // 以下这句，应该是在焦点之前，和焦点之后的位置，中间插入我们传入的值
                    dthis.value = dthis.value.substring(0, dthis.selectionStart) + value.text + dthis.value.substring(dthis.selectionEnd, dthis.value.length);
                    this.focus();
                }
                // 在输入元素textara没有定位光标的情况
                else {
                    this.value += value.text;
                }
                return $(this);
            }
        })
    },

    /** 节点展开事件 */
    onItemexpand: function () {
        var me = this;
        if (me.treeFlag == 1) {
            Ext.Ajax.request({
                async: false,
                method: "POST",
                url: window.baseURL + "path",
                success: function (response, opts) {
                    var obj = Ext.util.JSON.decode(response.responseText);
                    if (obj && obj.type) {
                        var type = obj.type;
                        // 编辑
                        if (type === '1') {
                            // 路径
                            var objpath = obj.objpath,
                                urlName = objpath.replace("/Project/Reports/", "") // name路径

                            // 展开到节点
                            me.getView().expandPath(urlName, "name");
                            // 选中该节点
                            me.getView().selectPath(urlName, "name");
                            var interval = setInterval(function () {
                                var select = me.getView().getSelectionModel().getSelection();
                                if (select && select.length > 0 && me.cmpFlag === 1) {
                                    clearInterval(interval);
                                    // 打开
                                    me.onItemdblclick(select[0].data.node, select[0]);
                                }
                            }, 0);
                            $('#leftresource-body>div').getNiceScroll().resize();
                            me.treeFlag = 0;
                        }
                    }
                },
                failure: function (response, opts) {
                    return false;
                }
            });
        }
        $('#leftresource-body>div').getNiceScroll().resize();
    },

    /** 节点折叠事件 */
    onItemcollapse: function () {
        $('#leftresource-body>div').getNiceScroll().resize();
    },

    /** 树面板大小改变事件 */
    onResize: function () {
        $('#leftresource-body>div').getNiceScroll().resize();
    },

    /** 查找资源 树*/
    onSearch: function () {
        var me = this,
            tplSearchField = Ext.getCmp('resourceSearchField');
        // 如果未打开项目,提示警告
        if (Ext.getCmp('leftresource').store.root.id == '4') {
            Ext.Msg.alert('警告', '请先打开项目', Ext.emptyFn);
            return false;
        }
        var resourceCtrlRootId = Ext.getCmp('leftresource').getRootNode().data.id,
            resourceCtrlRootName = Ext.getCmp('leftresource').getRootNode().data.text;
        // 如果已经点击搜索，还原当前项目树
        var store = Ext.create('Ext.data.TreeStore', {
            storeId: 'Resources',       // 数据集ID
            autoLoad: true,
            rootVisible: true,
            root: {                                      // 根节点配置
                id: resourceCtrlRootId,                  // 根节点ID
                expanded: true,                          // 默认展开
                text: resourceCtrlRootName           // 根节点名称
            },
            proxy: {                    // 访问代理
                type: 'ajax',           // 类型异步
                api: {
                    read: window.baseURL + 'catalog/tree?type=dds'
                }
            }
        });
        me.getView().reconfigure(store);
        if (tplSearchField) {
            tplSearchField.destroy();
        } else {
            me.getView().addDocked({
                id: 'resourceSearchField',
                xtype: 'textfield',
                value: '',
                listeners: {
                    added: function (_this, container, pos, eOpts) {
                        _this.triggers.bar.hide();
                    },
                    change: function (_this, newValue, oldValue, eOpts) {
                        if (newValue) {
                            _this.triggers.bar.show();
                        } else {
                            _this.triggers.bar.hide();
                        }
                    }
                },
                triggers: {
                    bar: {
                        cls: 'x-fa fa-close',
                        handler: function (_this) {
                            // 清空搜索关键字
                            Ext.getCmp("resourceSearchField").setValue('');
                            // 还原树
                            var store = Ext.create('Ext.data.TreeStore', {
                                storeId: 'Resources',       // 数据集ID
                                autoLoad: true,
                                rootVisible: true,
                                root: {                     // 根节点配置
                                    id: resourceCtrlRootId,                  // 根节点ID
                                    expanded: true,         // 默认展开
                                    text: resourceCtrlRootName         // 根节点名称
                                },
                                proxy: {                    // 访问代理
                                    type: 'ajax',           // 类型异步
                                    api: {
                                        read: window.baseURL + 'catalog/tree?type=dds'
                                    }
                                }
                            });
                            me.getView().reconfigure(store);
                        }
                    },
                    search: {
                        cls: 'x-fa fa-search leftSearchBtn',
                        handler: function () {
                            // 获取搜索关键字
                            var value = Ext.getCmp("resourceSearchField").getValue();
                            if (value) {
                                var nodeId = '',
                                    records = me.getView().getSelectionModel().getSelection();
                                if (records && records.length > 0) {
                                    var record = records[0];
                                    if (record.id == 4) {
                                        nodeId = 4;
                                    } else {
                                        if (record.data.leaf)
                                            nodeId = record.parentNode.id;
                                        else
                                            nodeId = record.id;
                                    }
                                }
                                if (Ext.getCmp('leftresource').getController()) {
                                    nodeId = Ext.getCmp('leftresource').getController().pId;
                                    if (!nodeId) {
                                        nodeId = Ext.getCmp('leftresource').getController().nodeId;
                                    }
                                }
                                // 动态改变tree 的store
                                var store = Ext.create('Ext.data.TreeStore', {
                                    storeId: 'Resources',       // 数据集ID
                                    autoLoad: true,
                                    root: {                     // 根节点配置
                                        id: resourceCtrlRootId,                  // 根节点ID
                                        expanded: true,                          // 默认展开
                                        text: resourceCtrlRootName         // 根节点名称
                                    },
                                    proxy: {                    // 访问代理
                                        type: 'ajax',           // 类型异步
                                        api: {
                                            read: window.baseURL + 'catalog/search'
                                        },
                                        actionMethods: {
                                            read: 'POST'
                                        },
                                        extraParams: {
                                            key: value,
                                            type: 'dds',
                                            node: nodeId
                                        }
                                    }
                                });
                                me.getView().reconfigure(store);
                            }
                        }
                    }
                }
            });
        }
    },


    /** 新建资源文件 */
    onFile: function () {
        Ext.getCmp('topRegion').getController().onNewFile('0');
        // 设置选中的树节点
        this.setSelection();
    },

    /** 设置选中的树节点 */
    setSelection: function () {
        var records = this.getView().getSelectionModel().getSelection();
        if (records && records.length > 0) {
            var record = records[0],
                page = Map.get(Const.PAGE_OBJECT);
            page.treeSource.selected = record;
            // 如果选中的是叶子节点
            if (record.data.leaf) {
                var fileName = record.data.node.path.split('/')[record.data.node.path.split('/').length - 1];
                page.treeSource.serverPath = record.data.node.path.replace('/' + fileName, '');
                page.treeSource.pId = record.data.node.pId;
            }
        }
    },

    /** 新建资源文件夹 */
    onFolder: function () {
        var records = this.getView().getSelectionModel().getSelection();
        if (records && records.length > 0) {
            var record = records[0];
            this.selected = record;
        }
        Ext.getCmp('topRegion').getController().onNewFolder('0');
    },

    /** 打开文件并加载元件到编辑区 */
    onItemdblclick: function (node, record, item, index, e, eOpts) {
        if (record.data.id === '4') {
            Ext.getCmp('topRegion').getController().onOpenProject();
            return;
        }
        window.parent.flage = true;
        var me = this;
        // 如果双击选中的是叶子节点
        if (record.data.leaf) {
            me.primitive = record;
            // 当前选中节点
            this.selected = record;
            // 给保存时用到的参数赋值
            me.nodeId = record.data.id;
            me.fileName = record.data.text;
            me.serverPath = record.data.node.path;
            me.pId = record.parentNode.data.id;

            // 添加/切换Tab页
            var tabPanel = Ext.getCmp('centerEdit');
            var pageId = 'newTab' + me.nodeId;
            var tabPanelBody = Ext.getCmp(pageId);
            if (!tabPanelBody) {
                // 不存在新增panel
                tabPanel.add({
                    title: record.data.node.title.replace('.dds', ''),
                    id: pageId,
                    autoScroll: false,
                    width: "100%",
                    height: "100%",
                    bodyStyle: 'overflow: auto!important;',
                    html: '<div class="graph"  style="width:10000px;height: 10000px;overflow:hidden;cursor: default;/* background: url(resources/plugin/mxgraph/examples/editors/images/grid.gif);*/ background-color:white;"><div style="position:fixed;right:0px;top:100px;width: 100%;"><!--<div><button id="but-oper">执Qqqqq行任务</button><button id="but-saveTask">保存任务</button><button id="but-moni">任务监控</button></div>--></div></div>',
                    closable: true,
                    listeners: {
                        beforeclose: tabPanel.getController().onBeforeClose
                    }
                });
                // 切换到当前Panel

                tabPanel.setActiveTab(pageId);
                // 加载MxGraph编辑器
                me.loadEditor(pageId);
                var page = Map.get(Const.PAGE_OBJECT);
                // 加载元件到编辑区
                this.load();
                // 若没有权限 打开再关闭页签
                if (!me.openFlag) {
                    if (page && page.id) {
                        // 关闭当前页签
                        Ext.getCmp(page.id).doClose();
                        return false;
                    }
                }
            } else {
                // 切换到当前Panel
                tabPanel.setActiveTab(pageId);
            }
            // 空白属性
            //Ext.getCmp('rightProperty').getController().createRightProperty(null, true);
        }
    },

    /** 禁止文件拖拽*/
    onitemmousedown: function (node, record, item, index, e, eOpts) {  //鼠标按下触发的事件
        var data = {};
        //data.node=node.
        try {
            if (record.data.node.objType == 'F') return false;
            if (record.data.node.memo != null && record.data.node.memo != "") {
            }
        } catch (e) {
        }

    },

    /** 打开文件渲染元素 */
    load: function () {
        var me = this;
        // 取得文件内容
        Ext.Ajax.request({
            async: false,
            method: "POST",
            url: window.baseURL + "catalog/securityOpen",
            params: {
                serverPath: me.serverPath,
                operation: "edit"
            },
            success: function (response, opts) {
                var responseData = Ext.util.JSON.decode(response.responseText);
                if (responseData.status == 0) {

                    var data = responseData.data,   // 返回打开文件的JSON数据
                        page = Map.get(Const.PAGE_OBJECT);   // 页面对象
                    // 页签ID
                    data.id = page.id;
                    // JSON数据赋值Page
                    Ext.apply(page, data);

                    // 缓存页面对象
                    Map.put(page.id, Ext.apply(Ext.create('Cosmo.util.Page'), data));
                    Map.put(Const.PAGE_OBJECT, page);

                    var xmlFile = page.graphXml,
                        doc = mxUtils.parseXml(xmlFile),
                        dec = new mxCodec(doc);
                    dec.decode(doc.documentElement, page.activeGraph.getModel());

                    setTimeout(function () {
                        // 更新渲染 切换模式选择图标
                        var page = Map.get(Const.PAGE_OBJECT),
                            graph = page.activeGraph,
                            // 获取画布元素的集合
                            cells = graph.getDefaultParent().children,
                            editor = page.activeEditor,
                            model = graph.getModel();
                        if (!cells) {
                            return false;
                        }
                        for (var i = 0; i < cells.length; i++) {
                            if (cells[i].style === 'Flink') {
                                if (cells[i].getAttribute('displayTaggleFlink') === 'false') {
                                    // 更新图标的方法
                                    Ext.getCmp('leftresource').getController().switchIcon(3, graph, cells[i], model, editor)
                                } else {
                                    // 更新图标的方法
                                    Ext.getCmp('leftresource').getController().switchIcon(2, graph, cells[i], model, editor)
                                }
                            } else if (cells[i].style == 'Hive' || cells[i].style == 'SparkPython' || cells[i].style == 'SparkScala' || cells[i].style == 'Shell') {
                                if (cells[i].getAttribute('displayTaggle') === 'false') {
                                    // 更新图标的方法
                                    Ext.getCmp('leftresource').getController().switchIcon(1, graph, cells[i], model, editor)
                                } else {
                                    // 更新图标的方法
                                    Ext.getCmp('leftresource').getController().switchIcon(0, graph, cells[i], model, editor)
                                }
                            }
                        }
                    }, 0)
                    if (Ext.getCmp('defaultPropertyPanel')) {
                        Ext.getCmp('defaultPropertyPanel').destroy();
                    }
                } else {
                    Ext.Msg.alert('提示', responseData.msg, Ext.emptyFn);
                    me.openFlag = false;
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '打开文件失败！', Ext.emptyFn);
            }
        });
    },

    /** 加载MxGraph编辑器 */
    loadEditor: function (activeTabId) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            container = $('#' + activeTabId + Const._BODY + '>div')[0],
            editorConfig = "resources/plugin/mxgraph/bpmn/config/workfloweditor.xml";

        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('您当前浏览器不支持此组件！', 200, false);
        } else {
            var editor = new mxEditor(),
                config = mxUtils.load(editorConfig).getDocumentElement();
            // 加载自定义配置-自定义图形模板
            mxObjectCodec.allowEval = true;
            editor.setGraphContainer(container);
            editor.configure(config);
            mxObjectCodec.allowEval = false;
            // 画布对象
            var graph = editor.graph;
            /* ------ 画布基础配置 开始------ */
            // 是否开启拖拽
            graph.dropEnabled = true;
            //---start 自定义属性
            graph.startDrag = false;  // 是否开启拖拽
            graph.allowdragIn = false; //是否允许拖进来
            graph.preMoveEvent = false;//移动和点击事件区分
            graph.moveFormParent = false;
            //---end 自定义属性
            graph.setPanning(true);
            // 启用提示框
            graph.setTooltips(true);
            // 禁止缩放
            graph.setCellsResizable(false);
            graph.setAllowDanglingEdges(false);
            graph.setMultigraph(false);
            // 选择基本元素开启
            graph.setEnabled(true);
            // 开启文字编辑功能
            graph.setCellsEditable(true);
            // 开启回车退出编辑
            graph.setEnterStopsCellEditing(true);
            // 添加用于在容器内平移的活动边框
            graph.createPanningManager = function () {
                var pm = new mxPanningManager(this);
                pm.border = 30;
                return pm;
            };
            graph.allowAutoPanning = true;
            graph.timerAutoScroll = true;
            // 启用框选
            new mxRubberband(graph);
            // 设置连接焦点的图片
            mxConnectionHandler.prototype.connectImage = new mxImage('resources/images/viso/bpmn-connector.gif', 16, 16);
            mxGraph.prototype.htmlLabels = true;
            mxGraph.prototype.isWrapping = function (cell) {
                return true;
            };
            mxCellRenderer.prototype.redrawControl = function (state, forced) {
                // 禁止组件连接线拖出画布边界
                if (state.cell.style == undefined) {
                    for (var i = 0; i < state.absolutePoints.length; i++) {
                        if (state.absolutePoints[i].x < 0 || state.absolutePoints[i].y < 0) {
                            state.absolutePoints[i].x < 0 ? state.absolutePoints[i].x = 0 : '' , state.absolutePoints[i].y < 0 ? state.absolutePoints[i].y = 0 : '';
                        }
                    }
                }
            };
            // Drop拖动目标验证
            // cell:target
            // cells:source
            graph.isValidDropTarget = function (cell, cells, evt) {
                if (cell) {
                    if (cells && cells.length == 1) {
                        return false;
                    }
                }
            };
            // 鼠标拖动滚动
            mxGraph.prototype.scrollPointToVisible = function (x, y, extend, border) {
            };
            // 在cell的style里用 constituent=1标志此cell是作为部分的rect.x
            graph.isPart = function (cell) {
                var state = this.view.getState(cell);
                var style = (state != null) ? state.style : this.getCellStyle(cell);

                return style['constituent'] == '1';
            };

            // 重定义部件的选中事件
            graph.selectCellForEvent = function (cell) {
                if (this.isPart(cell)) {
                    cell = this.model.getParent(cell);
                }

                mxGraph.prototype.selectCellForEvent.apply(this, arguments);
            };

            // 重写mxUtils.alert  若需要根据要求变化就清空重新定义multiplicities（slice并不能生效）
            mxUtils.alert = function (message) {
            };
            graph.multiplicities.push(new mxMultiplicity(
                true, 'EndEvents', null, null, 1, 'n', ['EndEvents'],
                '',
                '结束事件不能向其他元素连线'));

            // 是否锯齿效果
            mxRectangleShape.prototype.crisp = false;
            // 是否启用旋转
            mxGraphHandler.prototype.rotationEnabled = false;
            // 是否启用对齐线帮助定位
            mxGraphHandler.prototype.guidesEnabled = true;
            // ALT禁用对齐线帮助定位
            mxGuide.prototype.isEnabledForEvent = function (evt) {
                return !mxEvent.isAltDown(evt);
            };
            // 重新定义连线以达到约束结束事件的再连线
            graph.addEdge = function (edge, parent, source, target, index) {
                //文件是否是最新的
                Ext.getCmp('centerEdit').getController().newFiled();
                if (Ext.getCmp('menuModel')) {
                    Ext.getCmp('menuModel').destroy();
                }
                if (Ext.getCmp('topPanel')) {
                    Ext.getCmp('topPanel').ownerCt.destroy();
                }
                if (!edge) {
                    edge = graph.getModel().cloneCell(editor.templates['SequenceFlow']);
                }
                if (source.getStyle() == 'TextAnnotation' || target.getStyle() == 'TextAnnotation') {
                    edge = graph.getModel().cloneCell(editor.templates['Association']);
                    if (source.getStyle() == 'TextAnnotation') {
                        var a = source;
                        source = target;
                        target = a;
                    }
                }
                if (!edge.id) {
                    edge.id = 'Edge-' + me.createCmpId();
                }
                me.items.push(edge.id.split('-')[1]);
                var flag = edge.isAutoAdd;
                // 增添 开始id与结束id
                if (source.style === 'Begin') {
                    // 开始
                    source.setAttribute('source', target.id);
                } else if (target.style === 'End') {
                    // 结束
                    target.setAttribute('target', source.id);
                } else {
                    source.setAttribute('source', source.id);
                    target.setAttribute('target', target.id);
                }
                // 分支连线 添加组件属性
                if (source.style === 'Fork') {
                    var forkEdge = [];
                    if (source.getAttribute('paths')) {
                        var forkEdge = source.getAttribute('paths').split(',');
                    }
                    forkEdge.push(target.id);
                    source.setAttribute('paths', forkEdge);
                }

                return mxGraph.prototype.addEdge.apply(this, arguments);
            };

            /* ------ 画布基础配置 结束 ------ */
            // 设置全局样式
            me.setGlobalStyle(graph);
            // 绑定鼠标悬停事件
            me.bindHover(graph);
            // 绑定鼠标点击空白页事件
            me.bindPageClick(graph);
            // 挂载分布模块
            me.mountDistribute(graph);
            // 挂载取消/重做模块
            me.mountUndoManager(graph);
            // 挂载边界限定拖拽函数
            me.mountBorderLimit(graph);
            // 挂载del键删除
            me.bindDelToDelete(graph);
            // 监听label编辑完成
            // me.editStopped(graph);
            // 添加小窗预览
            // me.addOutLine(graph);
            // ----- start hmt------
            // 边缘事件相关配置
            me.configBorderEvent(graph);
            // 图形移动范围限定
            me.configCellMoveEvent(graph);
            // me.addDragSourceCell(graph);

            //----- end hmt------
            page.activeGraph = graph;
            page.activeEditor = editor;
        }
    },

    /** 设置全局样式 */
    setGlobalStyle: function (graph) {
        // 编辑样式
        mxConstants.DROP_TARGET_COLOR = '#00A3D9';
        mxConstants.DEFAULT_HOTSPOT = 0.5;
        mxConstants.MIN_HOTSPOT_SIZE = 10;
        mxConstants.MAX_HOTSPOT_SIZE = 30;
        mxConstants.HANDLE_FILLCOLOR = '#99ccff';
        mxConstants.HANDLE_STROKECOLOR = '#0088cf';
        mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff';
        mxConstants.VALID_COLOR = '#99ccff'; // TARGET_
        mxConstants.GUIDE_COLOR = "#00A3D9";
        mxConstants.GUIDE_STROKEWIDTH = "2";
        var line = graph.stylesheet.getDefaultEdgeStyle();
        line[mxConstants.STYLE_STROKEWIDTH] = "2";  // 连线加粗
        line[mxConstants.STYLE_MOVABLE] = false;    // 连线禁止移动
    },

    /** 绑定悬浮点击事件 */
    bindHover: function (graph) {
        var me = this;

        function mxVertexToolHandler(state) {
            mxVertexHandler.apply(this, arguments);
        }

        mxVertexToolHandler.prototype = new mxVertexHandler();
        mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;
        mxVertexToolHandler.prototype.domNode = null;
        mxVertexToolHandler.prototype.edit = null;
        mxVertexToolHandler.prototype.init = function () {
            mxVertexHandler.prototype.init.apply(this, arguments);
            // 点击显示悬浮图标--添加流程
            this.domNode = document.createElement('div');
            this.domNode.style.width = "22px";
            this.domNode.style.height = "auto";
            this.domNode.style.backgroundColor = "rgba(255,255,255,0.1)";
            this.domNode.style.position = 'absolute';
            var model = document.createElement('div'),
                containerModel = this.domNode.appendChild(model),
                iCon,
                arrClass;

            function iConStyle() {
                iCon.style.width = '22px';
                iCon.style.height = '22px';
                iCon.style.marginLeft = '2px';
                iCon.style.marginTop = '2px';
                iCon.style.hover = 'red';
                iCon.style.display = 'inline-block';
                iCon.style.cursor = 'pointer';
                iCon.style.fontSize = '22px';
            }

            var cell = graph.getSelectionCell();
            // 结束事件后面不能添加其他图形
            if (cell.style == "EndEvents") {
                arrClass = ["dmn-icon-trash"];
            } else {
                if (cell.style == 'Hive' || cell.style == 'SparkPython' || cell.style == 'SparkScala' || cell.style == 'Shell' || cell.style == 'Flink') {
                    arrClass = ["dmn-icon-screw-wrench", "dmn-icon-trash"]
                } else {
                    arrClass = ["dmn-icon-trash"]
                }
            }

            // 渲染组建
            for (var i in arrClass) {
                var iCon = document.createElement("div");
                iConStyle();
                iCon.style.float = 'left';
                // 父元素样式
                containerModel.style.overflow = 'hidden';
                containerModel.style.height = '75px';
                containerModel.style.width = '50px';
                containerModel.style.color = '#0085AF';
                iCon.className = arrClass[i];
                if (arrClass[i] == "dmn-icon-screw-wrench") {
                    mxEvent.addListener(iCon, 'click', mxUtils.bind(this, function (evt) {
                            // 点击切换
                            var event = window.event || arguments.callee.caller.arguments[0];
                            if (cell.style == 'Flink') {
                                me.menuChoiceModelFlink(evt, cell.style)
                                return false;
                            }
                            me.menuChoiceModel(evt, cell.style)
                        })
                    );
                } else if (arrClass[i] == "dmn-icon-trash") {
                    mxEvent.addGestureListeners(iCon, mxUtils.bind(this, function (evt) {
                            // 禁止拖动图标
                            mxEvent.consume(evt);
                            // 清除sessionStorage
                            me.DeleteChildComponents();
                        })
                    );

                    mxEvent.addListener(iCon, 'click', mxUtils.bind(this, function (evt) {
                            if (Ext.getCmp('menuModel')) {
                                Ext.getCmp('menuModel').destroy();
                            }
                            if (Ext.getCmp('topPanel')) {
                                Ext.getCmp('topPanel').ownerCt.destroy();
                            }
                            this.graph.removeCells([this.state.cell]);
                            // 文件是否是最新的
                            Ext.getCmp('centerEdit').getController().newFiled();
                            mxEvent.consume(evt);
                        })
                    );
                } else {
                    mxEvent.addListener(iCon, 'click',
                        mxUtils.bind(this, function (evt) {
                        })
                    );
                }
                containerModel.appendChild(iCon);
            }

            // 选中单一元件时更改右侧属性面板，否则显示空白页属性
            if (graph.getSelectionCells().length == 1) {
                var id = '';
                if (graph.getSelectionCells()[0].id.split('-')[0] !== graph.getSelectionCells()[0].style) {
                    graph.getSelectionCells()[0].id = graph.getSelectionCells()[0].style + '-' + me.createCmpId();
                    id = graph.getSelectionCells()[0].id;
                } else {
                    id = graph.getSelectionCells()[0].id;
                }
                me.clickFlag = true;
                if (!Ext.getCmp(id)) {
                    Ext.getCmp('rightProperty').getController().createRightProperty(graph.getSelectionCells()[0]);
                }
                this.redrawTools();
                // this.graph.container.appendChild(this.edit);
                this.graph.container.appendChild(this.domNode);
            } else {
                if (Ext.getCmp('topPanel'))
                    Ext.getCmp('topPanel').ownerCt.destroy();
            }
        };

        mxVertexToolHandler.prototype.redraw = function () {
            mxVertexHandler.prototype.redraw.apply(this);
            this.redrawTools();
        };

        mxVertexToolHandler.prototype.redrawTools = function () {
            if (this.state != null && this.domNode != null) {
                this.domNode.style.left = (this.state.x + this.state.width + 20) + 'px';
                this.domNode.style.top = (this.state.y - 10) + 'px';
            }
        };

        mxVertexToolHandler.prototype.destroy = function (sender, me) {
            mxVertexHandler.prototype.destroy.apply(this, arguments);
            if (this.domNode != null) {
                if (this.domNode.parentNode) {
                    this.domNode.parentNode.removeChild(this.domNode);
                }
                this.domNode = null;
            }
        };

        graph.createHandler = function (state) {
            if (state != null && this.model.isVertex(state.cell)) return new mxVertexToolHandler(state);
            return mxGraph.prototype.createHandler.apply(this, arguments);
        };

        graph.addListener(mxEvent.CELLS_RESIZED, function (sender, evt) {
            me.dragFlag = false;
            var cell = evt.getProperty('cells');
            if (cell.length == 1) {
                graph.clearSelection();
                graph.setSelectionCell(cell[0]);
            }
        });
        // 双击节点，新增aceEditor编辑页
        graph.addListener(mxEvent.DOUBLE_CLICK, function (graph, event) {
            // 获取组件名称
            var page = Map.get(Const.PAGE_OBJECT);
            var cell = event.properties.cell;
            // 是否点击的不是空白页traningModelSparkScala
            if (cell) {
                var namePath = cell.getAttribute("namePath");
                if (cell) {
                    // 双击节点打开事件
                    if (cell.style.toString() == "SparkPython" || cell.style.toString() == "SparkScala" || cell.style.toString() == "Hive" || cell.style.toString() == "Shell") {
                        if (cell.getAttribute('displayTaggle') == "false") {
                            Ext.getCmp('centerEdit').getController().onNewEditor(cell.style.toString());
                        }
                    } else if (cell.style.toString() == "CosmoDip") {  //  集成Dip
                        Ext.Ajax.request({
                            async: false,
                            method: "POST",
                            url: window.baseURL + "dipUrl",
                            success: function (response, opts) {
                                if (response.responseText) {
                                    // 打开窗口
                                    var dipurl = JSON.parse(response.responseText).data;
                                    window.open(dipurl, '_blank')
                                }
                            },
                            failure: function (response, opts) {
                                return false;
                            }
                        });
                    }
                }
            }
        });
    },

    /** 绑定空白页点击事件 */
    bindPageClick: function (graph) {
        var me = this;
        graph.addListener(mxEvent.CLICK, function (graph, event) {
            if (graph.preMoveEvent) {
                graph.preMoveEvent = false;
                return;
            }
            var cell = event.properties.cell;
            // 是否点击的不是空白页
            if (cell) {
                // 点击的是不是线
                if (!graph.model.isEdge(cell)) {
                    if (!Ext.getCmp(cell.id)) {
                        Ext.getCmp('rightProperty').getController().createRightProperty(graph.getSelectionCell());
                        // 有属性值则 展开属性面板
                        Ext.getCmp('rightProperty').expand();
                    }
                } else {
                    if (Ext.getCmp('menuModel')) {
                        Ext.getCmp('menuModel').destroy();
                    }
                    if (Ext.getCmp('topPanel')) {
                        Ext.getCmp('topPanel').ownerCt.destroy();
                    }
                }

            } else {
                // 页面page属性检测是否再次刷新
                me.isTestPageRefresh();
                if (Ext.getCmp('menuModel')) {
                    Ext.getCmp('menuModel').destroy();
                }
                if (Ext.getCmp('topPanel')) {
                    if (Ext.getCmp('topPanel').ownerCt) {
                        Ext.getCmp('topPanel').ownerCt.destroy();
                    }
                }
                // 空白属性
                Ext.getCmp('rightProperty').getController().createRightProperty(graph.getSelectionCell(), true);
                // 右侧属性收缩
                // Ext.getCmp('rightProperty').collapse();
                // 屏幕分辨率改变元件改变高度
                Ext.getCmp('rightElement').getController().ratioResizeShrink();
            }
            me.clickFlag = false;
        })
    },

    /** 页面page属性检测是否再次刷新 */
    isTestPageRefresh: function () {
        if (Ext.getCmp('createFrequencyItem')) {
            return false;
        }
    },

    /** 挂载分布模块 */
    mountDistribute: function (graph) {
        graph.dropEnabled = true;
        graph.setConnectable(true);
        // 分布 true为水平 false为垂直
        graph.distributeCells = function (horizontal, cells) {
            if (cells == null) {
                cells = this.getSelectionCells();
            }

            if (cells != null && cells.length > 1) {
                var vertices = [],
                    max = null,
                    min = null;

                for (var i = 0; i < cells.length; i++) {
                    if (this.getModel().isVertex(cells[i])) {
                        var state = this.view.getState(cells[i]);
                        if (state != null) {
                            var tmp = (horizontal) ? state.getCenterX() : state.getCenterY();
                            max = (max != null) ? Math.max(max, tmp) : tmp;
                            min = (min != null) ? Math.min(min, tmp) : tmp;
                            vertices.push(state);
                        }
                    }
                }

                if (vertices.length > 2) {
                    vertices.sort(function (a, b) {
                        return (horizontal) ? a.x - b.x : a.y - b.y;
                    });
                    var t = this.view.translate;
                    var s = this.view.scale;
                    min = min / s - ((horizontal) ? t.x : t.y);
                    max = max / s - ((horizontal) ? t.x : t.y);
                    this.getModel().beginUpdate();
                    try {
                        var dt = (max - min) / (vertices.length - 1),
                            t0 = min;
                        for (var i = 1; i < vertices.length - 1; i++) {
                            var pstate = this.view.getState(this.model.getParent(vertices[i].cell)),
                                geo = this.getCellGeometry(vertices[i].cell);
                            t0 += dt;
                            if (geo != null && pstate != null) {
                                geo = geo.clone();
                                if (horizontal) {
                                    geo.x = Math.round(t0 - geo.width / 2) - pstate.origin.x;
                                } else {
                                    geo.y = Math.round(t0 - geo.height / 2) - pstate.origin.y;
                                }
                                this.getModel().setGeometry(vertices[i].cell, geo);
                            }
                        }
                    } finally {
                        graph.getModel().setStyle(graph.getSelectionCell(), 'Tasks;fillColor=#66B922');
                        this.getModel().endUpdate();
                    }
                }
            }
            return cells;
        };
    },

    /** 挂载取消重做管理模块 */
    mountUndoManager: function (graph) {
        var me = this,
            listener = function (sender, evt) {
                me.undoMng.undoableEditHappened(evt.getProperty('edit'));
            };
        me.undoMng = new mxUndoManager();
        graph.getModel().addListener(mxEvent.UNDO, listener);
        graph.getView().addListener(mxEvent.UNDO, listener);
    },

    /** 挂载边界限定拖拽函数 */
    mountBorderLimit: function (graph) {
        // 移动画布cell节点(不含线)执行事件
        graph.addListener(mxEvent.CELLS_MOVED, function (sender, evt) {
            var page = Map.get(Const.PAGE_OBJECT);
            // 因监听不到mxgraph的拖到边界滚动的事件，所以手动重置滚动条避免bug
            if ($('#' + page.id).getNiceScroll()) $('#' + page.id).getNiceScroll().resize();
        })
    },

    /** 去除重复文件nodeid*/
    DeleteChildComponents: function () {
        var page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            // 数组
            newArr = [],
            // 子组件文件nodeid
            noid = cell.getAttribute('node'),
            // 子组件文件noidid集合
            noidComponent = sessionStorage.getItem(noid);
        if (noidComponent != null) {
            noidComponent = noidComponent.split(',');
        }
        // 当前文件nodeId
        var atPresentNode = Map.get(Const.PAGE_OBJECT).treeSource.nodeId;
        //当前文件nodeid集合
        atPresentNodeArr = sessionStorage.getItem(atPresentNode);
        if (atPresentNodeArr != null) {
            atPresentNodeArr = atPresentNodeArr.split(',');
        }

        // 去除指定nodeid
        function removeByValue(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }

        if (atPresentNodeArr != null && noidComponent != null) {
            for (var i = 0; i < atPresentNodeArr.length; i++) {
                for (var j = 0; j < noidComponent.length; j++) {
                    if (atPresentNodeArr[i] == noidComponent[j]) {
                        removeByValue(atPresentNodeArr, atPresentNodeArr[i])
                    }
                }
            }
        }
        sessionStorage.setItem(atPresentNode, newArr)
        sessionStorage.removeItem(noid);
    },

    /** 挂载del键删除item */
    bindDelToDelete: function (graph) {
        var me = this,
            keyHandler = new mxKeyHandler(graph);
        // 事件的evt对象的srcElement和target都不是graph对象元素
        // 导致判断是否为graph事件的时候返回错
        // 此处直接重写条件函数 (new的时候第二个参数可以控制触发元素)
        keyHandler.isGraphEvent = function () {
            return true;
        };
        keyHandler.bindKey(46, function (evt) {
            // 文件是否是最新的
            Ext.getCmp('centerEdit').getController().newFiled();
            // 清除sessionStorage
            me.DeleteChildComponents();
            var page = Map.get(Const.PAGE_OBJECT);
            if (page) var graph = page.activeGraph;
            if (!graph) return;
            var cell = page.activeGraph.getSelectionCell();
            if (graph.isEnabled()) {
                // 挂载del键删除连线属性
                me.bindDelToDeleteProperty(page, graph);
                graph.removeCells();
            }
        });
    },

    /** 挂载del键删除连线属性 */
    bindDelToDeleteProperty: function (page, graph) {
        var cell = graph.getSelectionCell(),
            cells = page.activeGraph.getChildCells(),
            paths = cell.getAttribute(),
            newCellsPaths = [];
        // 获取分支组件集
        for (var i = 0; i < cells.length; i++) {
            if (cell.source.id === cells[i].id) {
                var cellsPaths = cells[i].getAttribute('paths').split(',')
                for (var j = 0; j < cellsPaths.length; j++) {
                    if (cellsPaths[j] !== cell.target.id) {
                        newCellsPaths.push(cellsPaths[j])
                    }
                }
                cells[i].setAttribute('paths', newCellsPaths);
            }
        }

    },

    /** 开启小窗预览 */
    addOutLine: function (graph) {
        var div = document.createElement('div');
        div.style.height = '200px';
        div.style.width = '300px';
        div.style.position = 'absolute';
        div.style.left = '-318px';
        div.style.top = '24px';
        div.style.backgroundColor = 'white';
        document.getElementById('rightRegion-splitter').appendChild(div);
        var a = new mxOutline(graph, div);
        a.setZoomEnabled(false);
    },

    /** 资源树右键菜单 */
    onBeforecellcontextmenu: function (node, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        // 当前选中节点
        this.selected = record;
        e.preventDefault();
        // 显示右键菜单（鼠标跟随）
        this.menu(record).showAt(e.getXY());
    },

    /** 资源树右键打开 */
    returnOpen: function (record) {
        var me = this;
        if (record.data.leaf) {
            return {
                text: '打开',
                iconCls: 'cosmo_icon_open',
                handler: function () {
                    me.onItemdblclick(null, record)
                }
            }
        }
    },

    /** 资源树右键菜单 */
    menu: function (record) {
        var me = this;
        return Ext.create('Ext.menu.Menu', {
            floating: true,
            renderTo: document.body,
            items: [{
                text: '刷新',
                iconCls: 'x-fa fa-refresh',
                handler: function () {
                    // 展开到编辑节点
                    me.expand();
                },
                listeners: {
                    render: function (_this) {
                        if (record.data.leaf == true) {
                            _this.hide()
                        }
                    }
                }
            }, {
                text: '新建文件',
                iconCls: 'cosmo_icon_createFile',
                handler: function () {
                    var page = Map.get(Const.PAGE_OBJECT);
                    Ext.getCmp('topRegion').getController().onNewFile();
                    page.treeSource.selected = record;
                },
                listeners: {
                    render: function (_this) {
                        if (record.data.leaf == true) {
                            _this.hide()
                        }
                    }
                }
            }, {
                text: '新建文件夹',
                iconCls: 'cosmo_icon_createFlod',
                handler: function () {
                    Ext.getCmp('topRegion').getController().onNewFolder();
                    var page = Map.get(Const.PAGE_OBJECT);
                },
                listeners: {
                    render: function (_this) {
                        if (record.data.leaf == true) {
                            _this.hide()
                        }
                    }
                }
            }, {
                text: '添加现有项',
                iconCls: 'cosmo_icon_existingProject',
                handler: function () {
                    Ext.getCmp('topRegion').getController().existingProject();
                    var page = Map.get(Const.PAGE_OBJECT);

                },
                listeners: {
                    render: function (_this) {
                        if (record.data.leaf == true) {
                            _this.hide()
                        }
                    }
                }
            }, me.returnOpen(record), {
                text: '重命名',
                iconCls: 'cosmo_icon_rename',
                handler: function () {
                    if (me.selected.data.id == 4) {
                        Ext.Msg.alert('提示', '不能重命名此目录！', Ext.emptyFn);
                        return;
                    }

                    // 若文件打开中，提示关闭
                    var tabPanelIds = Ext.getCmp('centerEdit').items.keys;
                    for (var i = 0; i < tabPanelIds.length; i++) {
                        if (tabPanelIds[i].replace(/newTab/, '') == me.selected.id) {
                            Ext.Msg.alert("提示", "无法重命名打开的文件！", Ext.emptyFn);
                            return;
                        }
                    }
                    if (!me.selected.data.node) {
                        Ext.Msg.alert("提示", "请选择文件夹", Ext.emptyFn);
                        return false;
                    }
                    var objType = me.selected.data.node.objType;
                    objType = objType == 'F' ? '文件夹' : '文件';
                    me.renameFile(objType);
                }
            }, {
                text: '删除',
                iconCls: 'x-fa fa-trash',
                handler: function () {
                    if (me.selected.data.id == 4) {
                        Ext.Msg.alert('提示', '不能重命名此目录！', Ext.emptyFn);
                        return;
                    }
                    // 若文件打开中，提示关闭
                    var objType;
                    if (me.selected.data.node) {
                        objType = me.selected.data.node.objType;
                    } else {
                        Ext.Msg.alert('提示', '不能删除此目录！', Ext.emptyFn);
                        return;
                    }

                    var tabPanelIds = Ext.getCmp('centerEdit').items.keys;
                    if (objType == "F") {
                        for (var j = 0; j < me.selected.childNodes.length; j++) {
                            for (var k = 0; k < tabPanelIds.length; k++) {
                                if (tabPanelIds[k].replace(/newTab/, '') == me.selected.childNodes[j].id) {
                                    Ext.Msg.alert("提示", "文件夹中有打开文件，请先关闭！", Ext.emptyFn)
                                    return;
                                }
                            }
                        }
                    } else {
                        for (var i = 0; i < tabPanelIds.length; i++) {
                            if (tabPanelIds[i].replace(/newTab/, '') == me.selected.id) {
                                Ext.Msg.alert("提示", "无法删除打开的文件，请先关闭！", Ext.emptyFn)
                                return;
                            }
                        }
                    }
                    objType = objType == 'F' ? '文件夹' : '资源文件';
                    Ext.Msg.confirm("提示", '确定要删除此' + objType + '“' + me.selected.data.text + '”嘛？', function (id, val, opt) {
                        if (id == 'yes' || id == 'ok') me.delCatalog(objType);
                    });
                }
            }],
            listeners: {
                render: function () {


                }
            }
        });
    },

    /** 切换模式点击菜单 */
    menuChoiceModel: function (event, type) {
        // 设置全局变量
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            editor = page.activeEditor,
            model = graph.getModel(),
            cell = graph.getSelectionCell();
        if (Ext.getCmp('menuModel')) {
            Ext.getCmp('menuModel').destroy();
        }
        var x = event.clientX + 5,
            y = event.clientY + 15,
            menuModel = Ext.create('Ext.menu.Menu', {
                width: 100,
                plain: true,
                id: 'menuModel',
                style: 'position: absolute;z-index: 1000;',
                floating: false,  // usually you want this set to True (default)
                renderTo: document.body,  // usually rendered by it's containing component
                items: [{
                    text: '运行模式',
                    id: 'ChooseDatadevelopment',
                    iconCls: 'ChooseDatadevelopmentImg',
                    listeners: {
                        click: function () {
                            if (Ext.getCmp('mainpath')) {
                                Ext.getCmp('mainpath').ownerCt.show();
                                Ext.getCmp('mainpath').ownerCt.previousSibling().show();
                                Ext.getCmp('menuModel').destroy();
                                Ext.getCmp('mainpath').ownerCt.previousSibling().displayTaggle = true;
                                cell.setAttribute('displayTaggle', true);
                                cell.setAttribute('pattern', 'run')
                                $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                                // 切换图标
                                me.switchIcon(0, graph, cell, model, editor)
                            }
                            // 文件是否是最新的
                            Ext.getCmp('centerEdit').getController().newFiled();
                        }
                    }
                }, {
                    text: '编码模式',
                    id: 'ChooseTaskMoni',
                    iconCls: 'ChooseTaskMoniImg',
                    listeners: {
                        click: function () {
                            if (Ext.getCmp('mainpath')) {
                                Ext.getCmp('mainpath').ownerCt.hide();
                                Ext.getCmp('mainpath').ownerCt.previousSibling().hide();
                                Ext.getCmp('menuModel').destroy();
                                cell.setAttribute('displayTaggle', false)
                                cell.setAttribute('pattern', 'code')
                                $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                                // 切换图标
                                me.switchIcon(1, graph, cell, model, editor)
                            }
                            // 文件是否是最新的
                            Ext.getCmp('centerEdit').getController().newFiled();
                        }
                    }
                }]
            });
        Ext.fly('menuModel').setXY([x, y]);
        return menuModel;
    },

    /** 切换运行模式图标*/
    switchIcon: function (index, graph, cell, model, editor) {
        var srcUrl = ["resources/images/right/datadevelopment.svg", "resources/images/right/taskMoni.svg", "resources/images/right/yarnRun.svg", "resources/images/right/runLocally.svg"],
            tip = ['运行模式', '编码模式', 'yarn模式', '本地模式'],
            overlay = new mxCellOverlay(new mxImage(srcUrl[index], 18, 18), tip[index]);
        graph.removeCellOverlay(cell)
        overlay.cursor = 'hand';
        overlay.offset = new mxPoint(-20, 15);
        overlay.align = mxConstants.ALIGN_RIGHT;
        overlay.verticalAlign = mxConstants.ALIGN_TOP;
        graph.addCellOverlay(cell, overlay);
    },

    /** 切换模式点击菜单 */
    menuChoiceModelFlink: function (event) {
        // 设置全局变量
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            editor = page.activeEditor,
            model = graph.getModel();
        if (Ext.getCmp('menuModel')) {
            Ext.getCmp('menuModel').destroy()
        }
        var x = event.clientX + 5,
            y = event.clientY + 15,
            menuModel = Ext.create('Ext.menu.Menu', {
                width: 100,
                plain: true,
                id: 'menuModel',
                style: 'position: absolute;z-index: 1000;',
                floating: false,  // usually you want this set to True (default)
                renderTo: document.body,  // usually rendered by it's containing component
                items: [{
                    text: 'yarn模式',
                    id: 'ChooseDatadevelopment',
                    iconCls: 'ChooseDatadevelopmentImgflink',
                    listeners: {
                        click: function () {
                            if (Ext.getCmp('mainpath')) {
                                Ext.getCmp('isFlowStart').show()
                                Ext.getCmp('yarnContainerCount').ownerCt.show()
                                Ext.getCmp('jobManagerRam').ownerCt.show()
                                Ext.getCmp('taskManagerRam').ownerCt.show()
                                Ext.getCmp('menuModel').destroy();
                                cell.setAttribute('displayTaggleFlink', true)
                                cell.setAttribute('flinkMode', 'yarn')
                                $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                                // 切换图标
                                me.switchIcon(2, graph, cell, model, editor)
                            }
                            // 文件是否是最新的
                            Ext.getCmp('centerEdit').getController().newFiled();
                        }
                    }
                }, {
                    text: '本地模式',
                    id: 'ChooseTaskMoni',
                    iconCls: 'ChooseTaskMoniImgflink',
                    listeners: {
                        click: function () {
                            if (Ext.getCmp('mainpath')) {
                                Ext.getCmp('isFlowStart').hide()
                                Ext.getCmp('yarnContainerCount').ownerCt.hide()
                                Ext.getCmp('jobManagerRam').ownerCt.hide()
                                Ext.getCmp('taskManagerRam').ownerCt.hide()
                                Ext.getCmp('menuModel').destroy();
                                cell.setAttribute('displayTaggleFlink', false)
                                cell.setAttribute('flinkMode', 'local')
                                $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                                // 切换图标
                                me.switchIcon(3, graph, cell, model, editor)
                            }
                            // 文件是否是最新的
                            Ext.getCmp('centerEdit').getController().newFiled();
                        }
                    }
                }]
            });
        Ext.fly('menuModel').setXY([x, y]);
        return menuModel;
    },

    /** 重命名文件（夹） */
    renameFile: function (objType) {
        var me = this;
        Ext.Msg.prompt('重命名' + objType, '请输入您要修改的名称：', function (id, text, opt) {
            if ('ok' == id || 'yes' == id) {
                Ext.Ajax.request({
                    async: false,
                    method: 'POST',
                    url: window.baseURL + 'catalog/rename',
                    params: {
                        node: me.selected.data.id,
                        rename: me.selected.data.node.title,
                        renameTo: text,
                        userId: "",
                        objType: me.selected.data.node.objType,
                        nodeId: me.selected.data.node.nodeId,
                        name: text,
                        pId: me.selected.data.node.pId,
                        objType: me.selected.data.node.objType,
                        keyword: me.selected.data.node.keyword,
                        isSystem: me.selected.data.node.isSystem,
                        objAttrib: me.selected.data.node.objAttrib,
                        creator: me.selected.data.node.creator,
                        createDate: me.selected.data.node.createDate,
                        memo: me.selected.data.node.memo,
                        file: me.selected.data.node.file,
                        path: me.selected.data.node.path,
                        secreatLevel: me.selected.data.node.secreatLevel
                    },
                    success: function (response, opts) {
                        var data = Ext.decode(response.responseText);
                        if (data.status == 0) {
                            // 成功
                            // Ext.Msg.alert('提示', '重命名' + objType + '成功！', Ext.emptyFn);
                        } else if (data.status == 1) {
                            // 失败
                            Ext.Msg.alert('提示', '重命名' + objType + '失败：' + data.msg, Ext.emptyFn);
                        }
                        // 展开到编辑节点
                        me.expand();
                        // 回显选中树
                        setTimeout(function () {
                            var path = me.getIdPath(me.selected).split("/"),
                                childUrl = path.pop(),
                                parentUrl = path.join("/"),
                                tree = Ext.getCmp("leftresource");
                            tree.expandPath(parentUrl, 'id');
                            tree.getSelectionModel().select(tree.getStore().getNodeById(childUrl))
                        }, 1000)
                    },
                    failure: function (response, opts) {
                        Ext.Msg.alert('提示', '重命名' + objType + '失败！', Ext.emptyFn);
                    }
                });
            }
        }, this, false, me.selected.data.node.title);
    },

    /** 删除文件（夹） */
    delCatalog: function (objType) {
        var loadMask = new Ext.LoadMask(Ext.getCmp("appMain"), {
            removeMask: false,
            hideMode: 'display',
            msg: '删除中，请稍后！'
        });
        loadMask.show()
        var me = this;
        Ext.Ajax.request({
            async: false,
            method: 'POST',
            url: window.baseURL + 'catalog/delete',
            params: {
                node: me.selected.data.id,
                userId: "",
                serverPath: me.selected.data.node.path,
                objType: me.selected.data.node.objType
            },
            success: function (response, opts) {
                var data = Ext.decode(response.responseText);
                if (data.status == 0) {
                    // 成功
                    loadMask.hide();
                    loadMask.destroy();
                    if (Ext.getCmp('newTab' + me.selected.data.id)) {
                        Ext.getCmp('newTab' + me.selected.data.id).close()
                    }
                    // Ext.Msg.alert('提示', '删除' + objType + '成功！', Ext.emptyFn);
                } else if (data.status == 1) {
                    // 失败
                    loadMask.hide();
                    loadMask.destroy();
                    Ext.Msg.alert('提示', '删除' + objType + '失败：' + data.msg, Ext.emptyFn);
                }
                // 展开到编辑节点
                me.expand();

                //定位到上一个文件
                var num = 0,
                    tree = Ext.getCmp("leftresource");
                if (data.status == 0)
                    var time = setInterval(function () {
                        num++;
                        var preId = me.selected.previousSibling == null ? me.selected.data.parentId : me.selected.previousSibling.id;
                        if (tree.getSelectionModel().select(tree.getStore().getNodeById(preId)) != undefined || num > 5) {
                            clearInterval(time);
                            tree.getSelectionModel().select(tree.getStore().getNodeById(preId));
                            return false;
                        }
                    }, 200);
            },

            failure: function (response, opts) {
                loadMask.hide();
                loadMask.destroy();
                Ext.Msg.alert('提示', '删除' + objType + '失败！', Ext.emptyFn);
            }
        });
    },

    /** 创建文件（夹） */
    create: function (type) {
        var me = this,
            loadMask = new Ext.LoadMask(Ext.getCmp("appMain"), {
                removeMask: false,
                hideMode: 'display',
                msg: '保存中，请稍后！'
            });

        // 资源树视图
        var treeView = me.getView(),
            objType = (type == "F" ? "文件夹" : "文件"); // 创建类型
        if (!me.selected) {
            Ext.Msg.alert('提示', '您没有选择任何节点成功！', Ext.emptyFn);
            return;
        }
        // 父节点
        var createNode;
        if (me.selected.data.leaf) {
            createNode = me.selected.parentNode;
        } else {
            createNode = me.selected;
        }

        var parentNamePath = new Ext.form.DisplayField({
            id: "pathTextArea",
            fieldLabel: '路径',
            labelStyle: "text-indent:15px",
            width: 350,
            value: me.getParentNamePath(createNode),
            readOnly: true,
            disabled: false,
            bodyStyle: 'color: #797979!important;'
        });

        var newFileName = new Ext.form.TextField({
            id: 'newFileName',
            fieldLabel: '名称',
            labelStyle: "text-indent:15px",
            width: 350,
            xtype: 'textfield',
            allowBlank: false,
            blankText: '名称不允许为空',
            invalidText: '名称不允许为空',
            maskRe: /^[^\s]+$/,
            regexText: "不允许为空格",
            focus: true,
            selectOnFocus: true,  // 聚焦是自动选中文本
            msgTarget: "under",
            validationDelay: 0    // 验证时长
        });

        var newType = new Ext.form.DisplayField({
            fieldLabel: '类型',
            labelStyle: "text-indent:15px",
            width: 350,
            value: objType,
            readOnly: true,
            disabled: false,
            bodyStyle: 'color: #797979!important;'
        });

        /** 确定 */
        var btnSubmit = new Ext.Button({
            text: '确定',
            xtype: 'button',
            listeners: {
                "click": function () {
                    if (Ext.getCmp("create-form").getForm().isValid()) {
                        loadMask.show()
                        /** 新建文件夹 */
                        if (type == 'F') {
                            Ext.Ajax.request({
                                async: false,
                                method: "POST",
                                url: window.baseURL + "catalog/save",
                                params: {
                                    file: "",
                                    serverPath: "",
                                    fileName: newFileName.getValue(),
                                    pId: createNode.id,
                                    userId: "",
                                    objType: "F"
                                },
                                success: function (response, opts) {
                                    var data = Ext.decode(response.responseText);
                                    if (data.status == 0) {
                                        // 成功
                                        loadMask.hide()
                                        // Ext.Msg.alert('提示', '新建' + objType + '成功！', Ext.emptyFn);
                                    } else if (data.status == 1) {
                                        loadMask.hide()
                                        // 失败
                                        Ext.Msg.alert('提示', '新建' + objType + '失败！', Ext.emptyFn);
                                    } else if (data.status == 2) {
                                        // 名称已存在
                                        loadMask.hide()
                                        Ext.Msg.alert('提示', objType + '名称已存在！', Ext.emptyFn);
                                        return;
                                    }
                                    win.close();
                                    // 展开到编辑节点
                                    me.expand();
                                },

                                failure: function (response, opts) {
                                    loadMask.hide();
                                    Ext.Msg.alert('提示', '新建' + objType + '失败！', Ext.emptyFn);
                                }
                            });
                        } else {
                            /** 新建文件 */
                            var filename = me.fileName = newFileName.getValue() + '.dds',
                                parent = createNode;  // 获取父节点
                            if (Ext.isEmpty(parent)) parent = treeView.getStore().getRootNode();
                            // 添加树节点
                            var tabNum = 0, tabArray = [0];
                            tabNum = Math.max.apply(null, tabArray) + 1;
                            var newNode = [{
                                id: 'newChild' + tabNum,
                                text: filename,
                                leaf: true
                            }];
                            parent.appendChild(newNode);
                            parent.set('leaf', false);
                            // 展开到编辑
                            parent.expand();
                            // 选中新建节点
                            treeView.getSelectionModel().select(treeView.getStore().getNodeById('newChild' + tabNum));
                            loadMask.hide()
                            // 保存后展开到路径使用
                            me.idPaths = me.getIdPath(parent);

                            // 给保存用到的参数赋值
                            if (parent.data.node && parent.data.node.path)
                                me.serverPath = parent.data.node.path + '/' + filename;
                            else
                                me.serverPath = 'dds/' + filename;
                            me.pId = parent.data.id;

                            // 添加Tab页
                            var curpageId = 'newTab' + tabNum,
                                tabPanel = Ext.getCmp('centerEdit');
                            tabPanel.add({
                                title: filename,
                                id: curpageId,
                                html: '',
                                closable: true
                            });
                            // 设置为当前活动页签
                            tabPanel.setActiveTab(curpageId);
                            var page = Map.get(Const.PAGE_OBJECT);
                            page.id = curpageId;
                            // 设置另存 disabled
                            Ext.getCmp('onSaveAs').setDisabled(true);
                            // 关闭对话框
                            win.close();
                        }
                        return;
                    }
                }
            }
        });

        /** 点击取消执行操作 */
        var btnCancel = new Ext.Button({
            text: '取消',
            xtype: 'button',
            listeners: {
                "click": function () {
                    win.close();
                }
            }
        });

        /** 新增资源对话框 */
        var win = new Ext.window.Window({
            title: '新建' + objType,
            width: 500,
            modal: true,
            resizable: false,
            items: [
                new Ext.form.FormPanel({
                    id: "create-form",
                    frame: true,
                    xtype: "formfield",
                    buttonAlign: "center",
                    style: 'border:none;border-radius: 0;',
                    items: [newType, parentNamePath, newFileName],
                    buttons: [btnSubmit, btnCancel]
                }),
            ]
        });
        // 显示新增对话框
        win.show(this);
    },

    /** 展开到编辑节点 */
    expand: function () {
        // 展开到编辑节点
        if (this.selected.parentNode)
            this.expandTo(this.selected.parentNode);
        else
            this.expandTo(this.selected);
    },

    /** 展开到编辑节点 */
    expandTo: function (node) {
        var idPath = this.getIdPath(node),
            rootNodeId = "4",
            tree = rootNodeId == '4' ? this.getView() : Ext.getCmp('lefttemplate');
        // 资源文件树Store(数据集)加载
        tree.getStore().load({
            node: tree.getRootNode(),
            callback: function () {
                tree.expandPath(idPath, 'id');
            }
        });
    },

    /** 根节点到当前节点的ID路径 */
    getIdPath: function (pathNode) {
        var path = [];
        for (var i = 0; i < Number.MAX_VALUE; i++) {
            if (!pathNode.parentNode) {
                path.unshift(pathNode.data.id);
                break;
            }
            path.unshift(pathNode.data.id);
            pathNode = pathNode.parentNode;
        }
        return path.join("/");
    },

    /** 根节点到当前节点的NAME路径 */
    getParentNamePath: function (pathNode) {
        if (!pathNode) {
            return '';
        }
        var path = [];
        for (var i = 0; i < Number.MAX_VALUE; i++) {
            if (!pathNode.parentNode) {
                path.unshift(pathNode.data.text);
                break;
            }
            path.unshift(pathNode.data.text);
            pathNode = pathNode.parentNode;
        }
        return path.join("/");
    },

    /** 图形移动范围限定---hmt */
    configCellMoveEvent: function (graph) {
        // 移动画布cell节点(不含线)执行事件
        graph.addListener(mxEvent.CELLS_MOVED, function (sender, evt) {
            // 文件是否是最新的
            Ext.getCmp('centerEdit').getController().newFiled();
            var selectCells = sender.getSelectionCells();
            for (var i = 0; i < selectCells.length; i++) {
                var positionX = selectCells[i].geometry.x,
                    positionY = selectCells[i].geometry.y;

                // 区分是拖拽出子流程边界还是画布边界，要做不同处理
                if (graph.moveFormParent) {
                    // x,y是相对于parent子流程的,计算方法不一样
                    var pX = selectCells[i].parent.geometry.x,
                        pY = selectCells[i].parent.geometry.y;
                    if (positionX < -pX || positionY < -pY) {
                        selectCells[i].geometry.translate(
                            (positionX < -pX) ? (-pX - positionX) : 0, (positionY < -pY) ? (-pY - positionY) : 0
                        );
                    }
                } else {
                    if (positionX < 0 || positionY < 0) {
                        selectCells[i].geometry.translate(
                            positionX < 0 ? (0 - positionX) : 0, positionY < 0 ? (0 - positionY) : 0
                        );
                    }
                }
            }
            graph.moveFormParent = false;//重置
            graph.preMoveEvent = true;
            // 移动元素去除选项
            if (Ext.getCmp('menuModel')) {
                Ext.getCmp('menuModel').destroy();
            }

        })

    },

    /** 配置边缘事件活动范围---hmt */
    configBorderEvent: function (graph) {
        // Returns the relative position of the given child
        function getRelativePosition(state, dx, dy) {
            if (state != null) {
                var model = graph.getModel(),
                    geo = model.getGeometry(state.cell);

                if (geo != null && geo.relative && !model.isEdge(state.cell)) {
                    var parent = model.getParent(state.cell);

                    if (model.isVertex(parent)) {
                        var pstate = graph.view.getState(parent);

                        if (pstate != null) {
                            var scale = graph.view.scale,
                                x = state.x + dx,
                                y = state.y + dy;

                            if (geo.offset != null) {
                                x -= geo.offset.x * scale;
                                y -= geo.offset.y * scale;
                            }

                            x = (x - pstate.x) / pstate.width;
                            y = (y - pstate.y) / pstate.height;

                            if (Math.abs(y - 0.5) <= Math.abs((x - 0.5) / 2)) {
                                x = (x > 0.5) ? 1 : 0;
                                y = Math.min(1, Math.max(0, y));
                            } else {
                                x = Math.min(1, Math.max(0, x));
                                y = (y > 0.5) ? 1 : 0;
                            }

                            return new mxPoint(x, y);
                        }
                    }
                }
            }

            return null;
        };

        // Replaces translation for relative children
        graph.translateCell = function (cell, dx, dy) {
            var rel = getRelativePosition(this.view.getState(cell), dx * graph.view.scale, dy * graph.view.scale);

            if (rel != null) {
                var geo = this.model.getGeometry(cell);

                if (geo != null && geo.relative) {
                    geo = geo.clone();
                    geo.x = rel.x;
                    geo.y = rel.y;
                    this.model.setGeometry(cell, geo);
                }
            } else {
                mxGraph.prototype.translateCell.apply(this, arguments);
            }
        };

        // Replaces move preview for relative children
        graph.graphHandler.getDelta = function (me) {
            var point = mxUtils.convertPoint(this.graph.container, me.getX(), me.getY());
            var delta = new mxPoint(point.x - this.first.x, point.y - this.first.y);

            if (this.cells != null && this.cells.length > 0 && this.cells[0] != null) {
                var state = this.graph.view.getState(this.cells[0]);
                if (state.cell.type && state.cell.type == "boundaryEvent") {
                    var rel = getRelativePosition(state, delta.x, delta.y);

                    if (rel != null) {
                        var pstate = this.graph.view.getState(this.graph.model.getParent(state.cell));

                        if (pstate != null) {
                            delta = new mxPoint(pstate.x + pstate.width * rel.x - state.getCenterX(),
                                pstate.y + pstate.height * rel.y - state.getCenterY());
                        }
                    }
                }
            }
            return delta;
        };
        var mxGraphHandlerShouldRemoveCellsFromParent = mxGraphHandler.prototype.shouldRemoveCellsFromParent;
        mxGraphHandler.prototype.shouldRemoveCellsFromParent = function (parent, cells, evt) {
            for (var i = 0; i < cells.length; i++) {
                if (this.graph.getModel().isVertex(cells[i])) {
                    var geo = this.graph.getCellGeometry(cells[i]);
                    if (geo != null && geo.relative) {
                        return false;
                    }
                    if (parent && parent.type && parent.type == "subProcess") {
                        graph.moveFormParent = true;
                    }
                }
            }
            return mxGraphHandlerShouldRemoveCellsFromParent.apply(this, arguments);
        };

        graph.isCellLocked = function (cell) {
            if (!cell) return;
            if (cell.geometry.relative) {
                return false;
            }
        };
    },

    /** 生成随机ID */
    createCmpId: function () {
        var id, idLength;
        do {
            id = "";
            idLength = 6;
            while (idLength > 0) {
                id += Math.floor(Math.random() * 16.0).toString(16);
                idLength--;
            }

        } while (this.existCmpId(id));
        return id;
    },

    /** 是否包含ID */
    existCmpId: function (id) {
        for (var cmpId in this.items) {
            if (cmpId == id)
                return true;
        }
        return false;
    }
});
