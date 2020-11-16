import React from 'react';
import './App.css';
import { useTree } from './hooks/tree';

import TreeView from './components/TreeView'

function App() {
  const { tree } = useTree();

  return (
    <TreeView tree={tree} />
  );
}

export default App;
