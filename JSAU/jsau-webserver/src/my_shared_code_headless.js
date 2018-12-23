'use strict'

function generateEvenNumbers(max) {
    return ['do it', 'do it', 'do it']
}

function premiersNumbers(max) {
    let premiers = []
    for (let i = 2; i <= max; i++) {
        let j = 1
        let racine = Math.floor(Math.sqrt(i))
        do {
            j++
        } while (j <= racine && i % j != 0)
        if (j > racine) {
            premiers.push(i)
        }
    }

    return premiers
}

module.exports = {
    generateEvenNumbers,
    premiersNumbers
}
