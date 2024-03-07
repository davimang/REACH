import ProfileCreationPage from "./ProfileCreation";
import { useLocation } from 'react-router';

const EditProfilePage = (props) => {

    const data = useLocation();

    props = {...data.state, editing: true};

    return (
        ProfileCreationPage(props)
    )

}

export default EditProfilePage;