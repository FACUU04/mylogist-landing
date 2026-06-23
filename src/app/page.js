'use client';

import React, { useState, useEffect } from 'react';

// --- COMPONENTE DEL MODAL (Ventana Flotante) ---
const ContactModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');

    const formData = new FormData(e.target);
    
    // Inyectamos la clave pública de Web3Forms desde tu archivo .env.local
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
    formData.append("subject", `🚀 Nuevo interesado en MyLogist de la empresa: ${formData.get('company')}`);
    formData.append("redirect", ""); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('exito');
        e.target.reset();
      } else {
        console.error("Error de Web3Forms:", data);
        setStatus('error');
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Comenzá tu prueba</h3>
        
        {status === 'exito' ? (
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center mt-6">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h4 className="text-xl font-bold text-green-800 mb-2">¡Solicitud enviada!</h4>
            <p className="text-green-700">Nos pondremos en contacto al mail ingresado para habilitar tu cuenta.</p>
            <button onClick={() => { onClose(); setStatus(''); }} className="mt-6 font-semibold text-green-700 hover:text-green-800">Cerrar ventana</button>
          </div>
        ) : (
          <>
            <p className="text-slate-500 mb-6">Dejanos tus datos y configuraremos tu entorno en MyLogist.</p>
            {status === 'error' && (
              <p className="text-red-600 text-sm mb-4">Hubo un error al enviar. Por favor, intentá de nuevo.</p>
            )}
           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                  placeholder="Ej: Juan Pérez" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de tu negocio</label>
                <input 
                  type="text" 
                  name="company" 
                  required 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                  placeholder="Ej: Distribuidora Sur" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contacto (Correo o Teléfono)</label>
                <input 
                  type="text" 
                  name="contact" 
                  required 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                  placeholder="Ej: juan@mail.com o 11-5544-3322" 
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'enviando'}
                className="mt-4 w-full bg-orange-500 text-white font-bold py-3.5 px-6 rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 disabled:opacity-50"
              >
                {status === 'enviando' ? 'Enviando solicitud...' : 'Solicitar mi cuenta'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};


// --- PÁGINA PRINCIPAL ---
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      
      {/* Acá renderizamos el modal y le pasamos el estado */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* NAVBAR */}
      <nav className={`w-full fixed top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My<span className="text-orange-500">Logist</span>
          </div>
          <div className="hidden sm:flex gap-8 items-center">
            <a href="https://app.mylogist.com/login" className="text-slate-600 hover:text-blue-600 font-medium transition">Ingresar</a>
            {/* Este botón abre el modal */}
            <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-7 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
              Probar Gratis
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-5xl leading-tight">
            El control de tu inventario, <br className="hidden sm:block" />
            <span className="text-blue-600">más inteligente y en tiempo real.</span>
          </h1>
          <p className="mt-8 text-xl text-slate-500 max-w-3xl leading-relaxed">
            Una plataforma diseñada para brindarte métricas de impacto y una gestión impecable. Optimizá tus procesos y tomá decisiones basadas en datos seguros.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            {/* Este botón abre el modal */}
            <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-xl shadow-orange-500/20 w-full sm:w-auto">
              Comenzar mi prueba
            </button>
            <a href="#caracteristicas" className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition w-full sm:w-auto flex items-center justify-center">
              Conocer la plataforma
            </a>
          </div>
        </div>
      </section>

      {/* MOCKUP SHOWCASE */}
      <section className="w-full bg-slate-900 relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Visualizá el control total</h2>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">Una interfaz diseñada para que no pierdas de vista ningún detalle de tu operación diaria.</p>
          </div>
          <div className="relative max-w-5xl mx-auto rounded-2xl p-2 bg-gradient-to-b from-slate-700 to-slate-800 shadow-2xl shadow-blue-900/50 transform hover:scale-[1.02] transition duration-500">
            <div className="w-full h-8 bg-slate-800 rounded-t-xl flex items-center px-4 gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="aspect-video bg-slate-900 rounded-b-xl overflow-hidden relative flex items-center justify-center border border-slate-700">
              <span className="text-slate-500 font-medium">Acá va la screenshot de app.mylogist.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="caracteristicas" className="w-full bg-white py-20 lg:py-32 scroll-mt-24">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">Potenciá tu gestión logística</h2>
            <div className="h-1.5 w-24 bg-orange-500 mx-auto mt-8 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Datos en Tiempo Real</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Tu stock actualizado al instante. Evitá quiebres de inventario y mantené la sincronización perfecta de tus productos en todo momento.</p>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-orange-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Interfaz Profesional</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Diseño intuitivo y limpio. Navegá por tus módulos de gestión sin fricciones, pensado para maximizar la productividad de tu equipo.</p>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Métricas de Impacto</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Visualizá el rendimiento de tu negocio. Reportes claros y precisos para que tomes las mejores decisiones logísticas y financieras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOUBLE COLUMN SECTION */}
      <section className="w-full bg-slate-50 py-20 lg:py-32 overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">Dejá atrás las planillas <br /><span className="text-orange-500">y los errores manuales.</span></h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">Centralizá la información de tus productos, gestioná proveedores y controlá las entradas y salidas de mercadería desde un único panel. MyLogist está diseñado para que encuentres lo que buscás en segundos.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Búsqueda y filtrado avanzado.</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Historial detallado de movimientos.</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Alertas por stock bajo.</span>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex items-center justify-center">
                <span className="text-slate-400">Captura de la tabla de stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="w-full bg-blue-600 py-24">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-8">¿Listo para ordenar tu negocio?</h2>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">Unite a las empresas que ya están optimizando su inventario. Empezá hoy mismo tu prueba.</p>
          {/* Este botón abre el modal */}
          <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-orange-400 transition shadow-2xl shadow-orange-500/50">
            Crear mi cuenta gratis
          </button>
        </div>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
      <footer className="w-full bg-slate-900 py-12 border-t border-slate-800">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-extrabold text-white tracking-tight">
            My<span className="text-orange-500">Logist</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <a href="/terminos" className="hover:text-white transition">Términos y Condiciones</a>
            <a href="/privacidad" className="hover:text-white transition">Políticas de Privacidad</a>
            {/* El link mailto abre el correo directo */}
            <a href="mailto:contactomylogist@gmail.com" className="hover:text-white transition">Contacto</a>
          </div>
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} MyLogist. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}


//MyLogist_26@sosa