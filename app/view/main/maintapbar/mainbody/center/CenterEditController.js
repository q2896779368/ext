/**
 * 中间编辑区视图控制器
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.center.CenterEditController', {
    extend: 'Ext.app.ViewController',

    /** 控制器别名 */
    alias: 'controller.centerEdit',

    requires: ['Cosmo.Page', 'Cosmo.Const', 'Cosmo.ECharts', 'Cosmo.view.main.maintapbar.mainbody.center.CenterEditData'],

    /** 组件右键菜单 */
    contextmenu: null,

    /** 当前选中id */
    myId: null,

    /** 新建组件标志 */
    isNewItem: false,

    activeVal: "",

    /** 上一个活动组件（判断是否绘制右侧属性/样式页） */
    previousActiveId: "",

    /** 记录ctrl键 */
    key: 0,

    /** 页签Page对象 */
    cardPage: null,

    clickCount: 1,
    /**保存值状态*/
    saveStatus: false,
    /** resises实例 */
    resizer: null,
    /** 新页面id */
    newFileIdArray: [],

    /** 关闭窗口前提示用户是否保存 */
    onBeforeClose: function (panel) {
        var me = this,
            tabPanel = Ext.getCmp('centerEdit'),
            topToolItems = Ext.getCmp('topRegion').items.items;
        if (tabPanel.items.length == 1) {
            //设 置顶部工具栏 disabled
            topToolItems.forEach(function (item) {
                if (item.id != 'topObject' && item.id != 'addFile' && item.id != 'openObjectPage') {
                    item.setDisabled(true);
                }
            })
        }
        if (!panel) {
            panel = tabPanel.constructor;
        }
        tabPanel.setActiveTab(panel.id);
        var page = Map.get(Const.PAGE_OBJECT);
        if (Ext.getCmp(page.id).title.indexOf('*') >= 0) {
            Ext.Msg.confirm('提示', '是否保存对"' + Ext.getCmp(page.id).title.replace(/\*$/, '') + '"的更改？',
                function (choice) {
                    if (choice === 'yes') {
                        Ext.getCmp('topRegion').getController().onSave();
                        Ext.getCmp(page.id).doClose();
                        return false;
                    } else if (choice == 'no') {
                        // 该弹窗不能阻塞执行，会走到下面的return false，所有在这调用doCLose关闭窗口，不用close是因为会走beforeclose
                        page.pagemenu = undefined;
                        page.history = {back: {}, forward: {}};
                        Ext.getCmp(page.id).doClose()
                        // 右侧属性收缩
                        Ext.getCmp('rightProperty').collapse();
                        // 屏幕分辨率改变元件改变高度
                        Ext.getCmp('rightElement').getController().ratioResizeShrink();
                    } else {
                        return false;
                    }
                }
            );
            return false;
        }
        page.pagemenu = undefined
        return true;
    },

    /** 离开页面保存 */
    onBeforeunload: function (panel) {
        var tabPanel = Ext.getCmp('centerEdit');
        tabPanel.setActiveTab(panel.id);
        var page = Map.get(Const.PAGE_OBJECT);
        if (Ext.getCmp(page.id).title.indexOf('*') >= 0) {
            Ext.Msg.confirm('提示', '是否保存对"' + Ext.getCmp(page.id).title.replace(/\*$/, '') + '"的更改？',
                function (choice) {
                    if (choice === 'yes') {
                        Ext.getCmp('topRegion').getController().onSave();
                        Ext.getCmp(page.id).doClose();
                        return false;
                    } else if (choice == 'no') {
                        // 该弹窗不能阻塞执行，会走到下面的return false，所有在这调用doCLose关闭窗口，不用close是因为会走beforeclose
                        page.pagemenu = undefined;
                        page.history = {back: {}, forward: {}};
                        Ext.getCmp(page.id).doClose()
                    } else {
                        return false;
                    }
                }
            );
            return false;
        }
        page.pagemenu = undefined
        return true;
    },

    /** 当前活动页ID */
    getActiveId: function () {
        return this.getView().getActiveTab().getId();
    },

    /** 当前活动页标题 */
    getActiveTitle: function () {
        return this.getView().getActiveTab().getTitle();
    },

    /** tab页增加显示文件  修改状态 */
    showTabChangeStatus: function (itemId, operation, groupType) {
        var tabPanel = Ext.getCmp('centerEdit');
        var page = Map.get(Const.PAGE_OBJECT);
        // 对有新操作的页签添加*提示
        if (page.history) {
            if (page.history.back) {
                if (!page.history.back || !page.history.back[page.id] || !page.history.back[page.id].length) {
                    if (tabPanel.getActiveTab().getTitle().indexOf('*') < 0)
                        tabPanel.getActiveTab().setTitle(tabPanel.getActiveTab().getTitle() + '*')
                }
            }
        } else {
            if (tabPanel.getActiveTab().getTitle().indexOf('*') < 0)
                tabPanel.getActiveTab().setTitle(tabPanel.getActiveTab().getTitle() + '*')
        }
    },

    /** 页签切换事件 */
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this,
            topToolItems = Ext.getCmp('topRegion').items.items;

        $(window).keydown(function (e) {
            if (e.ctrlKey) {
                me.key = 1;
                $('#selectCmpDiv').css('z-index', 2);
                $('.groupDiv').css('z-index', 2);
            }
        }).keyup(function () {
            me.key = 0;
            $('#selectCmpDiv').css('z-index', 10000);
            $('.groupDiv').css('z-index', 10000);
        });

        // 新页面id数组
        var newFileIdArray = Ext.getCmp('topRegion').getController().newFileIdArray;

        // 缓存（切换/打开）文件之前的Page对象
        if (oldCard && oldCard.id !== Const.DEFAULT_TAB) {
            var oldCardPage = Map.get(Const.PAGE_OBJECT);
            Map.put(oldCard.id, oldCardPage);
        }
        // 取得要切换的页签Page对象，如果没有表示打开新页签
        var newCardPage = Map.get(newCard.id);
        // 点击空白处属性为空白
        if (newCardPage) {                              // 切换到已有页签
            //Ext.getCmp('rightProperty').getController().createRightProperty(graph.getSelectionCell(), true);
            // 重新赋值页签id防止切换时页签id对应Page对象id紊乱
            newCardPage.id = me.getActiveId();
            Map.put(Const.PAGE_OBJECT, newCardPage);
            var resourceController = Ext.getCmp('leftresource').getController();
            var thisPage = Map.get(Const.PAGE_OBJECT);
            // 没有treeSource和双击的是打开过的文件时进行treeSource赋值，避免
            if (!thisPage.treeSource || (thisPage.treeSource.nodeId == resourceController.nodeId)) {
                thisPage.treeSource = {}
                thisPage.treeSource.nodeId = resourceController.nodeId;
                thisPage.treeSource.fileName = resourceController.fileName;
                thisPage.treeSource.serverPath = resourceController.serverPath;
                thisPage.treeSource.pId = resourceController.pId;
                thisPage.treeSource.selected = resourceController.selected;
            }
            // 标尺
            me.onRuler(newCardPage);
            // 拖拽
            me.moveCmp(me.getActiveId());

        } else {

            // 打开新页签
            var ref = Ext.create('Cosmo.util.Page');
            ref.id = newCard.id;
            Map.put(Const.PAGE_OBJECT, ref);
            var page = Map.get(Const.PAGE_OBJECT),
                resourceController = Ext.getCmp('leftresource').getController(),
                // 将保存用的信息存入page对象中
                flag = false;
            $(newFileIdArray).each(function (index, id) {
                if (id == page.id) flag = true;
            })
            page.treeSource = {};
            if (!flag) {
                page.treeSource.nodeId = resourceController.nodeId;
                page.treeSource.fileName = resourceController.fileName;
                page.treeSource.serverPath = resourceController.serverPath;
                page.treeSource.pId = resourceController.pId;
                page.treeSource.selected = resourceController.selected;
            } else {
                page.treeSource.nodeId = '';
                page.treeSource.fileName = '';
                page.treeSource.serverPath = '';
                page.treeSource.pId = '';
                page.treeSource.selected = '';
            }
            // 标尺、滚动条
            if (newCard.id !== Const.DEFAULT_TAB) {
                me.onRuler(newCard);
            }
            // 拖拽
            me.moveCmp(me.getActiveId());
        }
        // 当前page对象
        var page = Map.get(Const.PAGE_OBJECT);
        // 设置顶部工具栏 disabled
        topToolItems.forEach(function (item) {
            item.setDisabled(false);
        })
        // 单独设置另存disabled
        if (page.treeSource && page.treeSource.nodeId) {
            Ext.getCmp('onSaveAs').setDisabled(false);
        } else {
            Ext.getCmp('onSaveAs').setDisabled(true);
        }
        // 刷新page属性
        setTimeout(function () {
            var page = Map.get(Const.PAGE_OBJECT),
                graph = page.activeGraph;
            Ext.getCmp('rightProperty').getController().createRightProperty(graph.getSelectionCells()[0], true);
        },100)
    },

    /** 标尺 */
    onRuler: function (newCard) {
        // 当前活动Tab面板Body的ID
        var activeTab = $("#" + this.getView().getActiveTab().body.id);
        // 添加滚动条
        this.onScroll(activeTab);
    },

    /** 滚动条 */
    onScroll: function (activeTab) {
        // 滚动条插件
        activeTab.niceScroll({
            enablekeyboard: false, // 不让nicescroll管理键盘事件
            cursorborder: '0px solid #526472',
            cursorcolor: '#c5c5c5',
            autohidemode: 'leave',
            zindex: 9000,
            cursorborderradius: "4px",
        });
        // 滚动条定位
        /*activeTab.getNiceScroll(0).doScrollLeft(5000); // Scroll X Axis
        activeTab.getNiceScroll(0).doScrollTop(600); // Scroll Y Axis*/
    },

    /** 根据落脚点获取当前目标物 */
    getTargetCell: function (graph, x, y) {
        var realX = x + graph.container.scrollLeft,
            realY = y + graph.container.scrollTop,
            cell = graph.getCellAt(realX, realY);
        return cell;
    },


     /** 组件定位 */
    ComponentLocation: function(){
        var  page = Map.get(Const.PAGE_OBJECT);
        $('#'+page.id+'-body').getNiceScroll(0).resize();           //刷行滚动条
        $('#'+page.id+'-body').getNiceScroll(0).doScrollLeft(1600); //x
        $('#'+page.id+'-body').getNiceScroll(0).doScrollTop(1600);  //y
    },

    /** 绑定事件-拖放组件 */
    moveCmp: function (id) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT);

        if (!id) id = me.getActiveId();
        page.id = id;
        var editId = Const.POUND + id + Const._BODY,
            container = $('#' + id + '-body>div')[0];
        new Ext.dd.DropTarget(container, {
            ddGroup: 'cmpDdGroup',
            notifyOver: function (ddSource, e, data, ee) {
                var page = Map.get(Const.PAGE_OBJECT),
                    editor = page.activeEditor,
                    graph = page.activeGraph,
                    posX = parseInt(e.getX() - container.getBoundingClientRect().left),
                    posY = parseInt(e.getY() - container.getBoundingClientRect().top);
                var targetCell = me.getTargetCell(graph, posX, posY);
                if (targetCell && targetCell.type && targetCell.type == "subProcess") {
                    graph.allowdragIn = true;
                } else {
                    graph.allowdragIn = false;
                }
                // 图标改变为允许的默认操作，不加会导致拖入区域图标不变化
                return this.dropAllowed;
            },
            /** 在目标区域放置元件触发 */
            notifyDrop: function (ddSource, e, data, ee) {
                //文件是否是最新的
                me.newFiled()
                var resourceCtrl = Ext.getCmp('leftresource').getController(),
                    page = Map.get(Const.PAGE_OBJECT),
                    editor = page.activeEditor,
                    graph = page.activeGraph,
                    parent = graph.getDefaultParent(),
                    model = graph.getModel(),
                    cell = graph.getSelectionCell(),
                    posX = parseInt(e.getX() - container.getBoundingClientRect().left),
                    posY = parseInt(e.getY() - container.getBoundingClientRect().top);

                // 开启更新事务
                model.beginUpdate();
                try {
                    var targetCell = me.getTargetCell(graph, posX, posY);
                    if (ddSource.id == 'FreeWebPage' && targetCell) {
                        var exitOverLay = graph.getCellOverlays(targetCell),
                            src = 'resources/images/favicon.ico';
                        if (exitOverLay) {
                            graph.clearCellOverlays(targetCell);
                            src = ''
                        }
                        var overlay = new mxCellOverlay(new mxImage("resources/images/right/true.png", 24, 24), "tip");
                        overlay.cursor = 'hand';
                        overlay.offset = new mxPoint(-15, 15);
                        overlay.align = mxConstants.ALIGN_RIGHT;
                        overlay.verticalAlign = mxConstants.ALIGN_TOP;
                        graph.addCellOverlay(targetCell, overlay);
                    } else {
                        // 如果是组件元素是组件元素
                        var v1;
                        if (ddSource.id.split('-')[0] === 'leftresource') {
                            v1 = model.cloneCell(editor.templates['SubWorkFlow']);
                            v1.id = 'SubWorkFlow' + "-" + resourceCtrl.createCmpId();
                            resourceCtrl.items.push(v1.id.split('-')[1]);
                            // 判断 文件子组件是否重复
                            // 当前文件nodeId
                            var atPresentNode = Map.get(Const.PAGE_OBJECT).treeSource.nodeId,
                                // 拖拽子文件nodeid
                                subfileNodeId = Ext.getCmp('leftresource').getController().getView().getSelectionModel().getSelection()[0].data.node.nodeId,
                                subfilePath = Ext.getCmp('leftresource').getController().getView().getSelectionModel().getSelection()[0].data.node.path,
                                // 子文件下的nodeid
                                nodeSubfileArrs = Ext.getCmp('leftresource').getController().getView().getSelectionModel().getSelection()[0].data.node.memo;
                            // 添加子流程属性 nodeid
                            v1.setAttribute('nodeId',subfileNodeId);
                            // 所有子文件集合
                            cellsAtPresent = graph.getDefaultParent().children;
                            // 判断当前文件nodeid 与拖进的子文件nodeid相比较 一致则返回
                            if (atPresentNode == subfileNodeId) {
                                return false;
                            }
                            //  判断当前文件nodeid 与拖进的子文件nodeidarr相比较 一致则返回
                            if (cellsAtPresent != null) {
                                for (var i = 0; i < cellsAtPresent.length; i++) {
                                    if (cellsAtPresent[i].style == 'SubWorkFlow') {
                                        if (cellsAtPresent[i].getAttribute('noidArr')) {
                                            if (cellsAtPresent[i].getAttribute('noidArr').indexOf(subfileNodeId) > -1) {
                                                return false;
                                            }
                                        }
                                    }
                                }
                            }
                            // 判断已有的子文件nodeid与 拖进子文件nodeid作比较  return false;
                            // 新建的文件
                            /*if (cellsAtPresent != null) {
                                for (var i = 0; i < cellsAtPresent.length; i++) {
                                    if (cellsAtPresent[i].style == 'SubWorkFlow') {
                                        if (cellsAtPresent[i].getAttribute('node') == subfileNodeId) {
                                            return false;
                                        }
                                    }
                                }
                            }*/
                            // 判断 拖拽文件下文件集与页面中所有的子文件集比较
                            /* if (typeof nodeSubfileArrs == "string") {
                                 nodeSubfileArrs = nodeSubfileArrs.split(',')
                             }*/
                            // 判断单个nodeid
                            /*if (nodeSubfileArrs != '' && cellsAtPresent != null) {
                                for (var i = 0; i < cellsAtPresent.length; i++) {
                                    for (var j = 0; j < nodeSubfileArrs.length; j++) {
                                        if (cellsAtPresent[i].style == 'SubWorkFlow') {
                                            if (cellsAtPresent[i].getAttribute('node') == nodeSubfileArrs[j]) {
                                                return false;
                                            }
                                        }
                                    }
                                }
                            }*/
                            // 判断多个nodeidarr
                            /*if (nodeSubfileArrs != '' && cellsAtPresent != null) {
                                for (var i = 0; i < cellsAtPresent.length; i++) {
                                    for (var j = 0; j < nodeSubfileArrs.length; j++) {
                                        if (cellsAtPresent[i].style == 'SubWorkFlow') {
                                            if (cellsAtPresent[i].getAttribute('noidArr')) {
                                                if (cellsAtPresent[i].getAttribute('noidArr').indexOf(nodeSubfileArrs[j]) > -1) {
                                                    return false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }*/
                            // 判断多个nodeidarr
                            if (nodeSubfileArrs != '') {
                                nodeSubfileArrs = nodeSubfileArrs.split(',')
                                for (var j = 0; j < nodeSubfileArrs.length; j++) {
                                    if (nodeSubfileArrs[j] == atPresentNode) {
                                        return false;
                                    }
                                }
                            }
                        } else {
                            v1 = model.cloneCell(editor.templates[ddSource.id]);
                            v1.id = ddSource.id + "-" + resourceCtrl.createCmpId();
                            resourceCtrl.items.push(v1.id.split('-')[1]);
                        }
                        v1.connectable = true;
                        v1.setVertex(true);
                        //添加图片
                        if (ddSource.id == 'Hive' || ddSource.id == 'SparkPython' || ddSource.id == 'SparkScala' || ddSource.id == 'Shell') {
                            // 添加模式区分图标
                            var overlay = new mxCellOverlay(new mxImage("resources/images/right/datadevelopment.svg", 18, 18), '运行模式');
                            overlay.cursor = 'hand';
                            overlay.offset = new mxPoint(-20, 15);
                            overlay.align = mxConstants.ALIGN_RIGHT;
                            overlay.verticalAlign = mxConstants.ALIGN_TOP;
                            graph.addCellOverlay(v1, overlay);
                        }
                        if (ddSource.id == 'Flink') {
                            var overlay = new mxCellOverlay(new mxImage("resources/images/right/yarnRun.svg", 18, 18), 'yarn模式');
                            overlay.cursor = 'hand';
                            overlay.offset = new mxPoint(-20, 15);
                            overlay.align = mxConstants.ALIGN_RIGHT;
                            overlay.verticalAlign = mxConstants.ALIGN_TOP;
                            graph.addCellOverlay(v1, overlay);
                        }
                        v1.geometry.x = posX;
                        v1.geometry.y = posY;
                        graph.addCell(v1, parent);
                        graph.setSelectionCell(v1);
                        Ext.getCmp('leftresource').getController().dragFlag = true;
                    }
                } finally {  // 结束更新事务
                    model.endUpdate();
                }
            }
        });
    },
    /** 判断文件是否重复*/
    isOverlappingFile: function () {

    },
    /** 文件是否最新标识*/
    newFiled: function () {
        var tit = Ext.getCmp('centerEdit').getActiveTab().title,
            page = Map.get(Const.PAGE_OBJECT),
            newPageTitle;
        if (tit.indexOf('*') > -1) {
            newPageTitle = tit.split('*')[0] + '*';
        } else {
            newPageTitle = tit.split('.')[0] + '*';
        }
        if (Ext.getCmp('centerEdit').getActiveTab()) {
            // 打开或切换到保存的文件如果此页面新增组件将改变page的名称增加*号来表示未保存
            Ext.getCmp('centerEdit').getActiveTab().setTitle(newPageTitle)
        }
    },

    /** 新建文件2(aceEditor编辑器) ace */
    onNewEditor: function (cellstyle) {
        var me = this,
            tabPanel = Ext.getCmp('centerEdit'),// 中心流程设计区
            cellstyleTitle,
            tabId = 'newTab' + new Date().getTime();// 中心流程设计区TAB页ID
        me.historyInfo = [];
        me.hisInfoData = [];
        me.saveStatus = false;
        //函数速查表
        var funData = Ext.create('Cosmo.view.main.maintapbar.mainbody.center.CenterEditData').config.data;
        //判断点击的组件类型
        if (cellstyle == 'Hive') {
            cellstyleTitle = 'Cosmo++SQL';
        } else {
            cellstyleTitle = cellstyle;
        }
        // 加入新建文件ID数组，为新建文件编号
        me.newFileIdArray.push(tabId);
        if (Ext.getCmp(tabId)) {
            Ext.getCmp(tabId).destroy();
        }
        // 双击弹出的页面 ace
        Ext.create('Ext.window.Window', {
            title: cellstyleTitle,
            id: tabId,
            height: Ext.getCmp("appMain").getHeight() - 48,
            resizable: true,
            width: '100%',
            layout: 'fit',
            border: false,
            constrain: true,
            cls: 'aceRedactWindow',
            autoHeight: true,
            y: 50,
            tools: [{
                type: 'close',
                id: 'closeAce',
                tooltip: '关闭',
                handler: function (event, toolEl, panelHeader) {
                    var page = Map.get(Const.PAGE_OBJECT),
                        graph = page.activeGraph,
                        cell = graph.getSelectionCell(),
                        ediotrContent = ace.edit("editorJs").getValue(), // ace值
                        sqlediotrContent = '';  // sql运行的数据库
                    if (Ext.getCmp('selectMs')) {
                        sqlediotrContent = Ext.getCmp('selectMs').getValue();
                    }

                    if (ediotrContent && me.saveStatus == false) {
                        if (ediotrContent == cell.getAttribute('aceValue')) {
                            if (ediotrContent.length >= 0) {
                                Ext.getCmp(tabId).destroy()
                                return false;
                            }
                        }
                        Ext.Msg.confirm("保存", "是否保存？", function (res) {
                            // 验证逻辑
                            if (res === "yes") {
                                cell.setAttribute('aceValue', ediotrContent);
                                cell.setAttribute('codeModeScript', ediotrContent);
                                cell.setAttribute('sqlAceValue', sqlediotrContent); // 保存 sql运行的数据库
                                Ext.getCmp(tabId).destroy();
                            } else {
                                Ext.getCmp(tabId).destroy();
                            }
                        })
                    } else {
                        Ext.getCmp(tabId).destroy()
                    }
                }
            }],
            header: {
                height: '24px',
                style: 'padding:1px 5px;background-image: linear-gradient(-180deg, #eee 0%, #ddd 100%);border-radius:5px 5px 0px 0px;',
            },
            items: [
                {
                    layout: 'anchor',
                    expanded: true,
                    region: 'north',
                    border: false,
                    items: [{                           //头部的部分
                        anchor: "100% 62%",
                        id: "topHdfs",
                        layout: 'border',
                        style: 'background:#fff',
                        border: false,
                        items: [{                      //左侧的点击事件
                            region: 'west',
                            id: 'leftBtns',
                            width: 40,
                            height: "100%",
                            frame: true,
                            border: false,
                            align: "center",
                            items: [{
                                tooltip: "保存",
                                iconCls: 'ace_icon_left_SD',
                                iconAlign: 'center',
                                border: false,
                                id: 'lockCode',
                                cls: "ace_icon_left_style",
                                overCls: "ace_icon_left_active",
                                xtype: 'button',
                                listeners: {
                                    click: function () {
                                        var ediotrContent = ace.edit("editorJs").getValue(),
                                            sqlediotrContent = '',  // sql运行的数据库
                                            page = Map.get(Const.PAGE_OBJECT),
                                            graph = page.activeGraph,
                                            cell = graph.getSelectionCell();
                                        if (Ext.getCmp('selectMs')) {
                                            sqlediotrContent = Ext.getCmp('selectMs').getValue();
                                        }
                                        // 判断是否为空值
                                        if (!ediotrContent) {
                                            Ext.Msg.alert('提示', '保存值不能为空！', Ext.emptyFn);
                                            return false;
                                        }
                                        me.saveStatus = true;
                                        // 判断是否保存过值
                                        if (cell.getAttribute('aceValue')) {
                                            Ext.Msg.confirm("保存", "是否覆盖上一次的值？", function (res) {
                                                // 验证逻辑
                                                if (res === "yes") {
                                                    cell.setAttribute('aceValue', ediotrContent);
                                                    cell.setAttribute('codeModeScript', ediotrContent);
                                                    cell.setAttribute('sqlAceValue', sqlediotrContent);
                                                } else {
                                                    return false;
                                                }
                                            })
                                        } else {
                                            cell.setAttribute('aceValue', ediotrContent);
                                            cell.setAttribute('codeModeScript', ediotrContent);
                                            cell.setAttribute('sqlAceValue', sqlediotrContent);
                                            Ext.Msg.alert('提示', '保存成功！', Ext.emptyFn);
                                        }
                                    }
                                }
                            }, {
                                tooltip: "编译",
                                id: 'compileCode',
                                iconCls: 'ace_icon_left_BY',
                                iconAlign: 'center',
                                border: false,
                                cls: "ace_icon_left_style",
                                overCls: "ace_icon_left_active",
                                xtype: 'button',
                                listeners: {
                                    click: function () {
                                        var ediotrContent = ace.edit("editorJs").getValue();
                                        if (!ediotrContent) {
                                            Ext.Msg.alert('提示', '编辑区输入不能为空!');
                                            return false;
                                        }
                                        me.compileCode(cellstyle)
                                    }
                                }
                            }, {
                                tooltip: "执行",
                                iconCls: 'ace_icon_left_ZX',
                                iconAlign: 'center',
                                border: false,
                                xtype: 'button',
                                id: 'btnRun',
                                cls: "ace_icon_left_style",
                                overCls: "ace_icon_left_active",
                                focusCls: 'ace_icon_left_active',
                                listeners: {
                                    click: function () {
                                        var ediotrContent = ace.edit("editorJs").getValue();
                                        if (!ediotrContent) {
                                            Ext.Msg.alert('提示', '编辑内容不能为空!');
                                            return false;
                                        }
                                        me.aceRun(cellstyle);
                                    }
                                }
                            }]
                        }, {                      //中间的ace区域
                            region: 'center',
                            height: "100%",
                            width: "100%",
                            html: '<div class="ace_editor ace-tm" id="editorJs" name="editorJs" style="width:100%;position: absolute;height:100%;top: 0px; right: 0px;"></div>',
                            listeners: {
                                afterrender: function () {
                                    var me = this;
                                    me.editorJs = ace.edit("editorJs");
                                    ace.edit("editorJs").focus()
                                    // 设置编辑器样式，对应theme-*.js文件
                                    me.editorJs.setTheme("ace/theme/github");
                                    // 设置代码语言，对应mode-*.js文件
                                    switch (cellstyle) {
                                        case 'Hive':
                                            me.editorJs.session.setMode("ace/mode/sql");
                                            break;
                                        case 'SparkPython':
                                            me.editorJs.session.setMode("ace/mode/python");
                                            break;
                                        case 'SparkScala':
                                            me.editorJs.session.setMode("ace/mode/scala");
                                            break;
                                        case 'Shell':
                                            me.editorJs.session.setMode("ace/mode/sh");
                                            break;
                                    }
                                    // 设置打印线是否显示
                                    me.editorJs.setShowPrintMargin(false);
                                    // 设置是否只读
                                     me.editorJs.setReadOnly(false);
                                    // 设置自动换行
                                    me.editorJs.setOption("wrap", "free");
                                    // 设置高亮:
                                    me.editorJs.setHighlightActiveLine(true);
                                    // 监听选择事件:
                                    me.editorJs.getSession().selection.on('changeSelection', function (e) {
                                        // 获取选择内容:
                                        // console.log(me.editorJs.session.getTextRange(me.editorJs.getSelectionRange()));
                                    });
                                    // 设置输入代码提示
                                    me.editorJs.setOptions({
                                        enableBasicAutocompletion: true,
                                        enableSnippets: true,
                                        enableLiveAutocompletion: true
                                    });
                                    // 当用户更改自定义JS时，更新Page对象
                                    me.editorJs.on('change', function () {
                                        var code = me.editorJs.getValue(),
                                            page = Map.get(Const.PAGE_OBJECT);
                                        if (page) page.js = code;
                                        setTimeout(function () {
                                            me.editorJs.resize();
                                            // 滚动条
                                            $('#editorJs .ace_scrollbar').niceScroll({
                                                cursorborder: '1px solid #c5c5c5',
                                                cursorcolor: '#c5c5c5',
                                                horizrailenabled: false,
                                                autohidemode: 'leave'
                                            });
                                            $('#editorJs .ace_scrollbar').getNiceScroll().resize();
                                        }, 50)
                                    });
                                }
                            }
                        }, {
                            // 右侧属性栏
                            id: 'aceEditorEast',
                            region: 'east',
                            width: 320,
                            height: "100%",
                            xtype: "tabpanel",
                            activeTab: 0,
                            tabPosition: 'top',
                            tabRotation: 0,
                            resizeTabs: false,
                            border: true,
                            style: 'border:1px solid #cacaca;',
                            listeners: {
                                render: function () {
                                    var msgInfo = ''
                                    if (cellstyle == 'Hive') {
                                        msgInfo = '<p style="text-align: left;">Cosmo++ SQL是用于查询存储在BDP集群中的大量数据的工具。Cosmo++ SQL主要实现了一个查询各类的数据，以及各类不同库的同源异构数据适配器，它提供了访问存储在Cosmo++ DSN中的数据快速、便捷的方法，\n' +
                                            '\n' +
                                            'Cosmo++ SQL支持内存和MR两种方式对数据处理访问/分析，而无需数据移动。\n' +
                                            '\n' +
                                            '您可以通过Cosmo++ SQL使用类SQL查询访问数据。</p><p style="text-align: left;">Cosmo++ SQL支持将数据存储在常用分布式存储系统中，如HDFS，Apache HBase和Amazon s3。</p><p style="text-align: left;">Cosmo++ SQL支持各种文件格式，如序列文件，Avro，和Parquet。</p><p style="text-align: left;">Cosmo++ SQL支持使用Apache Hive的元数据，ODBC驱动程序和SQL语法。</p>';
                                        var arr = [{
                                            title: '数据源配置',
                                            id: 'dataSourceConfig',
                                            border: false,
                                            style: 'width:50%',
                                            items: [{
                                                xtype: 'panel',
                                                title: '选择数据库',
                                                bodyPadding: 50,
                                                border: false,
                                                items: [{
                                                    xtype: 'combo',
                                                    id: 'selectMs',
                                                    value: '',
                                                    emptyText: '请选择数据库',
                                                    width: '180px'
                                                }]
                                            }]
                                        }, {
                                            title: '函数速查表',
                                            id: 'funLookupTable',
                                            border: false,
                                            style: 'width:50%',
                                            width: '100%',
                                            items: [{
                                                xtype: 'panel',
                                                width: '90%',
                                                style: 'border-radius: 5px;border: 1px solid #cac8c8;margin-left: 5%;margin-bottom: 10px;margin-top:10px',
                                                items: [{
                                                    xtype: "tabpanel",
                                                    activeTab: 0,
                                                    width: '100%',
                                                    id: 'funLookupTableItems',
                                                    scrollable: true,
                                                    listeners: {
                                                        render: function (tabPanel) {
                                                            var html = [];
                                                            for (var i = 0; i < funData.right.length; i++) {
                                                                if (funData.right[i][0].concnet instanceof Array) {
                                                                    var htmlItem = '';
                                                                    for (var m = 0; m < funData.right[i][0].concnet.length; m++) {
                                                                        htmlItem += '<li style="padding:5px;text-align: left;">' + funData.right[i][0].concnet[m].titles + '</li>';
                                                                    }
                                                                }
                                                                html.push('<div class="hiveBox"><h4  style="color:#053e54;text-align: left;cursor:pointer;border-bottom:1px solid #f2f2f2;padding: 0 5px;margin:0;height: 30px;line-height:30px;"><img src="resources/images/top/trigonIcon.png" style="width: 10px;display: inline-block;padding-right: 2px" alt="">' + funData.right[i][0].title + '</h4><ul style="list-style: none;margin: 0;padding:0 10px;display: none;">' + htmlItem + '</ul></div>')
                                                            }
                                                            var html2 = [];
                                                            for (var i = 0; i < funData.left.length; i++) {
                                                                if (funData.left[i][0].concnet instanceof Array) {
                                                                    var htmlItem2 = ''
                                                                    for (var m = 0; m < funData.left[i][0].concnet.length; m++) {
                                                                        htmlItem2 += '<li style="padding:5px;text-align: left;">' + funData.left[i][0].concnet[m].titles + ' </li>';
                                                                    }
                                                                }
                                                                html2.push('<div class="hiveBox"><h4 style="color:#053e54;text-align: left;cursor:pointer;height: 30px;border-bottom:1px solid #f2f2f2;padding: 0 5px;margin:0;line-height:30px;"><img src="resources/images/top/trigonIcon.png" style="width: 10px;display: inline-block;padding-right: 2px" alt="">' + funData.left[i][0].title + '</h4><ul style="ist-style: none;margin: 0;padding:0 10px; display: none;">' + htmlItem2 + '</ul></div>')
                                                            }
                                                            Ext.getCmp('funLookupTableItems').add([{
                                                                title: 'Cosmo++ SQL',
                                                                id: 'sqlLis',
                                                                html: html2,
                                                                height: 300,
                                                                scrollable: true,
                                                                listeners: {
                                                                    afterrender: function () {
                                                                        setTimeout(function () {
                                                                            $('#sqlLis-body').niceScroll({
                                                                                "cursorborder": '1px solid rgb(197, 197, 197)',
                                                                                "cursorcolor": 'rgb(197, 197, 197)',
                                                                                "autohidemode": 'leave',
                                                                            });
                                                                        }, 0);
                                                                    }
                                                                }
                                                            }, {
                                                                title: 'Hive',
                                                                id: 'hiveLis',
                                                                html: html,
                                                                height: 300,
                                                                scrollable: true,
                                                                listeners: {
                                                                    afterrender: function () {
                                                                        setTimeout(function () {
                                                                            $('#hiveLis-body').niceScroll({
                                                                                "cursorborder": '1px solid rgb(197, 197, 197)',
                                                                                "cursorcolor": 'rgb(197, 197, 197)',
                                                                                "autohidemode": 'leave',
                                                                            });
                                                                        }, 0)
                                                                    }
                                                                }
                                                            }
                                                            ]),
                                                                Ext.getCmp('funLookupTableItems').setActiveTab(0);
                                                        },
                                                        tabchange: function (tab, tabPanel, newCard, oldCard, oPt) {
                                                            me.funEvent(tab.getActiveTab().getTitle(), funData)
                                                        }
                                                    }
                                                }]
                                            }, {
                                                xtype: 'panel',
                                                width: '100%',
                                                height: 250,
                                                id: 'sqlInfo',
                                                autoScroll: true,
                                                style: "border-top:2px solid #ccc; box-sizing: border-box;padding:15px  10px;line-height:14px;text-align:left;background:#f1f1f1;",
                                                listeners: {
                                                    afterrender: function () {
                                                        setTimeout(function () {
                                                            $('#sqlInfo-body').niceScroll({
                                                                "cursorborder": '1px solid rgb(197, 197, 197)',
                                                                "cursorcolor": 'rgb(197, 197, 197)',
                                                                "autohidemode": 'leave'
                                                            });
                                                        }, 0)
                                                    }
                                                }
                                            }]
                                        }, {
                                            title: '关于',
                                            id: 'guanyuce',
                                            style: 'padding:0 20px;text-indent:20px;line-height:18px;color:grey',
                                            html: msgInfo
                                        }]
                                        Ext.getCmp('aceEditorEast').add(arr);
                                        me.getselectSql(cellstyle);
                                    } else {
                                        if (cellstyle == 'SparkPython') {
                                            msgInfo = '<p style="text-align: left;">一个Web笔记形式的交互式数据查询分析工具，可以在线用Python语言对数据进行查询分析并生成报表或形成结果集和其他组件对接交换分析，后台数据引擎是Spark。支持的Spark 2.4/1.6</p>'
                                        } else if (cellstyle == 'SparkScala') {
                                            msgInfo = '<p style="text-align: left;">一个Web笔记形式的交互式数据查询分析工具，可以在线用scala语言对数据进行查询分析并生成报表或形成结果集和其他组件对接交换分析，后台数据引擎是Spark。支持的Spark 2.4/1.6</p>'
                                        } else {
                                            msgInfo = '<p style="text-align: left;">Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。\n' +
                                                '在DDS中，Shell 是命令语言的使用格式，通过Web交互，或者构建命令脚本的方式，来实现业务流程中的每个任务对服务器的交互操作。此外，用户也可以直接通过这个界面访问操作系统内核的服务。来实现仿Notebook式Shell脚本开发，使脚本的可控性，灵活性等大大增强。</p>'
                                        }
                                        var arr = [{
                                            title: '关于',
                                            id: 'guanyuce',
                                            style: 'padding:0 20px;text-indent:20px;line-height:18px;color:grey',
                                            html: msgInfo
                                        }]
                                        Ext.getCmp('aceEditorEast').add(arr);
                                    }
                                    Ext.getCmp('aceEditorEast').setActiveTab(0)
                                },
                            }
                        }],
                    }, {
                        // 底部属性栏
                        anchor: "100% 38%",
                        id: 'botmBox',
                        xtype: "tabpanel",
                        activeTab: 1,               // 激活标签页
                        tabPosition: 'top',
                        items: [{
                            title: '查询结果',
                            layout: 'fit',
                            scrollable: true,
                            autoScroll: true,
                            items: [{
                                region: 'center',
                                height: '100%',
                                width: '100%',
                                floatable: false,
                                id: 'dataSelect',
                                scrollable: true,
                                autoScroll: true,
                                hideCollapseTool: true,
                                html: '<div id="noDataBg" style="height: 100%;width: 100%;font-size:16px;background-image: linear-gradient(0deg, rgba(235,235,235,1) 50%, transparent 50%, transparent); background-size: 37px 37px;background-color: rgba(245,245,245,1);border-top: 1px solid #d0cece;"></div>',
                                items: [{
                                    width: '100%',
                                    height: '24',
                                    border: true,
                                    xtype: 'button',
                                    id: 'moreListBtn',
                                    text: '查看更多',
                                    style: 'position: absolute;left:0;bottom: 0;z-index: 55555;',
                                    listeners: {
                                        click: function () {
                                            var pageNum = 1;
                                            me.pageSql(pageNum);
                                        },
                                        afterrender: function () {
                                            // 组件 隐藏
                                            Ext.getCmp('moreListBtn').disable()
                                            Ext.getCmp('moreListBtn').setText('')
                                        }
                                    }
                                }]
                            }],
                            listeners: {
                                render: function () {
                                }
                            }
                        }, {
                            title: '历史数据',
                            id: 'dataHistory',
                            autoScrollX: false,
                            scrollable: true,
                            style: 'border-top: 1px solid #d0cece;',
                            html: '<div id="noDataBgHis" style="height: 100%;width: 100%;font-size:16px;background-image: linear-gradient(0deg, rgba(235,235,235,1) 50%, transparent 50%, transparent); background-size: 37px 37px;background-color: rgba(245,245,245,1);"></div>',
                            listeners: {
                                render: function () {
                                    me.runHistory(cellstyle)
                                }
                            }
                        }]
                    }],
                }],
            closable: true,
            listeners: {
                afterrender: function (_this) {
                    Ext.getCmp('closeAce').nextSibling().destroy();
                    // 赋值上一次 运行的值
                    var page = Map.get(Const.PAGE_OBJECT),
                        graph = page.activeGraph,
                        cell = graph.getSelectionCell(),
                        aceValueMxgraph = cell.getAttribute('aceValue'),     // ace运行的值
                        sqlediotrContent = cell.getAttribute('sqlAceValue'); // 选择的数据库

                    setTimeout(function () {
                        if (aceValueMxgraph) {
                            ace.edit("editorJs").insert(aceValueMxgraph);    //ace运行的值
                            $('#editorJs .ace_scrollbar').niceScroll({
                                cursorborder: '1px solid #c5c5c5',
                                cursorcolor: '#c5c5c5',
                                horizrailenabled: false,
                                autohidemode: 'leave'
                            });
                            $('#editorJs .ace_scrollbar').getNiceScroll().resize();
                            ace.edit("editorJs").selection.getCursor();      // 光标
                        }
                        if (sqlediotrContent) {
                            if (sqlediotrContent === 'null') {
                                sqlediotrContent = '请选择数据库'
                            }
                            if (Ext.getCmp('selectMs')) {
                                Ext.getCmp('selectMs').setValue(sqlediotrContent);  // sql运行的数据库
                            }
                        }
                    }, 10)

                }
            }
        }).show();
        tabPanel.setActiveTab(tabId);
        $('#unlook').on('click', function () {
            Ext.getCmp('MoBanMs').setHidden(true);
            ace.edit("editorJs").focus();
        })
    },

    /** aceEditor运行 */
    aceRun: function (cellstyle) {
        var me = this;
        var pageNum = 1,
            impalaNum = 1;
        var ediotrContent = ace.edit("editorJs").getValue();
        me.runHistory(cellstyle)
        if (cellstyle == "Hive") {
            me.impalaSelect(impalaNum, ediotrContent, pageNum)
        } else if (cellstyle == "SparkPython" || cellstyle == "SparkScala") {
            me.executeCode(cellstyle);
        } else {
            me.shellRun(ediotrContent);
        }
        Ext.getCmp('botmBox').setActiveTab(0)
    },

    /** shell运行 */
    shellRun: function (ediotrContent) {
        Ext.Ajax.request({
            async: false,
            method: "POST",
            url: window.baseURL + "shell/command",
            timeout: 1000 * 60,
            params: {
                shell: ediotrContent
            },
            success: function (response, opts) {
                var data = Ext.decode(response.responseText),
                    resultList = data.data,
                    sessions = resultList.sessions,
                    con3 = resultList.command;

                if (con3) {
                    var shellDataArr = [];
                    for (var i = 0; i < con3.length; i++) {
                        var itemsList = {};
                        itemsList['name'] = con3[i];
                        shellDataArr.push(itemsList)
                    }
                    $("#noDataBg").hide();
                    if (Ext.getCmp('dataResult')) {
                        Ext.getCmp('dataResult').destroy()
                    }

                    var shellDataGrid = new Ext.grid.GridPanel({
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name'],
                            data: shellDataArr
                        }),
                        autoHeight: true,
                        width: "100%",
                        loadMask: true,    // 加载缓冲图标
                        forceFit: true,    // 自动列宽，可以不用在设置clumn的宽度
                        columns: [
                            {dataIndex: 'name'}
                        ],
                        viewConfig: {
                            stripeRows: true,// 是否隔行换色
                            getRowClass: function (record, rowIndex, rowParams, store) {
                                if (rowIndex % 2 == 0)
                                    return 'x-grid3-row-alt';
                            }
                        },
                    });
                    Ext.getCmp('dataSelect').add(shellDataGrid)
                } else {
                    if (Ext.getCmp('dataResult')) {
                        Ext.getCmp('dataResult').destroy();
                    }
                    var str = '暂无数据';
                    $("#noDataBg").show();
                    $("#noDataBg").text(str);
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '获取所有session信息失败！', Ext.emptyFn);
            }
        });
    },

    /** sqlAaceEditor查询数据 */
    impalaSelect: function (impalaNum, ediotrContent, pageNum) {
        var selected = Ext.getCmp('selectMs').getValue();
        if (selected == null) {
            Ext.Msg.alert('提示', '请选择数据库！', Ext.emptyFn);
            return false;
        }
        Ext.Ajax.request({
            // async: false,
            method: "POST",
            url: window.baseURL + "impala/selectByDatabase",
            timeout: 1000 * 60,
            params: {
                sql: ediotrContent,
                database: selected,
                pageNo: impalaNum + ""
            },
            success: function (response, opts) {
                impalaNum = impalaNum + 1;
                var data = Ext.decode(response.responseText),
                    resultList = data.data,
                    conM4 = resultList.resultList;

                if (conM4) {
                    $('#noDataBg').hide();
                    var conObjArr = [];
                    for (var i = 0; i < conM4.length - 1; i++) {
                        var index = i;
                        var itemObJ = {};
                        for (var n = 0; n < conM4[0].length; n++) {
                            var m = n;
                            itemObJ[conM4[0][m]] = conM4[index + 1][m];
                        }
                        conObjArr.push(itemObJ)
                    }
                    var cloumnsArr = [];
                    for (var n = 0; n < conM4[0].length; n++) {
                        var cloumnItem = {};
                        cloumnItem.text = conM4[0][n];
                        cloumnItem.dataIndex = conM4[0][n];
                        cloumnItem.flex = 1;
                        cloumnItem.menuDisabled = true;
                        cloumnItem.sortable = false;
                        cloumnItem.align = "center";
                        cloumnsArr.push(cloumnItem)
                    }

                    if (Ext.getCmp('dataResult')) {
                        Ext.getCmp('dataResult').destroy()
                    }
                    var dataSelectLis = new Ext.grid.Panel({
                        store: Ext.create('Ext.data.Store', {
                            storeId: 'impalaStore',
                            fields: conM4[0],
                            data: conObjArr
                        }),
                        id: 'dataResult',
                        width: '100%',
                        stateful: true,
                        menuDisabled: true,
                        columns: cloumnsArr,
                        style: 'font-size:16px;',
                        viewConfig: {
                            stripeRows: true,          // 是否隔行换色
                            enableTextSelection: true, // 复制 没效果
                            getRowClass: function (record, rowIndex, rowParams, store) {
                                if (rowIndex % 2 == 0) {
                                    return 'x-grid3-row-alt x-selectable';
                                }
                                return this.enableTextSelection ? 'x-selectable' : '';
                            }
                        }
                    });
                    // 返回值是字符串的情况
                    if (Ext.getCmp('stringPanel')) {
                        Ext.getCmp('stringPanel').destroy()
                    }
                    var stringPanel = new Ext.Panel({
                        width: '100%',
                        height: 28,
                        border: true,
                        id: 'stringPanel',
                        html: "<div style='background-color: #c5c5c5;padding: 4px 6px 5px;background-image: -webkit-linear-gradient(top, #f9f9f9, #e6e3e3);font-size: 16px'>" + conM4 + "</div>"
                    });
                    // 判断返回值是否是对象
                    if (typeof conM4 === "string") {
                        Ext.getCmp('dataSelect').add(stringPanel)
                    } else {
                        Ext.getCmp('dataSelect').add(dataSelectLis)
                    }
                    $('#dataHistory-body').getNiceScroll().resize();
                    if (conM4.length > 50) {
                        Ext.getCmp('moreListBtn').enable()
                        Ext.getCmp('moreListBtn').setText('查看更多')
                    }
                } else {
                    if (Ext.getCmp('dataResult')) {
                        Ext.getCmp('dataResult').destroy();
                    }
                    var str = '暂无数据';
                    $("#noDataBg").show()
                    $("#noDataBg").text(str);
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', 'sql执行失败！', Ext.emptyFn);
            }
        });
    },

    /** 更多查询数据*/
    pageSql: function (pageNum) {
        var ediotrContent = ace.edit("editorJs").getValue();
        Ext.Ajax.request({
            //async: false,
            method: "POST",
            url: window.baseURL + "impala/select",
            timeout: 1000 * 60,
            params: {
                sql: ediotrContent,
                pageNo: pageNum + ""
            },
            success: function (response, opts) {
                pageNum = pageNum + 1;
                var data = Ext.decode(response.responseText),
                    resultList = data.data,
                    conM4 = resultList.resultList;

                if (conM4) {
                    $('#noDataBg').hide();
                    var conObjArr = [];
                    for (var i = 0; i < conM4.length - 1; i++) {
                        var index = i,
                            itemObJ = {};
                        for (var n = 0; n < conM4[0].length; n++) {
                            var m = n;
                            itemObJ[conM4[0][m]] = conM4[index + 1][m];
                        }
                        conObjArr.push(itemObJ)
                    }
                    var cloumnsArr = [];
                    for (var n = 0; n < conM4[0].length; n++) {
                        var cloumnItem = {};
                        cloumnItem.text = conM4[0][n];
                        cloumnItem.dataIndex = conM4[0][n];
                        cloumnItem.flex = 1;
                        cloumnItem.menuDisabled = true;
                        cloumnItem.sortable = false;
                        cloumnItem.align = "center";
                        cloumnsArr.push(cloumnItem)
                    }
                    Ext.create('Ext.data.Store', {
                        storeId: 'impalaStore',
                        fields: conM4[0],
                        data: conObjArr
                    });

                    if (Ext.getCmp('dataResult')) {
                        Ext.getCmp('dataResult').destroy()
                    }
                    var dataSelectLis = new Ext.grid.Panel({
                        store: Ext.data.StoreManager.lookup('impalaStore'),
                        id: 'dataResult',
                        width: '100%',
                        stateful: true,
                        menuDisabled: true,
                        columns: cloumnsArr,
                        viewConfig: {
                            stripeRows: true,//是否隔行换色
                            getRowClass: function (record, rowIndex, rowParams, store) {
                                if (rowIndex % 2 == 0)
                                    return 'x-grid3-row-alt';
                            }
                        }
                    });
                    Ext.getCmp('dataSelect').add(dataSelectLis)
                } else {
                    if (Ext.getCmp('dataResult')) {
                        Ext.getCmp('dataResult').destroy();
                    }
                    var str = '暂无数据';
                    $("#noDataBg").text(str);
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', 'sql执行失败！', Ext.emptyFn);
            }
        });
    },

    /** aceEditor保存代码*/
    saveCode: function (cellstyle, tabId) {
        var me = this;
        if (Ext.getCmp('openSaveWin')) {
            Ext.getCmp('openSaveWin').destroy();
        }
        Ext.create('Ext.window.Window', {
            height: 140,
            width: 600,
            layout: 'vbox',
            id: 'openSaveWin',
            items: [{
                id: 'fileDesignation',
                xtype: 'textfield',
                fieldLabel: '文件名称:',
                value: me.fileDesVal ? me.fileDesVal : '',
                style: {
                    'padding': '0',
                    'margin': '0'
                },
                listeners: {
                    blur: function () {
                        var me = this;
                        me.fileDesVal = Ext.getCmp('fileDesignation').getValue();
                    }
                }

            }],
            buttons: [{
                cls: "sure",
                text: '确定',
                style: "background:rgba(74,144,226,1);border-radius:4px;",
                handler: function () {
                    var me = this,
                        isDisable = "false",
                        // 文件名称
                        fileDesignation = Ext.getCmp('fileDesignation').getValue();

                    if (!fileDesignation) {
                        Ext.Msg.alert('提示', '文件夹名字不能为空！！');
                        return false;
                    }
                    // 保存文件
                    var ediotrContent = ace.edit("editorJs").getValue(),
                        destPathFlag = null;
                    if (cellstyle == "Hive") {
                        destPathFlag = "sql";
                    } else if (cellstyle == "SparkPython") {
                        destPathFlag = "python";
                    } else if (cellstyle == "SparkScala") {
                        destPathFlag = "scala"
                    } else if (cellstyle == "Shell") {
                        destPathFlag = "shell"
                    }
                    Ext.Ajax.request({
                        async: false,
                        method: "POST",
                        url: window.baseURL + "hdfs/uploadScriptCodeToHdfs",
                        timeout: 1000 * 60,
                        params:
                            {
                                "destPathFlag": destPathFlag,
                                "nodeEditString": ediotrContent,
                                "filePathName": fileDesignation,
                                "versionInfo": '',
                                "isDisable": isDisable
                            },
                        success: function (response, opts) {
                            var data = Ext.decode(response.responseText);
                            if (data.code === 0) {
                                var resultmessage = data.message,
                                    resultList = data.data,
                                    hdfsDestPath = resultList.hdfsDestPath,
                                    page = Map.get(Const.PAGE_OBJECT),
                                    graph = page.activeGraph,
                                    cell = graph.getSelectionCell();
                                // 更新cell属性
                                // cell.setAttribute(textfieId, hdfsDestPath);
                                Ext.Msg.alert('提示', '保存成功！', Ext.emptyFn);
                                Ext.getCmp('openSaveWin').destroy();
                                Ext.getCmp(tabId).destroy()
                            } else {
                                Ext.Msg.alert('提示', data.message, Ext.emptyFn);
                                return false;
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '编辑内容上传至 HDFS失败！', Ext.emptyFn);
                        }
                    });

                }
            }, {
                text: '取消',
                cls: "cancel",
                style: "background:rgba(74,144,226,1);border-radius:4px;",
                handler: function (data) {
                    me.fileDesVal = Ext.getCmp('fileDesignation').getValue();
                    me.versionsMsVal = Ext.getCmp('versionsMs').getValue();
                    me.operatorMsVal = Ext.getCmp('operatorMs').getValue();
                    me.remarkMsVal = Ext.getCmp('remarkMs').getValue();
                    Ext.getCmp('openSaveWin').destroy();
                }
            }]
        }).show();
    },

    /**获取当前时间，格式YYYY-MM-DD*/
    getNowFormatDate: function () {
        var date = new Date(),
            seperator1 = "-",
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },

    /** aceEditor新建*/
    newCode: function (cellstyle) {
        var me = this;
        me.historyInfo.splice(0);
        me.hisInfoData.splice(0);
        ace.edit("editorJs").setValue('');
        ace.edit("editorJs").focus();
        if (Ext.getCmp('historyLis')) {
            Ext.getCmp('historyLis').destroy();
        }
        me.runHistory(cellstyle);
        if (Ext.getCmp('dataResult')) {
            Ext.getCmp('dataResult').destroy()
        }
        if (Ext.getCmp('noData')) {
            Ext.getCmp('noData').destroy();
        }
        $("#noDataBg").show()
        Ext.getCmp('botmBox').setActiveTab(0)
    },

    /** aceEditor打开已保存*/
    openCode: function (cellstyle) {
        var me = this,
            ediotrContent = ace.edit("editorJs").getValue(),
            hdfsCodePath = null;
        Ext.Ajax.request({
            async: false,
            method: "GET",
            url: window.baseURL + "hdfs/getBaseHdfsCodePath",
            params: {},
            success: function (response, opts) {
                var data = Ext.decode(response.responseText),
                    resultList = data.data;
                hdfsCodePath = resultList.hdfsCodePath;
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '获取hdfs代码根路径失败！', Ext.emptyFn);
            }
        });
        var openPath = null;
        if (cellstyle == "Hive") {
            openPath = 'sql';
        } else if (cellstyle == "SparkPython") {
            openPath = 'python';
        } else if (cellstyle == "SparkScala") {
            openPath = 'scala';
        } else if (cellstyle == "Shell") {
            openPath = 'shell';
        }
        var nodeItemText = null;
        var parentNodeText = null;
        Ext.create('Ext.window.Window', {
            title: '打开：',
            height: 560,
            width: 400,
            id: 'openFile2',
            layout: 'fit',
            items: [{
                id: "treeUrlOpen",
                xtype: "treepanel",
                height: 500,
                useArrows: true,                // 节点展开+，-图标全部改为小三角
                expanded: true,                 // 默认展开
                region: 'west',
                width: "50%",
                store: {
                    storeId: 'Resources',       // 数据集ID
                    root: {                     // 根节点配置
                        id: hdfsCodePath + openPath + '/',                // 根节点ID
                        expanded: true,         // 默认展开
                        text: openPath + '文件目录'    // 根节点名称
                    },
                    proxy: {                    // 访问代理
                        type: 'ajax',           // 类型异步
                        api: {
                            read: window.baseURL + 'hdfs/getDirectoryFromHdfs'
                        }
                    }
                },
                /** 监听器 */
                listeners: {
                    render: function () {
                        $('#treeUrl-body>div').niceScroll({
                            cursorborder: '1px solid #c5c5c5',
                            cursorcolor: '#c5c5c5',
                            autohidemode: 'leave'
                        })
                    },
                    itemclick: function (node, record, item, index, e, eOpts) {
                        leftresource.pId = record.parentNode.data.id;
                        nodeItemText = record.data.text;
                        parentNodeText = record.parentNode.data.text;
                    }
                },
            }],
            buttons: [{
                cls: "sure",
                text: '确定',
                style: "background:rgba(74,144,226,1);border-radius:4px;",
                handler: function () {
                    me.hisInfoData.splice(0);
                    me.historyInfo.splice(0);
                    if (parentNodeText) {
                        me.fileDesVal = parentNodeText;
                        isDisable = "true";
                    }
                    // 历史记录
                    Ext.Ajax.request({
                        async: false,
                        method: "POST",
                        url: window.baseURL + "hdfs/openScript",
                        params:
                            {
                                "destPathFlag": openPath,
                                "fileName": nodeItemText,
                                "filePathName": parentNodeText
                            },
                        success: function (response, opts) {
                            var data = Ext.decode(response.responseText),
                                resultList = data.data
                            if ("请选择正确的脚本文件" == resultList.error) {
                                alert(resultList.error);
                                return;
                            }
                            ace.edit("editorJs").setValue(resultList.rowTextByFileList);
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '获取运行代码失败！', Ext.emptyFn);
                        }
                    });
                    Ext.Ajax.request({
                        async: false,
                        method: "POST",
                        url: window.baseURL + "hdfs/getVersionInfo",
                        params:
                            {
                                "destPathFlag": openPath,
                                "parentNodeText": parentNodeText
                            },
                        success: function (response, opts) {
                            var data = Ext.decode(response.responseText),
                                resultList = data.data;
                            for (var i = 0; i < resultList.rowTextByFileList.length; i++) {
                                me.historyInfo.push(resultList.rowTextByFileList[i][0].split(' '));
                            }
                            // 操作人
                            for (var i = 0; i < me.historyInfo.length; i++) {
                                var hisItems = {};
                                hisItems['vis'] = me.historyInfo[i][0];
                                hisItems['oper'] = me.historyInfo[i][1];
                                hisItems['time'] = me.historyInfo[i][2];
                                hisItems['remark'] = me.historyInfo[i][3];
                                me.hisInfoData.push(hisItems);
                            }
                            Ext.create('Ext.data.Store', {
                                storeId: 'simpsonsStore',
                                fields: ['vis', 'oper', 'time', 'remark'],
                                data: me.hisInfoData
                            });
                            Ext.getCmp('hisInfoVs').setStore(Ext.data.StoreManager.lookup('simpsonsStore'));
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '获取运行代码失败！', Ext.emptyFn);
                        }
                    });
                    Ext.getCmp('openFile2').destroy();
                }
            }, {
                text: '取消',
                cls: "cancel",
                style: "background:rgba(74,144,226,1);border-radius:4px;",
                handler: function (data) {
                    Ext.getCmp('openFile2').destroy();
                }
            }]
        }).show();
    },

    /** aceEditor锁定*/
    lockCode: function () {
        Ext.getCmp('MoBanMs').setHidden(false);
    },

    /** aceEditor编译*/
    compileCode: function (cellstyle) {
        var me = this;
        Ext.getCmp('botmBox').setActiveTab(0)
        var ediotrContent = ace.edit("editorJs").getValue();
        if (cellstyle == "Hive") {
            Ext.Ajax.request({
                async: false,
                method: "POST",
                url: window.baseURL + "impala/explain",
                params: {
                    sql: ediotrContent
                },
                success: function (response, opts) {
                    var data = Ext.decode(response.responseText),
                        resultList = data.data,
                        con3 = resultList;
                    if (Ext.getCmp('dataResult')) {
                        Ext.getCmp('dataResult').destroy();
                    }
                    $("#noDataBg").show();
                    $("#noDataBg").text(con3.result);
                },
                failure: function (response, opts) {
                    Ext.Msg.alert('提示', 'sql语法解析失败！', Ext.emptyFn);
                }
            });
        } else {
            me.executeCode(cellstyle);
        }
    },

    /** aceEditor编译---执行代码*/
    executeCode: function (cellstyle) {
        if (Ext.getCmp('runningMsg')) {
            Ext.getCmp('runningMsg').destroy();
        }
        var runningMsg = Ext.create('Ext.panel.Panel', {
            width: '100%',
            id: 'runningMsg',
            align: 'center',
            style: 'font-size:16px;',
            html: '正在编译中...'
        });
        Ext.getCmp('dataSelect').add(runningMsg)

        var idList = new Array(),
            deleteCreateIdList = new Array(),
            createIdList = new Array();
        // 查看session信息
        Ext.Ajax.request({
            async: false,
            method: "GET",
            url: window.baseURL + "livy/getSessionsInfo",
            params: {},
            success: function (response, opts) {
                var data = Ext.decode(response.responseText),
                    resultList = data.data,
                    sessions = resultList.sessions;
                for (var i = 0; i <= sessions.length - 1; i++) {
                    var id = sessions[i].id;
                    idList.push(id);
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '获取所有session信息失败！', Ext.emptyFn);
            }
        });

        var i = null,
            j = null;
        for (i = 0; i <= idList.length - 1; i++) {
            for (j = 0; j <= createIdList.length - 1; j++) {
                if (idList[i] == createIdList[j]) {
                    deleteCreateIdList.push(idList[i]);
                }
            }
        }

        if (deleteCreateIdList.length != 0) {
            //删除session
            Ext.Ajax.request({
                async: false,
                method: "POST",
                url: window.baseURL + "livy/deleteSession",
                defaultPostHeader: "application/json;charset=utf-8",
                params: {
                    sessionIds: deleteCreateIdList.toString()
                },
                success: function (response, opts) {
                    var data = Ext.decode(response.responseText),
                        resultList = data.data;
                },
                failure: function (response, opts) {
                    Ext.Msg.alert('提示', '删除session失败！', Ext.emptyFn);
                }
            });
        }
        var IPandPortPath = null;
        // 获取本机地址ip路径
        Ext.Ajax.request({
            async: false,
            method: "GET",
            url: window.baseURL + "hdfs/getIPandPortPath",
            params: {},
            success: function (response, opts) {
                var data = Ext.decode(response.responseText),
                    resultList = data.data;
                IPandPortPath = resultList.IPandPortPath;
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '获取classPath根路径失败！', Ext.emptyFn);
            }
        });
        // livy 创建session
        var postSessionKind = "";
        if (cellstyle == "SparkScala") {
            postSessionKind = "spark";
        } else if (cellstyle == "SparkPython") {
            postSessionKind = "pyspark";
        }
        Ext.Ajax.request({
            async: false,
            method: "POST",
            url: window.baseURL + "livy/creatLivySession",
            defaultPostHeader: "application/json;charset=utf-8",
            params:
                JSON.stringify({
                    "parma": {"kind": postSessionKind}
                }),
            success: function (response, opts) {
                var data = Ext.decode(response.responseText),
                    code = data.code,
                    resultList = data.data;
                if (code == 0) {
                    if (resultList.id != null) {
                        sessionId = resultList.id;
                        createIdList.push(sessionId);
                        // 更换成ScoketIo
                        var socket = io.connect(IPandPortPath);
                        socket.on('connect', function () {
                        });
                        sendMessage();
                        socket.on('chat_get_event', function (data) {//聊天发送接收
                            // data livy上session的state状态
                            if (data == "idle") {
                                var ediotrContent = ace.edit("editorJs").getValue(),
                                    sessionStatementId = "";
                                // 执行code代码
                                Ext.Ajax.request({
                                    async: false,
                                    method: "POST",
                                    url: window.baseURL + "livy/postCodeToLivy",
                                    params: {
                                        sessionId: JSON.stringify(sessionId),
                                        code: JSON.stringify(ediotrContent)
                                    },
                                    success: function (response, opts) {
                                        var data = Ext.decode(response.responseText),
                                            resultList2 = data.data;
                                        sessionStatementId = resultList2.id;

                                    },
                                    failure: function (response, opts) {
                                        Ext.Msg.alert('提示', '发送code代码失败！', Ext.emptyFn);
                                    }
                                });
                                Ext.Ajax.request({
                                    async: false,
                                    method: "POST",
                                    url: window.baseURL + "livy/getSessionStatement",
                                    params: {
                                        sessionId: JSON.stringify(sessionId),
                                        statementId: JSON.stringify(sessionStatementId)
                                    },
                                    success: function (response, opts) {
                                        var data = Ext.decode(response.responseText),
                                            resultList2 = data.data,
                                            con3 = resultList2.livyResult;
                                        if (Ext.getCmp('runningMsg')) {
                                            Ext.getCmp('runningMsg').destroy();
                                        }

                                        var resultMsg = Ext.create('Ext.panel.Panel', {
                                            width: '100%',
                                            align: 'center',
                                            id: 'noData',
                                            html: con3,
                                            style: 'font-size:16px;'
                                        });
                                        Ext.getCmp('dataSelect').add(resultMsg);
                                    }
                                })

                            } else if (data != "idle" && data != "starting" && data != "busy") {
                                Ext.Msg.alert('提示', 'livy session创建失败！', Ext.emptyFn);
                            } else {
                                // 递归继续访问livy状态
                                sendMessage();
                            }
                        });
                        socket.on('disconnect', function () {
                        });

                        function sendMessage() {
                            socket.emit('chat_send_event', sessionId)
                        }

                        function sendDisconnect() {
                            socket.disconnect();
                        }
                    } else {
                        Ext.Msg.alert('提示', 'llivy sessionId为空', Ext.emptyFn);
                    }
                } else {
                    Ext.Msg.alert('提示', 'livySession创建失败', Ext.emptyFn);
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '将session上传失败！', Ext.emptyFn);
            }
        });
    },

    /** 获取数据库列表*/
    getselectSql: function (cellstyle) {
        var selectMss = Ext.getCmp('selectMs'),
            openPathMs = '';
        if (cellstyle == "Hive") {
            openPathMs = 'sql';
        } else if (cellstyle == "SparkPython") {
            openPathMs = 'python';
        } else if (cellstyle == "SparkScala") {
            openPathMs = 'scala';
        } else if (cellstyle == "Shell") {
            openPathMs = 'shell';
        }
        var data = 'show databases;';
        Ext.Ajax.request({
            method: "POST",
            url: window.baseURL + "impala/select",
            params: {sql: data},
            success: function (response, opts) {
                var res = JSON.parse(response.responseText),
                    data = res.data,
                    code = res.code,
                    msg = res.message;
                data = data.resultList;
                var stats = []
                if (code == 0) {
                    if (openPathMs == "sql") {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i][0] == "name") {
                                continue;
                            } else {
                                stats.push(data[i][0])
                            }
                        }
                        selectMss.setStore(stats)
                    }
                } else {
                    Ext.Msg.alert('提示', msg);
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', 'sql执行失败！', Ext.emptyFn);
            }
        });

    },

    /**历史记录*/
    runHistory: function (cellstyle) {
        var destPathFlag = null,
            ediotrContent = ace.edit("editorJs").getValue();
        if (cellstyle == "Hive") {
            destPathFlag = "sql";
        } else if (cellstyle == "SparkPython") {
            destPathFlag = "python";
        } else if (cellstyle == "SparkScala") {
            destPathFlag = "scala";
        } else if (cellstyle == "Shell") {
            destPathFlag = "shell";
        }
        Ext.Ajax.request({
            async: false,
            method: "POST",
            url: window.baseURL + "hdfs/updateHistoryToCache",
            params: {
                "destPathFlag": destPathFlag,
                "editString": ediotrContent
            },
            success: function (response, opts) {
                var data = Ext.decode(response.responseText),
                    resultList = data.message;
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '记录上传至HDFS失败！', Ext.emptyFn);
            }
        });

        Ext.Ajax.request({
            //async: false,
            method: "POST",
            url: window.baseURL + "hdfs/getRunHistoryFromCache",
            params: {
                "destPathFlag": destPathFlag
            },
            success: function (response, opts) {
                var data32 = Ext.decode(response.responseText),
                    resultList32 = data32.data,
                    con32 = resultList32.rowTextByFileList;
                if (con32) {
                    $('#noDataBgHis').hide()
                    var historyDataArr = [];
                    for (var i = 0; i < con32.length; i++) {
                        var itemsLis = {};
                        itemsLis['name'] = con32[i];
                        historyDataArr.push(itemsLis)
                    }

                    if (Ext.getCmp('historyLis')) {
                        Ext.getCmp('historyLis').destroy()
                    }
                    Ext.create('Ext.data.Store', {
                        storeId: 'historyStore',
                        fields: ['name'],
                        data: historyDataArr
                    });
                    var historyGrid = new Ext.grid.GridPanel({
                        id: 'historyLis',
                        store: Ext.data.StoreManager.lookup('historyStore'),
                        autoHeight: true,
                        width: "100%",
                        loadMask: true,//加载缓冲图标
                        forceFit: true,//自动列宽，可以不用在设置clumn的宽度
                        columns: [
                            {dataIndex: 'name',}
                        ],
                        viewConfig: {
                            stripeRows: true,//是否隔行换色
                            getRowClass: function (record, rowIndex, rowParams, store) {
                                if (rowIndex % 2 == 0)
                                    return 'x-grid3-row-alt';
                            }
                        },
                        listeners: {
                            itemdblclick: function (a, b, c) {
                                ace.edit("editorJs").setValue(b.data.name[0])
                            }
                        }
                    });
                    Ext.getCmp('dataHistory').add(historyGrid)
                } else {
                    $('#noDataBgHis').text('暂无数据')
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '获取运行历史失败！', Ext.emptyFn);
            }
        });
    },

    /** 函数速查表点击事件*/
    funEvent: function (tabPanel, funData) {
        $('.hiveBox > ul').hide();
        Ext.getCmp('sqlInfo').setConfig('html', '')
        var tolData = null,
            scopeId = '';
        if (tabPanel == 'Cosmo++ SQL') {
            tolData = funData.left;
            scopeId = "#sqlLis";
        } else if (tabPanel == 'Hive') {
            tolData = funData.right;
            scopeId = "#hiveLis";
        }
        $(scopeId + " .hiveBox").unbind();
        $(scopeId + " .hiveBox").click(function (e, i) {
            if (e.target.tagName === 'H4') {
                if ($(this).find('ul').css('display') == 'none') {
                    $(this).find('img').css({
                        transform: 'rotate(-90deg)'
                    })
                } else {
                    $(this).find('img').css({
                        transform: 'rotate(0deg)'
                    })
                }
                $(this).find('ul').slideToggle();
            } else if (e.target.tagName === 'LI') {
                Ext.getCmp('sqlInfo').setConfig('html', '')
                $('li').removeClass("aqlActive");
                $(e.target).addClass("aqlActive");
                Ext.getCmp('sqlInfo').setConfig('html', tolData[$(e.target).parent().parent().index()][0].concnet[$(e.target).index()].concnent)
            }
            setTimeout(function () {
                $('#sqlLis-body').getNiceScroll().resize()
                $('#hiveLis-body').getNiceScroll().resize()
            }, 500)
        })
        $(scopeId + " .hiveBox").dblclick(function (e) {
            if (e.target.tagName === 'LI') {
                var ediotrContent = ace.edit("editorJs");
                var oldValue = ediotrContent.getValue();
                ediotrContent.setValue(oldValue + e.target.textContent);
            }
        })
    }
});
