import styled from 'styled-components';

export const Container = styled.ul`
    max-width: 700px;
    list-style: none;
    margin: 0;
    //padding: 0;
`;

export const Item = styled.li`
    div{
        display: flex;
        align-items: center;
        justify-content: space-between;   
        cursor: pointer;     

        &:hover{
            background-color: #ddd;
        }
        
        h4{
            flex: 1;
            margin-left: 8px;
            user-select: none;
        }
    }
`;