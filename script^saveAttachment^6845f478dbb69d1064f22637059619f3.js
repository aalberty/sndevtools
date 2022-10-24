function saveAttachment (fileName, contentType) {
    var util = new global.HagertyAttachmentUtil();
    util.saveUnlinkedAttachment(fileName, contentType);
}