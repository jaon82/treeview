import styled, { css } from 'styled-components';

interface ItemProps {
    level: number;
}

export const Container = styled.ul`
    max-width: 700px;
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const Item = styled.li<ItemProps>`
    div{
        display: flex;
        align-items: center;
        justify-content: space-between;   
        cursor: pointer;
        padding: 0 16px;

        &:hover{
            background-color: #ddd;
        }
        
        ${props => props.level > 0 && css`
            padding-left: ${props.level * 16}px;
        `}

        h4{
            flex: 1;
            margin-left: 8px;
            user-select: none;
        }
    }
`;