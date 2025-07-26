import React, { useState } from 'react';
import AceEditor from 'react-ace';

// Import a theme and mode (language)
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const runCode = () => {
        try {
          const log = [];
          const consoleLog = (...args) => {
            log.push(args.join(' '));
          };
      
          // Create a new function with a custom console
          const script = new Function('console', code);
      
          // Execute the function with the custom console
          script({ log: consoleLog });
      
          // Update the output state with logged messages
          setOutput(log.join('\n'));
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        }
      };
      

  const onChange = (newValue) => {
    setCode(newValue);
    // console.log('Code changed:', newValue);
  };
  return (
    <div>
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={onChange}
        value={code}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="60vh"
      />
      <button onClick={runCode}>Get Code</button>
      <div>{output}</div>
    </div>
  );
};

export default CodeEditor;
