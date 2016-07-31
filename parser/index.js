import _ from 'lodash';

export default (result) => {

  let concepts = [];

  const toSentence = result.document.sentences.sentence
  const sentence = toSentence[0];

  const getWord = (element) => {
    let depth = 0;
    if (_.has(element, 'children')) {
      depth = element.children.length;
      for (let i = 0; i <= depth - 1; i++) {
        getWord([element.children[i]])
      }
    } else if (_.has(element[0], 'children')) {
      depth = element[0].children.length;
      for (let i = 0; i <= depth - 1; i++) {
        getWord([element[0].children[i]])
      }
    } else {
      concepts[concepts.length - 1].phrase.push(element[0].word);
    }
  }

  const isMatch = function (types) {
    _.forEach(patterns, (value, key) => {
      if (value === types.toString()) {
        return key;
      }
    })
  };

  const mapStructure = (segment) => {
    let types = [];
    if (_.has(segment, 'children')) {
      let depth = segment.children.length;
      for (let i = 0; i <= depth - 1; i++) {
        let current = segment.children[i].type.match(/[A-Z]/ig);
        current ? types.push(current.join('')) : null;
      }
      debugger;
      return isMatch(types) ?
        {
          type: segment.type,
          segments: [segment.children[0], segment.children[1]]
        } : false;
    } else {
      return false;
    }
  }

  const crawler = (segment) => {
    const hasPattern = mapStructure(segment);
    debugger;
    if (hasPattern) {
      hasPattern.forEach((segment) => {
        concepts.push({ type: segment.type, phrase: [] })
        getWordFor(segment);
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

const patterns = {
  'NounDefinition': 'NP,VP',
}
