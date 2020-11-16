import React, { useCallback } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTree } from '../../hooks/tree';

import { Container, Item } from './styles';

interface TreeNode {
    id: string;
    name: string;
    children: TreeNode[],
    level: number,
    showChildren: boolean,
    checked: boolean
}

interface TreeProps {
    tree: TreeNode[];
}

const TreeView: React.FC<TreeProps> = ({ tree }) => {
    const { toogleShowChildren, toogleChecked } = useTree();

    const handleToogleShowChildren = useCallback((id: string) => {
        toogleShowChildren(id);
    }, [toogleShowChildren]);

    const checkNode = useCallback((id: string) => {
        toogleChecked(id);
    }, [toogleChecked]);

    return (
        <Container>
            {
                tree.map((node) => (
                    <Item key={node.id} level={node.level}>
                        <div>
                            <input type="checkbox" onChange={() => checkNode(node.id)} checked={node.checked} />
                            <h4>{node.name}</h4>
                            {node.children.length > 0 &&
                                (
                                    node.showChildren ?
                                        <FiChevronUp size={20} onClick={() => handleToogleShowChildren(node.id)} />
                                        : <FiChevronDown size={20} onClick={() => handleToogleShowChildren(node.id)} />
                                )
                            }
                        </div>
                        {node.children.length > 0 && node.showChildren &&
                            <TreeView tree={node.children} />
                        }
                    </Item>
                ))
            }
        </Container>
    );
}

export default TreeView;