import StanfordSimpleNLP from 'stanford-simple-nlp';

const sentence = 'A black hole is a region of spacetime exhibiting such strong gravitational effects that nothing—including particles and electromagnetic radiation such as light—can escape from inside it.[1] The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.[2][3] The boundary of the region from which no escape is possible is called the event horizon. Although crossing the event horizon has enormous effect on the fate of the object crossing it, it appears to have no locally detectable features. In many ways a black hole acts like an ideal black body, as it reflects no light.'

const NLP = new StanfordSimpleNLP.StanfordSimpleNLP( function(err) {
  NLP.process(sentence, function(err, result) {
    debugger;
  });
});
