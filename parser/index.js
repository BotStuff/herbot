import _ from 'lodash';

export default (result) => {

  let words = [];

  const toSentence = result.document.sentences.sentence

  const sentence = toSentence[0];

  const getWord = (element) => {
    if (_.has(element, 'children')) {
      let depth = element.children.length;
      for (let i = 0; i <= depth - 1; i++) {
        getWord(element.children[i])
      }
    } else {
      debugger;
      words.push(element.word)
    }
  }

  // iterate sentence structure
  sentence.parsedTree.children[0].children.forEach((element) => {
    getWord(element);
  })

  //
  //   // find match with recognized pattern
  //   _.forIn(identities,
  //     (value, key) => {
  //       tree.forEach((combination) => {
  //         if(_.isEqual(combination, value))
  //           endResult.push({ pattern: key, phrase: word.join(' ') })
  //       })
  //     })
  // })
}

const identities = {
  'Noun Definition': ['NP', 'VP']
}

//
// A black hole is a region of spacetime exhibiting such strong gravitational effects that nothing—including particles and
// electromagnetic radiation such as light—can escape from inside it
