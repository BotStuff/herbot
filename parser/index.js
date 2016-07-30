import _ from 'lodash';

export default (result) => {

  let words = [];

  const toSentence = result.document.sentences.sentence

  const sentence = toSentence[0];

  const getWord = (element) => {
    debugger;
    if (_.has(element, 'children')) {
      let depth = element.children.length;
      for (let i = 0; i <= depth - 1; i++) {
        getWord([element.children[i]])
      }
    } else {
      words.push({ type: element.type, phrase: element.word });
      // insert phrase preceeded by main type
    }
  }

  const findOne = function (arr1, arr2) {
    return arr2.some(function (v) {
      return arr1.indexOf(v) >= 0;
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
      return types.includes('NP', 'VP') ? [element.children[0], element.children[1]] : false;
    } else {
      return false;
    }
  }

  const crawler = (segment) => {
    const hasPattern = mapStructure(segment);
    if (hasPattern) {
      hasPattern.forEach((segment) => {
        getWord(segment);
      })
    }

    if (_.has(segment, 'children')) {
      let depth = segment.children.length;
      for (let i = 0; i <= depth - 1; i++) {
        crawler(segment.children[i])
      }
    }
  }


  sentence.parsedTree.children.forEach((element) => {
    crawler(element);
    debugger;
  })
}

const identities = {
  'Noun Definition': ['NP', 'VP']
}
