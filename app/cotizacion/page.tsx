import CotizacionForm from "@/app/components/CotizacionForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const params = await searchParams;

  return <CotizacionForm tipoInicial={params.tipo} />;
}