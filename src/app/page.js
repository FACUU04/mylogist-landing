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

        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Comenzá tus 14 días gratis</h3>
        
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
            <p className="text-slate-500 mb-4">Dejanos tus datos y configuraremos tu entorno en MyLogist en minutos.</p>
            
            <div className="flex flex-col gap-2 mb-6 text-sm text-slate-600 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Sin tarjeta de crédito requerida.
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Promoción exclusiva de $20.000/mes tras la prueba.
              </div>
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm mb-4">Hubo un error al enviar. Por favor, intentá de nuevo.</p>
            )}
            
            <p className="text-slate-500 mb-4 text-sm">
  Dejanos tus datos para configurar tu entorno. Todos los campos son obligatorios (*).
</p>

<form onSubmit={handleSubmit} className="flex flex-col gap-4">
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Nombre completo <span className="text-orange-500">*</span>
    </label>
    <input 
      type="text" 
      name="name" 
      required 
      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
      placeholder="Ej: Juan Pérez" 
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Nombre de tu negocio <span className="text-orange-500">*</span>
    </label>
    <input 
      type="text" 
      name="company" 
      required 
      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
      placeholder="Ej: Distribuidora Sur" 
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Correo electrónico <span className="text-orange-500">*</span>
    </label>
    <input 
      type="email" 
      name="email" 
      required 
      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
      placeholder="juan@ejemplo.com" 
    />
  </div>

  <button 
    type="submit" 
    disabled={status === 'enviando'}
    className="mt-2 w-full bg-orange-500 text-white font-bold py-3.5 px-6 rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 disabled:opacity-50"
  >
    {status === 'enviando' ? 'Enviando solicitud...' : 'Solicitar mi cuenta gratis'}
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
      
      <style>{`
        @keyframes scan {
          0%, 100% { top: 20%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 80%; }
        }
        .animate-scan {
          animation: scan 2.5s ease-in-out infinite;
        }
      `}</style>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* NAVBAR */}
      <nav className={`w-full fixed top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My<span className="text-orange-500">Logist</span>
          </div>
          <div className="hidden sm:flex gap-8 items-center">
            <a href="https://mylogistapp.com/login" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-500 font-semibold transition">Ingresar a mi cuenta</a>
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
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <div className="w-full sm:w-auto flex flex-col items-center">
              <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-xl shadow-orange-500/20 w-full sm:w-auto">
                Probar 14 días gratis
              </button>
              <span className="mt-2 text-sm text-slate-500 font-medium">No requiere tarjeta de crédito</span>
            </div>
            <a href="#caracteristicas" className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition w-full sm:w-auto flex items-center justify-center">
              Conocer la plataforma
            </a>
          </div>
        </div>
      </section>

      {/* BANNER DE CONFIANZA (Reemplaza logos de clientes) */}
      <section className="w-full bg-white border-y border-slate-200/60 py-8">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-slate-500 font-medium text-sm md:text-base">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Soporte técnico directo
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Sincronización en tiempo real
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
              Backup seguro en la nube
            </div>
          </div>
        </div>
      </section>

      {/* MOCKUP SHOWCASE PRINCIPAL (Dashboard General) */}
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
            
            <div className="aspect-video bg-slate-900 rounded-b-xl overflow-hidden relative border border-slate-700 flex items-center justify-center">
              <img 
                src="/MyLogist1.png" 
                alt="Dashboard de MyLogist" 
                className="w-full h-full object-cover object-top"
              />
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

      {/* BLOQUE 1: CONTROL DE CAJA Y TURNOS */}
      <section className="w-full bg-slate-50 py-20 lg:py-32 overflow-hidden border-t border-slate-200/50">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">Control de caja y <br /><span className="text-orange-500">gestión de turnos.</span></h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">Olvidate de los descuadres a fin del día. Iniciá cada jornada con un fondo de caja definido, controlá las operaciones y mantené un registro exacto de las ventas de cada turno.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Apertura y cierre de turnos seguros.</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Historial detallado de operaciones de caja.</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Prevención de errores humanos y faltantes.</span>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative flex items-center justify-center">
                <img 
                  src="/MyLogistturnos.png" 
                  alt="Apertura de turno en MyLogist" 
                  className="w-full h-full object-cover p-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 2: CÁMARA COMO ESCÁNER */}
      <section className="w-full bg-white py-20 lg:py-32 overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-slate-50 rounded-[3rem] border border-slate-100 shadow-2xl shadow-blue-900/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-transparent"></div>
                <div className="relative z-10 p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10v4c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4v-4M3 10V6c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v4M3 10h18M8 14h8"></path>
                  </svg>
                </div>
                <div className="absolute left-1/4 right-1/4 h-1 bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20 rounded-full animate-scan"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">Tu celular es tu <br /><span className="text-blue-600">mejor herramienta.</span></h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">No necesitás invertir en hardware costoso. MyLogist transforma la cámara de tu smartphone en un escáner profesional. Leé códigos de barras y códigos QR para ingresar o descontar mercadería en instantes.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Lectura ultra rápida sin demoras.</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Sincronización directa con tu base de datos.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE NUEVO: GESTIÓN MULTI-USUARIO E HISTORIAL DE MOVIMIENTOS */}
      <section className="w-full bg-slate-50 py-20 lg:py-32 overflow-hidden border-t border-slate-200/50">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                Control y Seguridad
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">Trabajá en equipo y <br /><span className="text-orange-500">sabelo todo.</span></h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">Asigná accesos a tus colaboradores manteniendo el orden. Con el historial detallado de movimientos, vas a saber exactamente qué pasó con cada cosa, quién la registró y en qué momento.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Usuarios múltiples con roles definidos.</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Registro de auditoría: quién hizo cada acción y cuándo.</span>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <span className="font-bold text-slate-800">Historial de Movimientos</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">En tiempo real</span>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-slate-800">Venta de Mercadería</p>
                      <p className="text-slate-500 text-xs">Usuario: alvaro</p>
                    </div>
                    <span className="text-orange-600 font-bold">-$115.000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-slate-800">Orden de Compra</p>
                      <p className="text-slate-500 text-xs">Proveedor: ElectroVolt</p>
                    </div>
                    <span className="text-green-600 font-bold">Recibido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 3: ASISTENTE IA (CON EL MOCKUP DEL CELU) */}
      <section className="w-full bg-white py-20 lg:py-32 overflow-hidden border-t border-slate-200/50">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Nuevo Módulo Inteligente
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">Tomá decisiones con <br /><span className="text-indigo-600">Asistente de IA.</span></h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">El Asistente de IA integrado procesa los datos de tu inventario en tiempo real. Obtén sugerencias de compras, detecta capital inmovilizado y descubre cuáles son tus productos estrella al instante.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Análisis de stock crítico y reposición.</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-slate-700 font-medium">Reportes gerenciales claros y directos.</span>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              <img 
                src="/mockup_celular.png" 
                alt="Mockup del Asistente IA en el celular" 
                className="relative z-10 max-h-[600px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE NUEVO: ÚSALO DONDE QUIERAS (MULTIPLATAFORMA) */}
      <section className="w-full bg-white py-20 lg:py-32 overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            100% Multiplataforma
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Úsalo donde quieras, <br className="hidden sm:block" />
            <span className="text-blue-600">siempre sincronizado.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed">
            No importa si estás en la compu de tu escritorio, usando una tablet o desde el celular recorriendo el depósito. Tus datos viajan con vos en tiempo real.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tarjeta Compu */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Computadora</h3>
              <p className="text-slate-600 text-sm">Ideal para la administración completa, métricas y reportes gerenciales en pantalla grande.</p>
            </div>

            {/* Tarjeta Tablet */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-orange-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tablet</h3>
              <p className="text-slate-600 text-sm">Perfecta para mostrar en el counter, registrar operaciones rápidas o validar pedidos al vuelo.</p>
            </div>

            {/* Tarjeta Celular */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Celular</h3>
              <p className="text-slate-600 text-sm">Llevá el control en tu bolsillo y transformá la cámara en un escáner de códigos de barras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="w-full bg-blue-600 py-24">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">¿Listo para ordenar tu negocio?</h2>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">Comienza tus 14 días gratis hoy mismo sin tarjeta de crédito.</p>
          <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-orange-400 transition shadow-2xl shadow-orange-500/50">
            Crear mi cuenta gratis
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-slate-900 py-12 border-t border-slate-800">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-extrabold text-white tracking-tight">
            My<span className="text-orange-500">Logist</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <a href="/terminos" className="hover:text-white transition">Términos y Condiciones</a>
            <a href="/privacidad" className="hover:text-white transition">Políticas de Privacidad</a>
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