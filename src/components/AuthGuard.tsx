import { useAuthGuard } from '../routes/useAuthGuard';

// Higher-order component for protected routes
export function withAuthGuard<P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> {
    const ProtectedComponent: React.FC<P> = (props) => {
        const { isAuthenticated } = useAuthGuard();

        if (!isAuthenticated) {
            return null; // You can return a loading spinner or redirect logic here
        }

        return <WrappedComponent {...props} />;
    };

    return ProtectedComponent;
}
