import React from 'react';
import styled from 'styled-components';

const NextBtn = () => {
  return (
    <StyledWrapper>
      <button> Next
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   width: 9em;
   height: 3em;
   border-radius: 500px;
   font-size: 15px;
   font-family: inherit;
   border: none;
   position: relative;
   overflow: hidden;
   z-index: 1;
    background: #E6FF94 ;
   margin-left:150px;
  
  
  }

  button::before {
   content: '';
   width: 0;
   height: 3em;
   border-radius: 500px;
   position: absolute;
   top: 0;
   left: 0;
   background-image: linear-gradient(to right, #0fd850 0%, #f9f047 100%);
   transition: .5s ease;
   display: block;
   z-index: -1;
  }

  button:hover::before {
   width: 9em;
  }`;

export default NextBtn;
