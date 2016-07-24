var NLP = require('stanford-corenlp');
var config = {"nlpPath":"./corenlp","version":"3.6.0"};
var coreNLP = new NLP.StanfordNLP(config, function(stuff, moreStuff) {
  debugger;
});
