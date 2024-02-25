interface MapProps {
    latitude: number;
    longitude: number;
}

const Map: React.FC<MapProps> = ({latitude, longitude}) => {
    const Embed = () => { 
        const currLocation = `https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=AIzaSyDSRIniLCNxD-WprGLaZjQuCLgOnj2K3D4`
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
        );
    }

    return(
        <>
            <Embed />
        </>
    )
}

export default Map;