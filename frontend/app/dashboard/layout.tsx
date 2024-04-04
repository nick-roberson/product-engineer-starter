import { DashboardProvider } from "@/context/dashboard-context";

export default function PriorAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardProvider>
            <div>{children}</div>
        </DashboardProvider>
    );
}
