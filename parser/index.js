import _ from 'lodash';

export default (result) => {

  let words = [];

  const toSentence = result.document.sentences.sentence

  const sentence = toSentence[0];

  const getWord = (element) => {
    debugger;
  }

  var findOne = function (haystack, arr) {
    return arr.some(function (v) {
      return haystack.indexOf(v) >= 0;
    });
  };

  const mapStructure = (element) => {
    let types = [];
    if (_.has(element, 'children')) {
      let depth = element.children.length;
      for (let i = 0; i <= depth - 1; i++) {
        let current = element.children[i].type.match(/[A-Z]/ig);
        current ? types.push(current.join('')) : null;
      }
      findOne(types, ['NP', 'VP'])
      return types.includes('NP', 'VP') ? element : false
    } else {
      return false;
    }
  }

  const crawler = (segment) => {
    mapStructure(segment) ? getWord(segment) : null;
    if (_.has(segment, 'children')) {
      let depth = segment.children.length;
      for (let i = 0; i <= depth - 1; i++) {
        crawler(segment.children[i])
      }
    }
  }


  sentence.parsedTree.children.forEach((element) => {
    crawler(element);
  })
}

const identities = {
  'Noun Definition': ['NP', 'VP']
}

//
// A black hole is a region of spacetime exhibiting such strong gravitational effects that nothing—including particles and
// electromagnetic radiation such as light—can escape from inside it
