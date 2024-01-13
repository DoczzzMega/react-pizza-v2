import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="123" r="124" /> 
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="271" rx="10" ry="10" width="280" height="21" /> 
    <rect x="0" y="427" rx="10" ry="10" width="90" height="30" /> 
    <rect x="126" y="420" rx="20" ry="20" width="150" height="44" />
  </ContentLoader>
);

export default Skeleton;
