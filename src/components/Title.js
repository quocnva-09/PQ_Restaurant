import React from 'react'

const Title = ({
    title1,
    title2,
    titleStyles,
    title1Styles,
    paraStyles,
    para
}) => {
  return <div className={`${titleStyles} flexCenter flex-col`}>
    <h3 className={`${title1Styles} uppercase text-gray-50`}>
        {title1}
        <span className="font-light text-textColor"> {title2}</span>
    </h3>
    <p className={`${paraStyles} max-w-lg mt-w text-center`}>
       {para ? para :" Explore our collection of exclusive products tailored just for you."}
    </p>
      </div>;
};

export default Title
