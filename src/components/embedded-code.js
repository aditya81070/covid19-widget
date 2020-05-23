import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from './button';
import StyledTitle from './styled-title';

const StyledCodeContainer = styled.div`
  border: 1px solid gray;
  padding: 0px 8px 8px;
`;

const StyledCode = styled.div`
  border: 1px solid gray;
  padding: 8px;
  width: 100%;
  word-break: break-word;
  box-sizing: border-box;
`;

const CodeButtonContainer = styled.div`
  display: flex;
  margin-top: 16px;

  & > button {
    margin-left: 8px;
  }
`;

const EmbeddedCode = ({ token, selectedState, dispatch, width, height }) => {
  const codeRef = useRef();
  const handleCopyCode = (e) => {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.top = 0;
    textarea.style.left = 0;

    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    // Avoid flash of white box if rendered for any reason.
    textarea.style.background = 'transparent';
    textarea.value = codeRef.current.textContent;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      success = false;
    }
    document.body.removeChild(textarea);
    if (success) {
      window.alert('code copied to clipboard');
    } else {
      window.alert('can not copy. Please try manually');
    }
  };
  return (
    <StyledCodeContainer>
      <StyledTitle>Add following code to your website</StyledTitle>
      <StyledCode>
        <code ref={codeRef}>
          {`<iframe title="${selectedState}'s Covid19 data" src="http://localhost:3000/widget/${token}" width="${width}" height="${height}" loading="lazy">Browser do not support iframe </iframe>`}
        </code>
      </StyledCode>
      <CodeButtonContainer>
        <Button type='button' onClick={handleCopyCode}>
          Copy
        </Button>
        <Button
          type='button'
          onClick={() => dispatch({ type: 'token', data: '' })}
        >
          Close
        </Button>
      </CodeButtonContainer>
    </StyledCodeContainer>
  );
};

export default EmbeddedCode;
