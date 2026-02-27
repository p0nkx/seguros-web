import CotizacionForm from "@/app/components/CotizacionForm";


export default async function Page({
  searchParams,
}: {
  
  searchParams: Promise<{ tipo?: string; subtipo?: string }>; 
}) {
  const params = await searchParams;

  return (
    <CotizacionForm 
      tipoInicial={params.tipo} 
      // Le pasamos al formulario el valor de "subtipo"
      coberturaInicial={params.subtipo ? decodeURIComponent(params.subtipo) : undefined} 
    />
  );
}