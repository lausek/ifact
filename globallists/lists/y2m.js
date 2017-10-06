function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {
        // create an array for our result set
        var results = [];

        for (var i = 1; i <= 12; i++){
            results.push({
                month: ("0"+i).substr(-2)
            });
        }

        function filterElm(elm, index){
            if (elm.month == row.key[1]) dataIndex = index;
            return elm.month == row.key[1];
        }
        

        while (row = getRow()) {
            var tmpData = {
                month: row.key[1]
            };
            tmpData[row.key[0]+"_ron"] = (row.value.type == "INVOICE")?row.value.ron:0;
            tmpData[row.key[0]+"_eur"] = (row.value.type == "INVOICE")?row.value.eur:0;
            
            var dataIndex = -1;
            var dataElm = results.filter(filterElm);

            if( dataIndex == -1){
                results.push(tmpData);
            }else{
                //update values for that element
                tmpData[row.key[0]+"_ron"] += (typeof dataElm[0][row.key[0]+"_ron"] !== 'undefined')?dataElm[0][row.key[0]+"_ron"]:0;
                tmpData[row.key[0]+"_eur"] += (typeof dataElm[0][row.key[0]+"_eur"] !== 'undefined')?dataElm[0][row.key[0]+"_eur"]:0;
                results[dataIndex] = tmpData;
            }

        }

        /*
        results.forEach(function(elm){
            elm.invoiced_ron = elm.invoiced_ron.toFixed();
            elm.invoiced_eur = elm.invoiced_eur.toFixed();
        });
        */

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}