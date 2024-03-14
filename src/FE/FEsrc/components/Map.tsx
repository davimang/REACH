import {memo} from 'react';

interface MapProps {
    latitude: number;
    longitude: number;
}

const Map = memo((props: MapProps) => {
    const currLocation = `https://www.google.com/maps/embed/v1/place?q=${props.latitude},${props.longitude}&key=AIzaSyDSRIniLCNxD-WprGLaZjQuCLgOnj2K3D4`
    return(
        <div>
            <iframe 
                    src={currLocation}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    width="750" 
                    height="450"
                />
        </div>
    )
});

export default Map;