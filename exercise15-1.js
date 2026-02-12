// exercise15-1.js
const examples = [
    {
        numi: {
            term: {
                coeff: 2,
                var: {
                    x: 1,
                    y: 1
                }
            }
        },
        deno: 1
    },
    {
        numi: {
            terms: [{
                coeff: 1,
                var: {
                    x: 1,
                }
            }, {
                coeff: -1,
                var: {
                    y: 1
                }
            }]
        },
        deno: 1
    },
    {
        numi: {
            terms: [{
                coeff: 1,
                var: {
                    x: 1,
                }
            }, {
                coeff: 1,
                var: {
                    y: 1
                }
            }, {
                coeff: 1,
                var: {

                }
            }]
        },
        deno: 1
    }
];

export default examples;
