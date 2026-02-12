let obj = {
    numi: {
        term: {
            coeff: 2,
            var: {
                x: 1,
                y: 1
            }
        }
    },
    deno: null
}

function intgrate(obj, indvar) {
    let power = obj?.numi?.term?.var?.[indvar];
    if (power == undefined) {
        delete obj.numi.term;
    }
    if (obj && obj.numi && obj.numi.term) {
        obj.numi.term.coeff /= (power + 1);
    }
    return obj;
}


let variable = "x";
console.log(intgrate(obj, variable));
