import React from 'react';
import './App.css';

import TreeView from './components/TreeView'

import data from './data.json';

function parseTreeData(data: any) {
  let arrayData: any = [];
  for (let k of Object.keys(data)) {
    arrayData[k] = data[k];
    arrayData[k].children = parseTreeData(arrayData[k].children);
  }
  return arrayData;
}

const treeData = parseTreeData(data);

function App() {
  return (
    <TreeView tree={treeData} />
  );
}

export default App;
