import { memo } from 'react';
import styled from '@emotion/styled';

const StyledMap = styled.iframe`
    width: calc(95vw - 600px);
    min-width: 600px;
    height: calc(95vh - 235px);
    border: 0;
    allowfullscreen;
    loading: lazy;
    referrerpolicy: no-referrer-when-downgrade;
    @media (max-width: 1024px) {
        width: 750px;
    }
`;

interface MapProps {
    latitude: number;
    longitude: number;
}

const Map = memo((props: MapProps) => {
    const currLocation = `https://www.google.com/maps/embed/v1/place?q=${props.latitude},${props.longitude}&key=AIzaSyDSRIniLCNxD-WprGLaZjQuCLgOnj2K3D4`
    return (
        <StyledMap
            src={currLocation}
        />
    )
});

export default Map;