
import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   height="20.511086"
   width="23"
   id="svg12"
   version="1.1"
   viewBox="-11.5 -10.232 23 20.511086">
  <metadata
     id="metadata18">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs
     id="defs16" />
  <circle
     style="fill:#61dafb"
     cy="0.023542816"
     cx="0"
     id="circle2"
     r="2.05" />
  <g
     transform="translate(0,0.02354282)"
     style="fill:none;stroke:#61dafb"
     id="g10">
    <ellipse
       cy="0"
       cx="0"
       id="ellipse4"
       ry="4.1999998"
       rx="11" />
    <ellipse
       cy="0"
       cx="0"
       id="ellipse6"
       transform="rotate(60)"
       ry="4.1999998"
       rx="11" />
    <ellipse
       cy="0"
       cx="0"
       id="ellipse8"
       transform="rotate(120)"
       ry="4.1999998"
       rx="11" />
  </g>
</svg>
`;

export default () => <SvgXml xml={xml} width="100%" height="100%" />;
