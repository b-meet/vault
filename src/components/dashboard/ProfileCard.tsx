import {Edit3, LinkIcon, Mail, MapPin, Phone, Trash2} from 'lucide-react';
import type {Profile} from '../../types';
import {useAppDispatch} from '../../hooks/redux';
import {deleteProfile as deleteProfileReducer} from '../../redux/slice/profileSlice';
import {useNavigate} from 'react-router';
import {ROUTES} from '../../constants';
import {deleteProfile} from '../../firebase/firebaseService';

interface ProfileCardProps {
	data: Profile;
}

const ProfileCard = ({data}: ProfileCardProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleDeleteProfile = async () => {
		if (data.id) {
			await deleteProfile(data.id);
			dispatch(deleteProfileReducer(data.id));
		}
	};

	const handleEditProfile = () => {
		navigate(`${ROUTES.ADD_PROFILE}?id=${data.id}`);
	};

	return (
		<div
			key={data.id}
			className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
		>
			<div className="flex justify-between items-start mb-4">
				<div>
					<h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
					<p className="text-gray-600">
						{data.basicInfo.firstName} {data.basicInfo.lastName}
					</p>
				</div>
				<div className="flex space-x-2">
					<button
						onClick={handleEditProfile}
						className="cursor-pointer p-2 bg-slate-100 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
					>
						<Edit3 className="h-4 w-4" />
					</button>
					<button
						onClick={handleDeleteProfile}
						className="cursor-pointer p-2 bg-red-100 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-100"
					>
						<Trash2 className="h-4 w-4" />
					</button>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-4 text-sm">
				<div className="flex items-center space-x-2 text-gray-600">
					<Mail className="h-4 w-4" />
					<span>{data.basicInfo.email}</span>
				</div>
				<div className="flex items-center space-x-2 text-gray-600">
					<Phone className="h-4 w-4" />
					<span>{data.basicInfo.phone}</span>
				</div>
				<div className="flex items-center space-x-2 text-gray-600">
					<MapPin className="h-4 w-4" />
					<span>
						{data.address.city}, {data.address.state}
					</span>
				</div>
				<div className="flex items-center space-x-2 text-gray-600">
					<LinkIcon className="h-4 w-4" />
					<span>{data.socialLinks.website || 'No website'}</span>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
