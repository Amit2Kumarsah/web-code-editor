import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';

// Import themes and modes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';

import './edit.css';

// Styled components for layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Editors = styled.div`
  display: flex;
  flex: 1;
  height:500px
`;

const Output = styled.div`
  flex: 1;
  background-color: white;
  overflow: auto;
  border:5px solid balck;
  margin:20px;
`;

const Button = styled.button`
  padding: 5px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  width:100px;
  font-weight:bold;
  border:none;
  border-radius:10px;
background: linear-gradient(to right, #ff7e5f, #feb47b);
transition: background 0.3s ease;
  &:hover {
    background: linear-gradient(to right, #feb47b, #ff7e5f);
  }
`;


const Header = styled.header`
  background-color: #282c34;
  padding: 10px;
  color: white;
  text-align: center;
  height:50px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CodeEditor = () => {
  const [html, setHtml] = useState('<h1>Hello, world!</h1>');
  const [css, setCss] = useState('h1{\n    color: green;\n}');
  const [js, setJs] = useState('const h1 = document.querySelector("h1");\nh1.innerText = "Hello, from Interactive World!";');
  const [output, setOutput] = useState('');
  const [choose, setChoose] = useState("HTML");

  const clearEditors = () => {
    setHtml('');
    setCss('');
    setJs('');
    setOutput('');
  };

  const runCode = ()=>{
    updateOutput();
  }

    const updateOutput = () => {
        const source = `
          <html>
            <head>
              <style>${css}</style>
            </head>
            <body>
              ${html}
              <script>${js}</script>
            </body>
          </html>
        `;
          setOutput(source);
      };

  return (
    <Container>
         <Header>
        <h1>Interactive Code Editor</h1>
      </Header>
      <ButtonsContainer>
        <Button onClick={clearEditors}>Clear</Button>
        <Button onClick={runCode}>Run</Button>
        <select name="choose" className='choose' onChange={(e) => setChoose(e.target.value)}>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="Js">JS</option>
        </select>
      </ButtonsContainer>
      <Editors>
        <AceEditor
          mode="html"
          theme="monokai"
          onChange={newValue => setHtml(newValue)}
          value={html}
          name="html_editor"
          editorProps={{ $blockScrolling: true }}
          width="33%"
          height="100%"
          fontSize={20}
          className={choose === "HTML"?'choosen':"v"}
        />
        <AceEditor
          mode="css"
          theme="monokai" 
          onChange={newValue => setCss(newValue)}
          value={css}
          name="css_editor"
          editorProps={{ $blockScrolling: true }}
          width="33%"
          height="100%"
          fontSize={20}
          className={choose==="CSS" ? "choosen":"noneChoosen"}
        />
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={newValue => setJs(newValue)}
          value={js}
          name="js_editor"
          editorProps={{ $blockScrolling: true }}
          width="33%"
          height="60vh"
          fontSize={20}
          className={choose === "Js" ? "choosen":"noneChoosen"}
        />
      </Editors>
      <Output>
        <iframe
          srcDoc={output}
          title="Output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </Output>
    </Container>
  );
};

export default CodeEditor;
