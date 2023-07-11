/**
 * Loop records in a table, build object with unique id as key, and some object as value
 * @param table table to query 
 * @param query encoded query to filter glide record results
 * @param field field to use as the unique key
 * @param shouldSkip function with single parameter that will be passed the current glide
 *                  record. Return true or false indicating if the current record should be
 *                  skipped.
 * @param objBuilder function that is passed current glide record, and current value for
 *                  current key if there is one. Returned value will be used as the new
 *                  value for the current key. 
 * @returns object with unique id as key, and some object as value as determined by the 
 * objBuilder function passed as a parameter.
 */
function buildGroupedGr (table, query, field, shouldSkip, objBuilder) {
    var gr = new GlideRecord(table);
    gr.addEncodedQuery(query);
    gr.query();
    var seenList = [];
    var fieldVal;
    var rtnObj = {};

    while (gr.next()) {
        fieldVal = gr.getValue(field);
       
        if (shouldSkip(gr))
            continue;

        if (seenList.indexOf(fieldVal) == -1) {
            seenList.push(fieldVal);
            rtnObj[fieldVal] = objBuilder(gr);
        } 
    }

    return rtnObj;
}
