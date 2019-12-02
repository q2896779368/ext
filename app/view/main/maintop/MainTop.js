/**
 * 顶部
 */
Ext.define('Cosmo.view.main.maintop.MainTop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MainTop',
    id: 'mainTopToolbar',
    /** 布局 */
    layout: 'border',
    height: 48,
    items: [{                                           //左侧
        height: '100%',
        width: '60%',
        plain: true,
        region: "west",
        border: false,
        layout: {
            type: 'border',                             //垂直分布
            align: 'stretch'                            //拉伸使其充满整个容器
        },
        html: '<div style="width: 100%;height: 100%;background:#222C59"></div>',
        items: [{
            xtype: 'box',                               //或者xtype: 'component',       
            cls: 'MainTop-log',
            autoEl: {
                tag: 'img',                             //指定为img标签      
                src: 'change/img/gdf-logo.svg'          //指定url路径      
            }
        }, {
            xtype: 'button',
            cls: 'MainTopText',
            text: '',
            html: '<span id="headerTitle" style="position: absolute;position: absolute;left: 0px;top: 16px;font-size: 17px;"></span>  ',
            style: 'color:#fff !important;',
            listeners: {
                afterRender: function () {
                    $('#headerTitle').text(projectConfig.title)
                }
            }
        }]
    }, {                                                 //右侧
        height: '100%',
        width: '40%',
        plain: true,
        region: "east",
        border: false,
        layout: {
            type: 'border',                              //垂直分布
            align: 'stretch'                             //拉伸使其充满整个容器
        },
        html: '<div style="width: 100%;height: 100%; background: linear-gradient(-90deg,#434B72 0%, #222c59 30%, #222C59 100%);">' +
            '<img src="resources/images/top/zygl-imgbj.png" style="float: right">' +
            '</div>',
        items: [{
            xtype: 'button',
            cls: 'MainTopUser cosmo_icon_open',
            id: 'MainTopUser',
            iconCls: 'MainTopUser-img',
            text: '',
            style: 'float:right',
            menu: {
                items: [{
                    text: '登出',
                    iconCls: 'cosmo_icon_logOut',
                    listeners: {
                        click: function () {
                            cac.loginUtil.logout();
                        }
                    }
                }]
            },
            listeners: {
                afterRender: function (_this) {
                    Ext.getCmp('Mainbody').getController().detectionAccessToken();
                    setTimeout(function () {

                        Ext.Ajax.request({
                            method: "POST",
                            url: window.baseURL + "hdfs/getCurrentUserName",
                            success: function (response, opts) {
                                if (response.responseText && response.status == 200) {
                                    _this.setText(response.responseText);
                                }
                            },
                            failure: function (response, opts) {
                                Ext.Msg.alert('提示', '获取用户名失败！', response.toString);
                            }
                        });
                    }, 1000);
                    $('.x-btn-wrap-default-small .x-btn-arrow-right:after').css('display', 'none')
                }
            }
        }]
    }]
});
