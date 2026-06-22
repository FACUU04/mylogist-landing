'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para detectar el scroll y cambiar el Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      
      {/* NAVBAR (Fijo con efecto Liquid Glass) */}
      <nav 
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My<span className="text-orange-500">Logist</span>
          </div>
          <div className="hidden sm:flex gap-8 items-center">
            <button className="text-slate-600 hover:text-blue-600 font-medium transition">Ingresar</button>
            <button className="bg-orange-500 text-white px-7 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
              Probar Gratis
            </button>
          </div>
          {/* Menú móvil */}
          <div className="sm:hidden text-slate-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
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
            <button className="bg-orange-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-xl shadow-orange-500/20 w-full sm:w-auto">
              Comenzar mi prueba
            </button>
            <button className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition w-full sm:w-auto">
              Conocer la plataforma
            </button>
          </div>
        </div>
      </section>

      {/* MOCKUP SHOWCASE (Imagen gigante con fondo azul oscuro/naranja) */}
      <section className="w-full bg-slate-900 relative py-20 lg:py-32 overflow-hidden mt-10">
        {/* Efecto de luz naranja de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Visualizá el control total</h2>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">Una interfaz diseñada para que no pierdas de vista ningún detalle de tu operación diaria.</p>
          </div>

          {/* Contenedor del Mockup */}
          <div className="relative max-w-5xl mx-auto rounded-2xl p-2 bg-gradient-to-b from-slate-700 to-slate-800 shadow-2xl shadow-blue-900/50 transform hover:scale-[1.02] transition duration-500">
            {/* Cabecera falsa del navegador */}
            <div className="w-full h-8 bg-slate-800 rounded-t-xl flex items-center px-4 gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            {/* Imagen del dashboard. Acá deberías poner la ruta real de tu imagen */}
            <div className="aspect-video bg-slate-900 rounded-b-xl overflow-hidden relative flex items-center justify-center border border-slate-700">
              <span className="text-slate-500 font-medium">Acá va la screenshot de app.mylogist.com</span>
              {/* Ejemplo de cómo poner tu imagen: */}
              {/* <img src="/mockup-dashboard.webp" alt="Dashboard MyLogist" className="w-full h-full object-cover" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="w-full bg-white py-20 lg:py-32">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">Potenciá tu gestión logística</h2>
            <div className="h-1.5 w-24 bg-orange-500 mx-auto mt-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Feature 1: Datos en tiempo real */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Datos en Tiempo Real</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Tu stock actualizado al instante. Evitá quiebres de inventario y mantené la sincronización perfecta de tus productos en todo momento.
              </p>
            </div>

            {/* Feature 2: Interfaz limpia y profesional */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-orange-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Interfaz Profesional</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Diseño intuitivo y limpio. Navegá por tus módulos de gestión sin fricciones, pensado para maximizar la productividad de tu equipo.
              </p>
            </div>

            {/* Feature 3: Métricas de impacto */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Métricas de Impacto</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Visualizá el rendimiento de tu negocio. Reportes claros y precisos para que tomes las mejores decisiones logísticas y financieras.
              </p>
            </div>

          </div>
        </div>
      </section>


{/* SECCIÓN DOBLE COLUMNA: Profundidad de producto */}
      <section className="w-full bg-slate-50 py-20 lg:py-32 overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Texto */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                Dejá atrás las planillas <br />
                <span className="text-orange-500">y los errores manuales.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Centralizá la información de tus productos, gestioná proveedores y controlá las entradas y salidas de mercadería desde un único panel. MyLogist está diseñado para que encuentres lo que buscás en segundos.
              </p>
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
            {/* Imagen/Gráfico */}
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex items-center justify-center">
                {/* Acá va otra captura más específica, ej: la tabla de inventario */}
                <span className="text-slate-400">Captura de la tabla de stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="w-full bg-blue-600 py-24">
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-8">
            ¿Listo para ordenar tu negocio?
          </h2>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
            Unite a las empresas que ya están optimizando su inventario. Empezá hoy mismo tu prueba gratuita.
          </p>
          <button className="bg-orange-500 text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-orange-400 transition shadow-2xl shadow-orange-500/50">
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
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition">Políticas de Privacidad</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} MyLogist. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}