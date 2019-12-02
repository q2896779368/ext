/**
 * 主视图
 */
Ext.define('Cosmo.view.main.maintapbar.Maintapbar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Mainbody',
    id: 'mainbody',
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.Mainbody'
    ],

    border: false,
    items: [{
        region: 'center',
        cls: "ui-tab-bar",
        id: 'topsMain',
        xtype: "tabpanel",
        activeTab: 0,
        tabPosition: 'top',
        border: false,
        items: [{
            iconCls: "ui-tar-icon-Datadevelopment",
            title: '数据开发',
            ui: 'action',
            cls: 'ui-tabpanel',
            border: false,
            xtype: 'Mainbodypanel',
            html: '<iframe id="urlLogin" style="height: calc(100% + 0px);margin-top: 0px;width: 100%;border-top: 4px solid #2A79D4;display: none" src=""></iframe>',
            listeners: {
                afterrender: function () {
                    setTimeout(function () {
                        Ext.Ajax.request({
                            method: "POST",
                            url: window.baseURL + "ddsUrl",
                            useDefaultXhrHeader: false,
                            params: {name: 'login'},
                            success: function (response, opts) {
                                document.getElementById('urlLogin').src = JSON.parse(response.responseText).data
                                document.getElementById('urlLogin').onload = function () {
                                }
                            }
                        });
                    }, 1000)
                }
            }
        }, {
            iconCls: "ui-tar-icon-taskMoni",
            title: '任务监控',
            cls: 'ui-tabpanel',
            html: '<div id="loadingImg" class="loadingImgtaskMoni">\n' +
                '        <div id="loading" class="s1">\n' +
                '            <div id="loading-center">\n' +
                '                <div id="loading-center-absolute">\n' +
                '                    <div class="object" id="object_one"></div>\n' +
                '                    <div class="object" id="object_two"></div>\n' +
                '                    <div class="object" id="object_three"></div>\n' +
                '                    <div class="object" id="object_four"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="loading-bottom-absolute" style="color:white;">Loading...</div>\n' +
                '        </div>\n' +
                '</div>' +
                '<iframe id="DatadevelopmentIframe" style="height: calc(100% + 0px);margin-top: 0px;width: 100%;border-top: 4px solid #2A79D4;" src="http://192.168.0.153:8888/hue/jobbrowser/#!workflows"></iframe>',
            listeners: {
                afterrender: function () {
                    Ext.Ajax.request({
                        method: "POST",
                        url: window.baseURL + "ddsUrl",
                        useDefaultXhrHeader: false,
                        params: {name: 'missionControl'},
                        success: function (response, opts) {
                            document.getElementById('DatadevelopmentIframe').src = JSON.parse(response.responseText).data

                        }
                    });
                    document.getElementById('DatadevelopmentIframe').onload = function () {
                        setTimeout(function () {
                            $('.loadingImgtaskMoni').css({
                                display: 'none'
                            })
                        }, 3000)
                    };
                }
            }
        }, {
            iconCls: "ui-tar-icon-tableManage",
            title: ' 表管理',
            cls: 'ui-tabpanel',
            border: false,
            html: '<div id="loadingImg" class="loadingImgtableManage">\n' +
                '        <div id="loading" class="s2">\n' +
                '            <div id="loading-center" >\n' +
                '                <div id="loading-center-absolute">\n' +
                '                    <div class="object" id="object_one"></div>\n' +
                '                    <div class="object" id="object_two"></div>\n' +
                '                    <div class="object" id="object_three"></div>\n' +
                '                    <div class="object" id="object_four"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="loading-bottom-absolute" style="color:white;">Loading...</div>\n' +
                '        </div>\n' +
                '</div>' +
                '<iframe id="tableManageIframe" style="height: calc(100% + 0px);width: 100%;border-top: 4px solid #2A79D4;" src=""></iframe>',
            listeners: {
                afterrender: function () {
                    Ext.Ajax.request({
                        method: "POST",
                        url: window.baseURL + "ddsUrl",
                        useDefaultXhrHeader: false,
                        params: {name: 'tableManagement'},
                        success: function (response, opts) {
                            document.getElementById('tableManageIframe').src = JSON.parse(response.responseText).data
                        }
                    });
                    document.getElementById('tableManageIframe').onload = function () {
                        $('.loadingImgtableManage').css({
                            display: 'none'
                        })
                    };
                }
            }
        }, {
            iconCls: "ui-tar-icon-sourceManage",
            title: '资源管理',
            cls: 'ui-tabpanel',
            border: false,
            html: '<div id="loadingImg" class="loadingImgsourceManage">\n' +
                '        <div id="loading">\n' +
                '            <div id="loading-center" >\n' +
                '                <div id="loading-center-absolute">\n' +
                '                    <div class="object" id="object_one"></div>\n' +
                '                    <div class="object" id="object_two"></div>\n' +
                '                    <div class="object" id="object_three"></div>\n' +
                '                    <div class="object" id="object_four"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="loading-bottom-absolute" style="color:white;">Loading...</div>\n' +
                '        </div>\n' +
                '</div>' +
                '<iframe id="sourceManageIframe" style="height: calc(100% + 0px);width: 100%;border-top: 4px solid #2A79D4;" src=""></iframe>',
            listeners: {
                afterrender: function () {
                    Ext.Ajax.request({
                        method: "POST",
                        url: window.baseURL + "ddsUrl",
                        useDefaultXhrHeader: false,
                        params: {name: 'resourceAdministration'},
                        success: function (response, opts) {
                            document.getElementById('sourceManageIframe').src = JSON.parse(response.responseText).data
                        }
                    });
                    document.getElementById('sourceManageIframe').onload = function () {
                        $('.loadingImgsourceManage').css({
                            display: 'none'
                        })
                    };
                }
            }
        }, {
            iconCls: "ui-tar-icon-search",
            title: '查询',
            cls: 'ui-tabpanel',
            border: false,
            html: '<div id="loadingImg" class="loadingImgrecycleBin">\n' +
                '        <div id="loading">\n' +
                '            <div id="loading-center" >\n' +
                '                <div id="loading-center-absolute">\n' +
                '                    <div class="object" id="object_one"></div>\n' +
                '                    <div class="object" id="object_two"></div>\n' +
                '                    <div class="object" id="object_three"></div>\n' +
                '                    <div class="object" id="object_four"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="loading-bottom-absolute" style="color:white;">Loading...</div>\n' +
                '        </div>\n' +
                '</div>' +
                '<iframe id="searchIframe" style="height: calc(100% + 0px);width: 100%;border-top: 4px solid #2A79D4;" src=""></iframe>',
            listeners: {
                afterrender: function () {
                    Ext.Ajax.request({
                        method: "POST",
                        url: window.baseURL + "ddsUrl",
                        useDefaultXhrHeader: false,
                        params: {name: 'demand'},
                        success: function (response, opts) {
                            document.getElementById('searchIframe').src = JSON.parse(response.responseText).data;
                        }
                    });
                    document.getElementById('searchIframe').onload = function () {
                        $('.loadingImgrecycleBin').css({
                            display: 'none'
                        })
                    };
                }
            }
        }]
    }]
});
