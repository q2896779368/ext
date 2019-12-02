/**
 * 元件库Store（数据集）
 */
Ext.define('Cosmo.store.Components', {
    extend: 'Ext.data.Store',

    alias: 'store.Components',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: window.baseURL+'component/list',
        reader: {
            type: 'json',
            rootProperty: 'Components'
        }
    }
});
