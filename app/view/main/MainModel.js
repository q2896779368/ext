/**
 * 应用程序主视图模型
 * （可添加数据、公式和/或方法来支撑我们的主视图）
 */
Ext.define('Cosmo.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'DDS',
        desc: '数据开发工作室'
    }
});
