import React from 'react';

import { TreeProvider } from './tree';

const AppProvider: React.FC = ({ children }) => {
    return (
        <TreeProvider>
            {children}
        </TreeProvider>
    );
};

export default AppProvider;
