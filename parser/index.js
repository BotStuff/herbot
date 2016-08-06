import _ from 'lodash';
// import only methods needed

export default (result) => {

  let concepts = [];
  let current = {};

  let searched = 'black hole';

  let shortMemory = {};

  let memory = {
     'black hole': {
       definitions: [

       ],
     }
  };

  const learn = (element) => {
    shortMemory[element.type] = element.word.toLowerCase();
    if (_.isEqual(_.keys(shortMemory), ['JJ', 'NNS']) || _.isEqual(_.keys(shortMemory), ['JJ', 'NN'])) {
      memory[searched].definitions.push({noun: `${shortMemory.JJ} ${shortMemory.NN || shortMemory.NNS}`})
    } else if (_.last(memory[searched].definitions) && _.last(memory[searched].definitions).hasOwnProperty('noun') && shortMemory.hasOwnProperty('VBP')) {
      _.last(memory[searched].definitions)['verb'] = element.word.toLowerCase();
    } else if (_.last(memory[searched].definitions) && _.last(memory[searched].definitions).hasOwnProperty('verb') && _.last(memory[searched].definitions)['verb'] === '') {
      if (element.word.toLowerCase() !== 'that') {
        _.last(memory[searched].definitions)['verb'] += element.word.toLowerCase();
      }
    }
    debugger;
  }

  const toSentence = result.document.sentences.sentence
  const sentence = toSentence;

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
      learn(element[0])
      concepts[concepts.length - 1].phrase.push(element[0].word);
    }
  }

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

  const storeTempValues = (segment) => {
    current[segment.type] = _.last(concepts).phrase.join(' ');
  }

  const crawler = (segment) => {
    const hasPattern = mapStructure(segment);
    if (hasPattern) {
      hasPattern.segments.forEach((segment) => {
        concepts.push({ type: segment.type, phrase: [] })
        parseNounDefinition(segment);
        storeTempValues(segment)
        // ...?
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
