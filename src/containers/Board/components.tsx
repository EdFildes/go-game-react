import {styled} from "styled-components"

export const BoardContainer = styled.div`
    width: calc(${props => props.size} * 3rem);
    display: grid;
    grid-template-columns: repeat(${props => props.size}, auto);
`