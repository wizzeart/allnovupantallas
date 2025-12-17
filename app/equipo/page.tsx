import { EquipoComponent } from "@/components/quienesSomos/quienesSomos";
export const runtime = 'edge';

export default function EquipoPage() {
    return (
        <div className="dark:bg-background-dark bg-white font-display text-gray-800 dark:text-gray-200">
            <EquipoComponent />
        </div>
    )
}
