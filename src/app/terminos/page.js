import React from 'react';

export default function Terminos() {
  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Términos y Condiciones</h1>
        <p className="text-slate-600 mb-8">
          Última actualización: {new Date().toLocaleDateString('es-AR')}
        </p>
        
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Aceptación y Uso del Servicio</h2>
            <p>
              Al acceder y utilizar MyLogist, usted acepta estar sujeto a los presentes Términos y Condiciones. 
              Nuestra plataforma se proporciona como una herramienta de software como servicio (SaaS) diseñada 
              para facilitar la gestión de inventarios, stock y logística. El uso de la plataforma debe ser 
              estrictamente para fines comerciales lícitos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Creación de Cuentas y Seguridad</h2>
            <p>
              El acceso a la plataforma se realiza mediante cuentas habilitadas por nuestro equipo. Usted es 
              responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades 
              que ocurran bajo su cuenta. MyLogist no será responsable por pérdidas o daños derivados del 
              incumplimiento de esta obligación de seguridad.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Disponibilidad del Sistema</h2>
            <p>
              Nos esforzamos por garantizar una alta disponibilidad de la plataforma operando sobre infraestructura 
              en la nube. Sin embargo, no garantizamos que el servicio será ininterrumpido o libre de errores en 
              todo momento. MyLogist se reserva el derecho de realizar mantenimientos programados que podrían 
              limitar temporalmente el acceso.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Limitación de Responsabilidad</h2>
            <p>
              MyLogist funciona como un facilitador de información tecnológica. En ningún caso seremos responsables 
              por lucro cesante, pérdida de ventas, interrupción del negocio o discrepancias en el inventario físico 
              vs. el inventario digital cargado por el usuario. La precisión de los datos ingresados es exclusiva 
              responsabilidad del cliente.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Propiedad Intelectual</h2>
            <p>
              Todo el código, diseño, logotipos y arquitectura tecnológica de la plataforma son propiedad exclusiva 
              de MyLogist. Se otorga al usuario una licencia limitada, no exclusiva y no transferible para utilizar 
              el software, sin otorgar derechos de propiedad sobre el mismo.
            </p>
          </div>

        </div>

        <a href="/" className="inline-flex items-center gap-2 mt-10 text-blue-600 hover:text-blue-800 font-medium transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Volver al inicio
        </a>
      </div>
    </main>
  );
}