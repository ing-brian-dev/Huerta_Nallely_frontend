import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import FullScreenLoader from '@/shared/ui/FullScreenLoader';

export default function ProtectedRoute() {
    const { data, isLoading, isError } = useAuth();    

    if (isLoading) return <FullScreenLoader />;
    if (isError || !data) return <Navigate to="/" replace />;

    return <Outlet />;
}
