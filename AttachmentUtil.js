var AttachmentUtil = Class.create();
HagertyAttachmentUtil.prototype = {
    initialize: function() {
    },

    _encode: function (data) {
        return GlideStringUtil.base64Encode(data);
    },

    _decode: function (data) {
        return GlideStringUtil.base64Decode(data);
    },

    saveUnlinkedAttachment: function (fileName, contentType, data) {
        var agr = new GlideRecord("sys_attachment");
        agr.initialize();
        agr.file_name = fileName;
        agr.content_type = contentType;
        var atchId = agr.insert();

        if (gs.nil(atchId)) {
            return false;
        }

        var doc = this.buildAttachmentDocument(atchId, data);
        gs.info(doc);

        if (gs.nil(doc)) {
            agr.deleteRecord();
            return false;
        }

        return atchId;
    },

    buildAttachmentDocument: function (atchId, data) {
        var adgr = new GlideRecord("sys_attachment_doc");
        adgr.initialize();
        adgr.sys_attachment = atchId;
        var data = this._encode(data);
        gs.info(data.slice(0,20));
        adgr.data = data;
        adgr.length = data.length();
        return adgr.insert();
    },

    type: 'HagertyAttachmentUtil'
};