/**
 * 应用程序主视图
 * 由app.js中"mainView"属性指定，自动应用"viewport"组件自适应窗口
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.MainbodyController', {
    extend: 'Ext.app.ViewController',

    /** 控制器别名 */
    alias: 'controller.Mainbodypanel',

    /** 项目弹框 */
    FileSelection: function () {
        // 初始化项目的load页
        Ext.create('Ext.window.Window', {
            id: 'startDiv',
            width: "100%",
            height: "100%",
            closable: false,
            autoShow: true,
            modal: true, //显示遮罩
            constrain: true,
            autoScroll: true,
            layout: 'fit',
            style: "background:#33475C",
            header: false,
            html: "<div class=\"startDiv\">\n" +
                "    <div class=\"startDivHeader\">\n" +
                "        <div class=\"fwpIcon\"><img src ='change/img/gdf-logo.svg'></div>\n" +
                "        <div class=\"fwpName\">DDS</div>\n" +
                "        <div class=\"closeIcon\" id=\"closeLoadDiv\">X</div>\n" +
                "    </div>\n" +
                "    <div class=\"projectList\">\n" +
                "    </div>\n" +
                "    <div class=\"startCon\">\n" +
                "            <div class=\"loadImg\"><img src ='./resources/images/center/home.png'></div>\n" +
                "            <div class=\"loadFwpName\">DDS</div>\n" +
                "            <div class=\"loadBtn\" id=\"newProject\"><img src ='./resources/images/icon/addProject.png'> <span>新建项目</span></div>\n" +
                "            <div class=\"loadBtn\" id=\"openProject\"><img src ='./resources/images/icon/openProject.png'> <span>打开项目</span></div>\n" +
                "            <div class=\"loadBtn\" id=\"importProject\"><img src ='./resources/images/icon/importProject.png'> <span>导入项目</span></div>\n" +
                "    </div>\n" +
                "</div>",
            listeners: {
                afterRender: function () {
                    setTimeout(function () {
                        // 顶部工具栏的controller
                        var topRegion = Ext.getCmp('topRegion').getController(),
                            leftresource = Ext.getCmp('leftresource').getController(),
                            // 遮罩层
                            loadMask = new Ext.LoadMask(Ext.getCmp('startDiv'), {
                                //removeMask: false,
                                msg: "正在加载项目...",
                                hideMode: 'display',
                            });
                        // loadMask.show();
                        // 加载左侧项目列表
                        Ext.Ajax.request({
                            method: "get",
                            params: {
                                node: 4
                            },
                            url: window.baseURL + "catalog/openProject",
                            success: function (response, opts) {
                                var responseData = Ext.util.JSON.decode(response.responseText);
                                if (!(responseData.length > 0)) {
                                    return false
                                }
                                // 关闭遮罩层
                                // loadMask.hide()
                                // 循环插入项目列表
                                responseData.forEach(function (item) {
                                    $('.projectList').append("<div class=\"projectItem\" nodeId='" + item.id + "' nodeText='" + item.text + "'>\n" +
                                        "   <div class=\"projectTitle\">" + item.text + "</div>\n" +
                                        "   <div class=\"projectUrl\">" + item.node.path + "</div>\n" +
                                        "</div>")
                                });
                                // 优化滚动条
                                $('.projectList').niceScroll();
                                // 项目列表点击事件
                                $('.projectList').on("click", ".projectItem", function (e, t) {
                                    // 获取项目id和name
                                    var projectId = $(e.target).attr("nodeId") ? $(e.target).attr("nodeId") : $(e.target.parentElement).attr("nodeId"),
                                        porjectName = $(e.target).attr("nodeText") ? $(e.target).attr("nodeText") : $(e.target.parentElement).attr("nodeText")
                                    // 打开项目
                                    if (projectId && porjectName) {
                                        var treeobj = {
                                            id: projectId,          // 根节点ID
                                            expanded: true,         // 默认展开
                                            text: porjectName       // 根节点名称
                                        };
                                        Ext.getCmp('leftresource').store.setRootNode(treeobj);
                                        Ext.getCmp('leftresource').store.setRootVisible(true);
                                        // 关闭项目
                                        Ext.getCmp("startDiv").destroy();
                                        // 新建项目后将新建，打开的功能启用
                                        var topToolItems = Ext.getCmp('topRegion').items.items;
                                        topToolItems.forEach(function (item) {
                                            if (item.id == "addFile" || item.id == "openObjectPage") {
                                                item.setDisabled(false);
                                            }
                                        })
                                    }
                                })
                            },
                            failure: function (response, opts) {
                                Ext.Msg.alert('提示', '打开模板失败！', Ext.emptyFn);
                                // 关闭遮罩层
                                 // loadMask.hide();
                            }
                        });

                        // 新建项目
                        $("#newProject").on('click', function () {
                            Ext.getCmp("startDiv").hide();
                            topRegion.onNewProject()
                        })
                        // 打开项目
                        $("#openProject").on('click', function () {
                            Ext.getCmp("startDiv").hide();
                            //topRegion.onOpenProject()
                            topRegion.openProject()
                        })
                        // 导入项目
                        $("#importProject").on('click', function () {
                            Ext.getCmp("startDiv").hide();
                            topRegion.importProject()
                        })
                        // 关闭引导页
                        $("#closeLoadDiv").on('click', function () {
                            Ext.getCmp("startDiv").destroy();
                        })
                    }, 0)
                }
            }
        });
    },

    /** 检测localStorage */
    detectionAccessToken: function () {
        if (localStorage.getItem("access_token") == null) {
            return false;
        } else {
            return true;
        }
    }
});
