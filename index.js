var StanfordSimpleNLP = require('stanford-simple-nlp');

var NLP = new StanfordSimpleNLP.StanfordSimpleNLP( function(err) {
  NLP.process('This is so good.', function(err, result) {
    debugger;
  });
});
