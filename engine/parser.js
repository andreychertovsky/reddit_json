const axios = require('axios');
const _     = require('lodash');

/**
 * Filters an array of objects with multiple criteria.
 *
 * @param  {Array}  array: the array of objects
 * @param  {Array}  filters: array of filter
 * @return {Array}
 **/

function jsonFilter( array, filters ) {
    const result = array.map( ( el ) => ({
        ..._.pick(el.data, filters) // eq Object.assign()
    }));
    return result;
}

/**
 * Filters an array of objects with multiple criteria.
 *
 * @param  {Array}      array: the array of objects to sort
 * @param  {String}     field: field to sort
 * @param  {Boolean}    ascendent: 1 - low_to_hight 0- - hight_to_low
 * @return {Array}
 **/
function sortCollections( array, field, ascendent ) {
    const result = array.sort( ( a, b ) => {
        if (ascendent) {
            return a[`${field}`] - b[`${field}`]  
        }
        return b[`${field}`] - a[`${field}`]
    })
    return result;
}

/**
 * Filters an array of objects with multiple criteria.
 *
 * @param  {Array}      array: the array of objects to sort
 * @param  {String}     field: field to sort
 * @param  {Boolean}    ascendent: 1 - low_to_hight 0- - hight_to_low
 * @return {Array}
 **/
function agregateCollections ( array ) {
    let formatted_data = _(array)
        .groupBy('domain')
        .map((v, k) => ({
            domain: k,
            score_summ: _.sumBy(v, 'score')
        })).value(); 
    console.log(formatted_data);
}


async function parse (url) {
    try {
        const result = await axios.get(url);
        return result.data;
    } catch ( err ) {
        console.log(err);
    }
}


async function main () {
    let p = await parse('https://www.reddit.com/r/javascript/.json');
    let data = p.data.children;
    let filters = ["id", "title", "created_utc", "score", "domain"]
    
    //first
    let filtered = jsonFilter(data, filters);
    //second
    let ag = agregateCollections(filtered);
    //console.log(ag);
    //console.log(filtered);
    //let z = sortCollections(filtered, field="score", ascendent=0)
   // console.log(z)
}

main();

