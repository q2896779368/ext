Ext.define('Overrides.tree.Column', {
    override: 'Ext.tree.Column',

    treeRenderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
        var me = this,
            cls = record.get('cls'),
            disabled = record.data.disabled,
            rendererData;

        // The initial render will inject the cls into the TD's attributes.
        // If cls is ever *changed*, then the full rendering path is followed.
        if (metaData && cls) {
            metaData.tdCls += ' ' + cls;
        }
        if (metaData && disabled) {
            metaData.tdCls += ' disabled'
        }
        rendererData = me.initTemplateRendererData(value, metaData, record, rowIdx, colIdx, store, view);

        return me.lookupTpl('cellTpl').apply(rendererData);
    }
});

