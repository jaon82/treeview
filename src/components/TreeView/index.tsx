import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { Container, Item } from './styles';

interface TreeNode {
    id: string;
    name: string;
    children: TreeNode[]
}

interface TreeProps {
    tree: TreeNode[];
}

const TreeView: React.FC<TreeProps> = ({ tree }) => {
    return (
        <Container>
            {
                tree.map((node) => (
                    <Item key={node.id}>
                        <div>
                            <input type="checkbox" />
                            <h4>{node.name}</h4>
                            <FiChevronDown size={20} />
                        </div>
                        {node.children.length > 0 &&
                            <TreeView tree={node.children} />
                        }
                    </Item>
                ))
            }
        </Container>
    );
}

export default TreeView;