import StanfordSimpleNLP from 'stanford-simple-nlp';
import parser from './parser';

const sentence = `A black hole is a region of spacetime exhibiting such strong gravitational effects that nothing—including particles and electromagnetic radiation such as light—can escape from inside it.[1] The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.[2][3] The boundary of the region from which no escape is possible is called the event horizon. Although crossing the event horizon has enormous effect on the fate of the object crossing it, it appears to have no locally detectable features. In many ways a black hole acts like an ideal black body, as it reflects no light.[4][5] Moreover, quantum field theory in curved spacetime predicts that event horizons emit Hawking radiation, with the same spectrum as a black body of a temperature inversely proportional to its mass. This temperature is on the order of billionths of a kelvin for black holes of stellar mass, making it essentially impossible to observe.

Objects whose gravitational fields are too strong for light to escape were first considered in the 18th century by John Michell and Pierre-Simon Laplace. The first modern solution of general relativity that would characterize a black hole was found by Karl Schwarzschild in 1916, although its interpretation as a region of space from which nothing can escape was first published by David Finkelstein in 1958. Black holes were long considered a mathematical curiosity; it was during the 1960s that theoretical work showed they were a generic prediction of general relativity. The discovery of neutron stars sparked interest in gravitationally collapsed compact objects as a possible astrophysical reality.

Black holes of stellar mass are expected to form when very massive stars collapse at the end of their life cycle. After a black hole has formed, it can continue to grow by absorbing mass from its surroundings. By absorbing other stars and merging with other black holes, supermassive black holes of millions of solar masses (M☉) may form. There is general consensus that supermassive black holes exist in the centers of most galaxies.

Despite its invisible interior, the presence of a black hole can be inferred through its interaction with other matter and with electromagnetic radiation such as visible light. Matter that falls onto a black hole can form an external accretion disk heated by friction, forming some of the brightest objects in the universe. If there are other stars orbiting a black hole, their orbits can be used to determine the black hole's mass and location. Such observations can be used to exclude possible alternatives such as neutron stars. In this way, astronomers have identified numerous stellar black hole candidates in binary systems, and established that the radio source known as Sagittarius A*, at the core of our own Milky Way galaxy, contains a supermassive black hole of about 4.3 million solar masses.

On 11 February 2016, the LIGO collaboration announced the first observation of gravitational waves; because these waves were generated from a black hole merger it was the first ever direct detection of a binary black hole merger.[6] On 15 June 2016, a second detection of a gravitational wave event from colliding black holes was announced.[7]`

// const sentence = `If you were to take a step into a black hole, your body would most closely resemble "toothpaste being extruded out of the tube," said Charles Liu, an astrophysicist who works at the American Museum of Natural History's Hayden Planetarium.`

const NLP = new StanfordSimpleNLP.StanfordSimpleNLP( function(err) {
  NLP.process(sentence, function(err, result) {
    parser(result)
  });
});
