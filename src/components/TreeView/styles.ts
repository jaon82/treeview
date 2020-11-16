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
            padding-left: ${16 + props.level * 16}px;
        `}

        input{
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        h4{
            flex: 1;
            user-select: none;
            margin: 5px 0 5px 16px;
            padding: 20px 0;
        }
    }
`;