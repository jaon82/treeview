import React, { useCallback, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { Container, Item } from './styles';

interface TreeNode {
    id: string;
    name: string;
    children: TreeNode[],
    level: number
}

interface TreeProps {
    tree: TreeNode[];
}

const TreeView: React.FC<TreeProps> = ({ tree }) => {
    const [showChildren, setShowChildren] = useState<string[]>([]);

    const toogleShowChildren = useCallback((id: string) => {
        const showChildrenUpdated = [...showChildren];
        const nodeIndex = showChildrenUpdated.findIndex(item => item === id);
        if (nodeIndex > -1) {
            showChildrenUpdated.splice(nodeIndex, 1);
        } else {
            showChildrenUpdated.push(id);
        }
        setShowChildren(showChildrenUpdated);
    }, [showChildren]);

    return (
        <Container>
            {
                tree.map((node) => (
                    <Item key={node.id} level={node.level}>
                        <div>
                            <input type="checkbox" />
                            <h4>{node.name}</h4>
                            {node.children.length > 0 &&
                                (
                                    showChildren.includes(node.id) ?
                                        <FiChevronUp size={20} onClick={() => toogleShowChildren(node.id)} />
                                        : <FiChevronDown size={20} onClick={() => toogleShowChildren(node.id)} />
                                )
                            }
                        </div>
                        {node.children.length > 0 && showChildren.includes(node.id) &&
                            <TreeView tree={node.children} />
                        }
                    </Item>
                ))
            }
        </Container>
    );
}

export default TreeView;