/**
 * A Picker field that contains a tree panel on its popup, enabling selection of tree nodes.
 */
Ext.define('Overrides.ux.TreePicker', {
    override: 'Ext.ux.TreePicker',

    uses: [
        // 'Ext.tree.Panel'
        'Cosmo.util.CosmoTree'
    ],

    config: {
        tbar: null,
        bbar: null,
        fbar: null,
        lbar: null,
        rbar: null,
        rootVisible: false,
        border: false,
        bodyBorder: false,
        viewConfig: {

        },
    },

    editable: true,

    /**
     * Creates and returns the tree panel to be used as this field's picker.
     */
    createPicker: function () {
        var me = this,
            picker = new Cosmo.util.CosmoTree({
                baseCls: Ext.baseCSSPrefix + 'boundlist',
                shrinkWrapDock: 2,
                store: me.store,
                tbar: me.tbar,
                bbar: me.bbar,
                fbar: me.fbar,
                lbar: me.lbar,
                rbar: me.rbar,
                floating: true,
                useArrows: true,
                rootVisible: me.rootVisible,
                border: me.border,
                bodyBorder: me.bodyBorder,
                displayField: me.displayField,
                columns: me.columns,
                minHeight: me.minPickerHeight,
                maxHeight: me.maxPickerHeight,
                minWidth: me.minPickerWidth,
                maxWidth: me.maxPickerWidth,
                manageHeight: false,
                shadow: false,
                viewConfig:me.viewConfig,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick,
                    itemkeydown: me.onPickerKeyDown
                }
            }),
            view = picker.getView();

        if (Ext.isIE9 && Ext.isStrict) {
            // In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
            // Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    }
});

