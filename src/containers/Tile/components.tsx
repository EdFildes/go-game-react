import {styled} from "styled-components"

export const TileContainer = styled.div`
    position: relative;
    background: yellow;
    height: 3rem;
    width: 3rem;
`
export const TileQuadrants = styled.div`
    background: black;
    width: 100%;
    height: 100%;
    clip-path: polygon(0% 48%, 48% 48%, 48% 0%, 52% 0%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%, 0% 52%);
`

export const TileQuadrants2 = styled.div`
    background: black;
    width: 100%;
    height: 100%;
    clip-path: polygon(0% 48%, 48% 48%, 48% 0%, 52% 0%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%, 0% 52%);
`

export const Stone = styled.div`
    position: absolute;
    background: black;
    height: 1rem;
    width: 1rem;
    left: 1rem;
    top: 1rem;
    border-radius: 50%;
    z-index: 1000;
`