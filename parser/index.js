import _ from 'lodash';

export default (result) => {

  let concepts = [];
  let currentVerb;
  let currentNoun;

  const toSentence = result.document.sentences.sentence
  const sentence = toSentence[0];

  const loopNounDefinition = (element) => {
    const children = element.children;
    for (let i = 0; i <= children.length - 1; i++) {
      parseNounDefinition([children[i]])
    }
  }

  const parseNounDefinition = (element) => {
    let depth = 0;
    if (_.has(element, 'children')) {
      loopNounDefinition(element)
    } else if (_.has(element[0], 'children')) {
      loopNounDefinition(element[0])
    } else {
      concepts[concepts.length - 1].phrase.push(element[0].word);
    }
  }

  // =====
  const isMatch = function (types) {
    for (var key in patterns) {
      if (patterns[key] === types.toString()) {
        return key;
      }
    }
  };

  const loopForStructure = (segment, types) => {

    const iterated = segment.children;
    for (let i = 0; i <= iterated.length - 1; i++) {
      let current = iterated[i].type.match(/[A-Z]/ig);
      current ? types.push(current.join('')) : null;
    }
  }

  const mapStructure = (segment) => {
    let types = [];
    if (_.has(segment, 'children')) {
      loopForStructure(segment, types)
      return isMatch(types) ?
      {
        type: segment.type,
        segments: [segment.children[0], segment.children[1]]
      } : false;
    } else {
      return false;
    }
  }
  // =====

  // const storeTempValues = () => {
  //   concepts[concepts.length -1].type
  // }

  const crawler = (segment) => {
    const hasPattern = mapStructure(segment);
    if (hasPattern) {
      hasPattern.segments.forEach((segment) => {
        concepts.push({ type: segment.type, phrase: [] })
        parseNounDefinition(segment);
        // storeTempValues()
        debugger;
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
