'use client';

import React, { useState, useEffect } from 'react';

// --- COMPONENTE DEL MODAL (Contacto / Consultas) ---
const ContactModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');

    const formData = new FormData(e.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");
    formData.append("subject", `🚀 Consulta desde MyLogist - Empresa: ${formData.get('company')}`);

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
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">¿Tenés alguna duda?</h3>
        
        {status === 'exito' ? (
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center mt-6">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h4 className="text-xl font-bold text-green-800 mb-2">¡Mensaje recibido!</h4>
            <p className="text-green-700 text-sm">Te responderemos a la brevedad al correo ingresado.</p>
            <button onClick={() => { onClose(); setStatus(''); }} className="mt-6 font-semibold text-green-700 hover:text-green-800">Cerrar ventana</button>
          </div>
        ) : (
          <>
            <p className="text-slate-500 mb-6 text-sm">Escribinos y nuestro equipo te asesorará en la configuración de tu cuenta.</p>

            {status === 'error' && (
              <p className="text-red-600 text-sm mb-4">Ocurrió un error. Intentá de nuevo o escríbenos directamente a contactomylogist@gmail.com</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo <span className="text-orange-500">*</span></label>
                <input type="text" name="name" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" placeholder="Ej: Carlos Rossi" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de tu negocio <span className="text-orange-500">*</span></label>
                <input type="text" name="company" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" placeholder="Ej: Comercial del Sur" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico <span className="text-orange-500">*</span></label>
                <input type="email" name="email" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" placeholder="carlos@ejemplo.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Consulta <span className="text-orange-500">*</span></label>
                <textarea name="message" required rows="3" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" placeholder="¿En qué te podemos ayudar?"></textarea>
              </div>

              <button type="submit" disabled={status === 'enviando'} className="mt-2 w-full bg-orange-500 text-white font-bold py-3.5 px-6 rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 disabled:opacity-50">
                {status === 'enviando' ? 'Enviando...' : 'Enviar consulta'}
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

  const APP_URL = "https://mylogistapp.com/login";

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
      <nav className={`w-full fixed top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My<span className="text-orange-500">Logist</span>
          </div>
          <div className="hidden sm:flex gap-6 items-center">
            <button onClick={() => setIsModalOpen(true)} className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm">
              Soporte
            </button>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-orange-500 font-bold transition text-sm">
              Ingresar
            </a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-500/25">
              Prueba Gratis 14 Días
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center relative z-10">
          
          {/* BADGE DESTACADO */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-orange-700 font-bold text-xs sm:text-sm mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            Puesta en marcha en solo 2 minutos • Sin tarjeta de crédito
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-5xl leading-tight sm:leading-none">
            Gestión de inventario <br className="hidden sm:block" />
            <span className="text-blue-600">inteligente y en tiempo real.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
            Controlá tu stock, registrá ventas con la cámara del celular y tomá decisiones gerenciales asistidas por Inteligencia Artificial. Todo sin instalaciones complejas.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="bg-orange-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-xl shadow-orange-500/20 w-full sm:w-auto text-center">
              Comenzar prueba gratis de 14 días
            </a>
            <a href="#caracteristicas" className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition w-full sm:w-auto flex items-center justify-center">
              Ver características
            </a>
          </div>

          {/* BENEFICIOS RÁPIDOS */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-500 text-xs sm:text-sm font-semibold">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
              14 días 100% gratis
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
              Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
              Suscripción mensual flexible
            </span>
          </div>
        </div>
      </section>

      {/* BANNER DE CONFIANZA */}
      <section className="w-full bg-white border-y border-slate-200/60 py-8">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-slate-600 font-semibold text-sm md:text-base">
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Puesta en marcha en 2 min
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              Escáner por cámara integrado
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-2a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              Analista Gerencial con IA
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE / DASHBOARD PREVIEW (CORREGIDO SIN CORTE/ZOOM) */}
      <section className="w-full bg-slate-900 relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Visualizá el control total de tu negocio</h2>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">Métricas claras, ventas diarias y control de existencias en una pantalla limpia y sin fricciones.</p>
          </div>
          <div className="relative max-w-5xl mx-auto rounded-2xl p-2 bg-gradient-to-b from-slate-700 to-slate-800 shadow-2xl shadow-blue-900/50">
            <div className="w-full h-8 bg-slate-800 rounded-t-xl flex items-center px-4 gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="bg-slate-900 rounded-b-xl overflow-hidden relative border border-slate-700">
              <img 
                src="/MyLogist1.png" 
                alt="Dashboard Principal MyLogist" 
                className="w-full h-auto block rounded-b-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="caracteristicas" className="w-full bg-white py-20 lg:py-28 scroll-mt-24">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">Diseñado para la máxima eficiencia</h2>
            <div className="h-1.5 w-20 bg-orange-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* CARD 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-orange-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Puesta en Marcha Inmediata</h3>
              <p className="text-slate-600 leading-relaxed text-base">Creás tu cuenta en segundos y accedés al tutorial interactivo de 2 minutos. Carga masiva por Excel o registro directo.</p>
            </div>

            {/* CARD 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Escáner Móvil de Código de Barras</h3>
              <p className="text-slate-600 leading-relaxed text-base">Convertí la cámara de cualquier celular en una lectora de códigos. Registrá compras o armá carritos de venta al instante.</p>
            </div>

            {/* CARD 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-indigo-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-2a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Asistente Inteligente IA</h3>
              <p className="text-slate-600 leading-relaxed text-base">Reportes gerenciales automáticos: detectá artículos estancados, proyectá compras críticas y conocé tus productos más vendidos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DETALLE 1: CONTROL DE CAJA Y TURNOS */}
      <section className="w-full bg-slate-50 py-20 lg:py-28 overflow-hidden border-t border-slate-200/50">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                Control de caja y <br />
                <span className="text-orange-500">gestión de turnos diaria.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Apertura y cierre de turnos con fondos iniciales configurables. Evitá descuadres al final de la jornada y mantené un registro exacto de las operaciones realizadas por cada cajero.
              </p>
              <ul className="space-y-4 font-medium text-slate-700">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Arqueo automático de ingresos y egresos de efectivo.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Comprobantes imprimibles y registro detallado de cierres.
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden p-2">
                <img 
                  src="/MyLogistturnos.png" 
                  alt="Control de Turnos en MyLogist" 
                  className="w-full h-auto block rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETALLE 2: MULTIPLATAFORMA */}
      <section className="w-full bg-white py-20 lg:py-28 overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm mb-6">
            Multiplataforma 100% en la Nube
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Usalo desde cualquier dispositivo, <br className="hidden sm:block" />
            <span className="text-blue-600">siempre sincronizado.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed">
            Sin descargas ni instalaciones pesadas. Ingresá desde tu computadora de escritorio, tablet en el mostrador o smartphone recorriendo el depósito.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Computadora</h3>
              <p className="text-slate-600 text-sm">Administración central, reportes contables, métricas y configuración de parámetros.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-orange-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tablet</h3>
              <p className="text-slate-600 text-sm">Ideal para punto de venta rápido en mostrador y gestión directa de clientes.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Celular</h3>
              <p className="text-slate-600 text-sm">Usa la cámara como escáner de códigos de barras para altas y ventas al instante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANES / SUSCRIPCIÓN */}
      <section className="w-full bg-slate-900 py-20 lg:py-28 text-white relative">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">Comenzá hoy mismo sin riesgos</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">Probad el sistema completo durante 14 días. Luego, mantené tu cuenta activa con una suscripción mensual simple.</p>

          <div className="max-w-md mx-auto bg-slate-800/80 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-bl-xl tracking-wider">
              14 Días Gratis
            </div>

            <h3 className="text-2xl font-bold text-white text-left">Plan Profesional MyLogist</h3>
            <p className="text-slate-400 text-sm text-left mt-1">Acceso total a todas las herramientas del sistema.</p>

            <div className="my-8 text-left border-y border-slate-700 py-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">14 días</span>
                <span className="text-orange-400 font-bold">$0 COSTO</span>
              </div>
              <p className="text-slate-400 text-xs mt-2">Luego, suscripción mensual transparente y cancelable en cualquier momento.</p>
            </div>

            <ul className="space-y-3 text-left text-slate-300 text-sm mb-8">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Escáner de código de barras por cámara ilimitado
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Asistente Gerencial con IA y reportes automáticos
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Gestión multi-usuario con roles de colaboradores
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Control de caja, turnos y arqueos diarios
              </li>
            </ul>

            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 text-white font-bold py-4 rounded-xl text-center hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
              Crear mi cuenta gratis ahora
            </a>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="w-full bg-blue-600 py-20">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">¿Listo para optimizar tu inventario?</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">Tu prueba gratuita de 14 días te espera. Comienza en menos de 2 minutos.</p>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-orange-400 transition shadow-2xl shadow-orange-500/40">
            Comenzar prueba gratis
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-slate-900 py-12 border-t border-slate-800">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-extrabold text-white tracking-tight">
            My<span className="text-orange-500">Logist</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm font-medium">
            <button onClick={() => setIsModalOpen(true)} className="hover:text-white transition">Soporte Técnico</button>
            <a href="mailto:contactomylogist@gmail.com" className="hover:text-white transition">Contacto</a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Acceso Usuarios</a>
          </div>
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} MyLogist. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}