import { memo } from 'react';
import styled from '@emotion/styled';

const StyledMap = styled.iframe`
    width: calc(100vw - 657px);
    min-width: 600px;
    height: calc(95vh - 295px);
    border: 0;
    allowfullscreen;
    loading: lazy;
    referrerpolicy: no-referrer-when-downgrade;
    @media (max-width: 1024px) {
        width: 750px;
    }
`;

interface MapProps {
    address: string;
}

const Map = memo((props: MapProps) => {
    const currLocation = `https://www.google.com/maps/embed/v1/place?q=${props.address}&key=AIzaSyDSRIniLCNxD-WprGLaZjQuCLgOnj2K3D4`
    return (
        <StyledMap
            src={currLocation}
        />
    )
});

export default Map;