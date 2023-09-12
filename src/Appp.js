//import './App.css';
import GlobalSearch from './lib';

// import home, about, contact pages from react-icons
import { FaInfo, FaPhone, FaEnvelope } from 'react-icons/fa';
import { BsFillSignpostFill } from 'react-icons/bs';

function Appp() {
    return (
        <GlobalSearch 
			items={[
				{
					name: 'Milestone',
					icon: <BsFillSignpostFill />,
					pathname: '/milestone',
					onClick: () => window.location.pathname = '/milestone',
					search: 'Milestone',
					description: '',
				},
				
				{
					name: 'Clients',
					icon: <FaInfo />,
					pathname: '/clients',
					search: 'Clients',
					onClick: () => window.location.pathname = '/clients',
				},
				{
					name: 'Assignment',
					icon: <FaPhone />,
					pathname: '/assignment',
					onClick: () => window.location.pathname = '/assignment',
					search: 'Assignment',
				},
				{
					name: 'Plans',
					icon: <FaEnvelope />,
					pathname: '/Plans',
					onClick: () => window.location.pathname = '/Plans',
					search: 'Plans',
				},

                {
					name: 'Users',
					icon: <FaEnvelope />,
					pathname: '/user',
					onClick: () => window.location.pathname = '/user',
					search: 'Users',
				},

                {
					name: 'Add Assignment',
					icon: <FaEnvelope />,
					pathname: '/assignment/add',
					onClick: () => window.location.pathname = '/assignment/add',
					search: 'Add Clients',
				},
			]}
			displayButton={true}
			modalTitle="Global Search"
			// modalPositionTop={"20%"}
			// modalWidth={"100%"}
        />
    );
}

export default Appp;
