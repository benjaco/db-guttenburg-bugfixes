const { exec } = require('child_process');

async function getLocationsFromText(text){
    let nerOutput = await new Promise((resolve, reject) => {
        exec('cd buildDatabase/stanford-ner &&  java -mx600m -cp "*:lib/*" edu.stanford.nlp.ie.crf.CRFClassifier -loadClassifier classifiers/english.all.3class.distsim.crf.ser.gz -textFile ../../zipfiles/'+text, (err, stdout, stderr) => {
            if (err) {
              reject(err);
            }
          
            resolve(stdout);
        });
    })

    return [...nerOutput.matchAll(/([^ ]*\/LOCATION )+/gm)].map(i => {
        return [i.index, i[0].replace(/\/LOCATION/gm, "").trim()]
    })
}


module.exports = getLocationsFromText