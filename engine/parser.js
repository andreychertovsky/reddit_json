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
    return Promise.all(result)
}

/**
 * Sort array of objects by field
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
    });
    return Promise.all(result)
}

/**
 * Agregate array of objects by domain, count total score and count article on domain
 *
 * @param  {Array}      array: the array of objects to agregate
 * @return {Array}
 **/
function agregateCollections ( array ) {
    let result = _(array)
        .groupBy('domain')
        .map((objs, key) => ({
            domain: key,
            article_count: objs.length,
            score_summ: _.sumBy(objs, 'score')
        })).value();
    return Promise.all(result) 
    //return formatted_data;
}

/**
 * Generate output file
 *
 * @param  {Array}      array: the array of objects to agregate
 * @return {Array}
 **/
function generateOuputFile ( file_type ) {
    
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
    let filters = ["domain", "score", "id", "title", "created_utc"]
    
    //first filter by fields
    let filtered = await jsonFilter(data, filters);
    //console.log(filtered)
    //second 
    let ag = await agregateCollections(filtered);
    console.log(ag);
    //console.log(filtered);
    //let z =  await sortCollections(filtered, field="score", ascendent=1)
    //console.log(z)
}

main();

