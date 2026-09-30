import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./features/auth/layouts/AuthLayout";
import NotFoundView from "./shared/ui/NotFoundView";
import SalesPanel from "./features/sales/components/SalesPanel";
import OrchardsPanel from "./features/orchards/components/OrchardsPanel";
import ProtectedRoute from "./shared/dashboard/components/ProtectedRoute";
import AgrochemicalsPanel from "./features/agrochemicals/components/AgrochemicalsPanel";
import HarvestsPanel from "./features/harvests/components/HarvestsPanel";
import ExpensesPanel from "./features/expenses/components/ExpensesPanel";
import PartnersPanel from "./features/partners/components/PartnersPanel";
import CustomersPanel from "./features/customers/components/CustomersPanel";
import SuppliersPanel from "./features/suppliers/components/SuppliersPanel";
import EditSupplier from "./features/suppliers/components/EditSupplier";
import UsersPanel from "./features/users/components/UsersPanel";
import ProfilePanel from "./features/users/components/ProfilePanel";
import LoginPanel from "./features/auth/components/LoginPanel";
import ProductsPanel from "./features/products/components/ProductsPanel";
import DashboardLayout from "./shared/dashboard/layouts/DashboardLayout";

export default function router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />} >
                    <Route index={true} element={<LoginPanel />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />} >
                        <Route path="/dashboard" element={<SalesPanel />} />
                        <Route path="/dashboard/orchards" element={<OrchardsPanel />} />
                        <Route path="/dashboard/products" element={<ProductsPanel />} />
                        <Route path="/dashboard/sales" element={<SalesPanel />} />
                        <Route path="/dashboard/harvests" element={<HarvestsPanel />} />
                        <Route path="/dashboard/expenses" element={<ExpensesPanel />} />
                        <Route path="/dashboard/agrochemicals" element={<AgrochemicalsPanel />} />
                        <Route path="/dashboard/partners" element={<PartnersPanel />} />
                        <Route path="/dashboard/customers" element={<CustomersPanel />} />
                        <Route path="/dashboard/suppliers" element={<SuppliersPanel />} />
                        <Route path="/dashboard/suppliers/:supplierId/edit" element={<EditSupplier />} />
                        <Route path="/dashboard/users" element={<UsersPanel />} />
                        <Route path="/dashboard/profile" element={<ProfilePanel />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
};