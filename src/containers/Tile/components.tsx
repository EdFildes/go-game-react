import {styled, css} from "styled-components"

export const TileContainer = styled.div`
    position: relative;
    background: yellow;
    height: 3rem;
    width: 3rem;
`

const tileInner = css`
    clip-path: polygon(0% 48%, 48% 48%, 48% 0%, 52% 0%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%, 0% 52%);
`
const tileTopLeft = css`
    clip-path: polygon(48% 48%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%);
`
const tileTopRight = css`
    clip-path: polygon(
        48% 48%, 52% 48%, 100% 48%, 100% 52%, 
        52% 52%, 52% 100%, 48% 100%, 48% 52%
    );
    transform: rotate(90deg);
`

export const tileBottomLeft = css`
    clip-path: polygon(
        48% 48%, 52% 48%, 100% 48%, 100% 52%, 
        52% 52%, 52% 100%, 48% 100%, 48% 52%
    );
    transform: rotate(270deg);
`;

export const tileBottomRight = css`
    clip-path: polygon(
        48% 48%, 52% 48%, 100% 48%, 100% 52%, 
        52% 52%, 52% 100%, 48% 100%, 48% 52%
    );
    transform: rotate(180deg);

`;
export const tileTop = css`
    clip-path: polygon(48% 48%, 48% 0%, 52% 0%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%);
    transform: rotate(90deg);
`;

export const tileBottom = css`
    clip-path: polygon(48% 48%, 48% 0%, 52% 0%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%);
    transform: rotate(-90deg);
`;

export const tileLeft = css`
    clip-path: polygon(48% 48%, 48% 0%, 52% 0%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%);
`;

export const tileRight = css`
    clip-path: polygon(48% 48%, 48% 0%, 52% 0%, 52% 48%, 100% 48%, 100% 52%, 52% 52%, 52% 100%, 48% 100%, 48% 52%);
    transform: rotate(180deg);
`;

const styleMapping = {
    "inner": tileInner,
    "topLeft": tileTopLeft,
    "topRight": tileTopRight,
    "bottomLeft": tileBottomLeft,
    "bottomRight": tileBottomRight,
    "topEdge": tileTop,
    "bottomEdge": tileBottom,
    "leftEdge": tileLeft,
    "rightEdge": tileRight
};


export const TileQuadrants = styled.div<{position: string}>`
    background: black;
    width: 100%;
    height: 100%;
    ${({position}) => styleMapping[position]}
`

export const Stone = styled.div`
    position: absolute;
    background: ${({stoneColor}) => stoneColor};
    height: 2rem;
    width: 2rem;
    left: 0.5rem;
    top: 0.5rem;
    border-radius: 50%;
    z-index: 1000;
    border: 1px solid grey;
`