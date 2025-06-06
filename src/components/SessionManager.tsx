import {useSessionManager} from '../hooks/useSessionManager';

export const SessionProvider: React.FC<{children: React.ReactNode}> = ({
	children,
}) => {
	useSessionManager();
	return <div>{children}</div>;
};
