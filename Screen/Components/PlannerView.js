import React from "react";
import Section from "../Components/Section";

const PlannerView = ({ data }) => {
  

  return (
    <>
        {
            data.map( (section, sectionIndex) => {
                return (
                    <Section 
                        key={sectionIndex}
                        title={section.title}
                        rowData={
                            section.rows
                        }
                    />
                )
            })
        }
      
    </>
  );
};

export default PlannerView;

