import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import data from '../data.json';

interface TreeNode {
    id: string;
    name: string;
    children: TreeNode[],
    level: number,
    showChildren: boolean,
    checked: boolean
}

interface TreeContextData {
    tree: TreeNode[];
    saveTree(tree: TreeNode[]): void
    toogleShowChildren(id: string): void;
    toogleChecked(id: string): void;
}

const TreeContext = createContext<TreeContextData | null>(null);


export const TreeProvider: React.FC = ({ children }) => {
    const [tree, setTree] = useState<TreeNode[]>([]);

    const parseTreeData = useCallback((data: any) => {
        let arrayData: any = [];
        for (let k of Object.keys(data)) {
            arrayData[k] = data[k];
            arrayData[k].children = parseTreeData(arrayData[k].children);
            arrayData[k].showChildren = false;
            arrayData[k].checked = false;
        }
        return arrayData;
    }, []);

    useEffect(() => {
        const storageTree = localStorage.getItem(
            '@HiPlatform:tree',
        );
        if (storageTree) {
            setTree(JSON.parse(storageTree));
        } else {
            setTree(parseTreeData(data));
        }
    }, [parseTreeData]);

    const saveTree = useCallback(
        tree => {
            setTree(tree);
            localStorage.setItem(
                '@HiPlatform:tree',
                JSON.stringify(tree),
            );
        },
        [],
    );

    const updateShowChildren = useCallback((data: TreeNode[], id: string) => {
        let arrayData = [];
        for (let node of data) {
            if (node.id === id) {
                node.showChildren = !node.showChildren;
            }
            node.children = updateShowChildren(node.children, id);
            arrayData.push(node);
        }
        return arrayData;
    }, []);

    const toogleShowChildren = useCallback((id: string) => {
        const updatedTree = updateShowChildren(tree, id);
        setTree(updatedTree);
    }, [tree, updateShowChildren]);


    const updateChecked = useCallback((data: TreeNode[], checked: boolean) => {
        for (let node of data) {
            node.checked = checked;
            node.children = updateChecked(node.children, checked);
        }
        return data;
    }, []);

    const toogleCheckedNode = useCallback((data: TreeNode[], id: string) => {
        for (let node of data) {
            if (node.id === id) {
                node.checked = !node.checked;
                node.children = updateChecked(node.children, node.checked);
            }
            node.children = toogleCheckedNode(node.children, id);
        }
        return data;
    }, [updateChecked]);

    const toogleChecked = useCallback((id: string) => {
        const treeAux = [...tree];
        const updatedTree = toogleCheckedNode(treeAux, id);
        setTree(updatedTree);
    }, [toogleCheckedNode, tree]);

    return (
        <TreeContext.Provider value={{ tree, saveTree, toogleShowChildren, toogleChecked }}>
            {children}
        </TreeContext.Provider>
    );
};

export function useTree(): TreeContextData {
    const context = useContext(TreeContext);

    if (!context) {
        throw new Error('useTree must be used within an TreeProvider');
    }

    return context;
}
