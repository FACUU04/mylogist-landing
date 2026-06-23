import React from 'react';

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Políticas de Privacidad</h1>
        <p className="text-slate-600 mb-8">
          Última actualización: {new Date().toLocaleDateString('es-AR')}
        </p>
        
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Recopilación y uso de la información</h2>
            <p>
              En MyLogist valoramos su confianza y nos tomamos muy en serio la privacidad de los datos de su empresa. 
              Recopilamos únicamente la información necesaria para brindarle nuestro servicio de gestión de inventarios y logística. 
              Esto incluye datos de contacto básicos (nombre, correo electrónico, teléfono o nombre del negocio) al momento de solicitar una prueba, 
              y la información operativa que usted decida cargar en la plataforma.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Protección y almacenamiento de datos</h2>
            <p>
              Toda la información alojada en nuestra plataforma se encuentra respaldada por infraestructura segura en la nube (AWS), 
              protegida bajo estrictos estándares de seguridad y encriptación. Sus datos de stock, movimientos y proveedores son de 
              su exclusiva propiedad.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">3. No divulgación a terceros</h2>
            <p>
              MyLogist no comparte, vende, alquila ni comercializa la base de datos de su inventario, ni su información de 
              contacto a terceros bajo ninguna circunstancia. Sus datos se utilizan exclusivamente para garantizar el correcto 
              funcionamiento del sistema y enviarle notificaciones relevantes sobre su cuenta.
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