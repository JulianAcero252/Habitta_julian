import "./Legal.css";

const PrivacyPage = () => {
  return (
    <div className="legal-container">
      <h1>Política de Privacidad y Tratamiento de Datos</h1>
      <p className="last-updated">Última actualización: 25 de marzo de 2026</p>

      <section>
        <h2>1. NUESTRO COMPROMISO</h2>
        <p>
          En <strong>Habitta</strong>, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe cómo recogemos, usamos, compartimos y protegemos su información personal conforme a la Ley 1581 de 2012 (Habeas Data) en Colombia.
        </p>
      </section>

      <section>
        <h2>2. DATOS QUE RECOLECTAMOS</h2>
        <p>
          Recogemos información cuando se registra en el sitio, inicia sesión, publica un inmueble o se comunica con nosotros:
        </p>
        <ul>
          <li><strong>Información de Registro:</strong> Nombre, correo electrónico, número de teléfono.</li>
          <li><strong>Información de Perfil:</strong> Foto, ubicación (si se proporciona de forma voluntaria).</li>
          <li><strong>Información de Navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas (cookies).</li>
          <li><strong>Información Financiera:</strong> Procesamos pagos a través de proveedores especializados sin almacenar datos de tarjetas de crédito directamente en nuestros servidores locales.</li>
        </ul>
      </section>

      <section>
        <h2>3. FINALIDAD DEL TRATAMIENTO</h2>
        <p>
          Sus datos se utilizan para:
        </p>
        <ul>
          <li>Gestionar su cuenta y brindarle acceso a los servicios del Portal.</li>
          <li>Facilitar la comunicación entre Anunciantes e interesados en inmuebles.</li>
          <li>Enviar notificaciones relevantes sobre el estado de sus publicaciones o avisos de interés.</li>
          <li>Mejorar la experiencia del usuario y optimizar la plataforma.</li>
          <li>Cumplir con requerimientos legales o regulatorios.</li>
        </ul>
      </section>

      <section>
        <h2>4. DERECHOS DEL TITULAR</h2>
        <p>
          Conforme a la ley, usted tiene derecho a:
        </p>
        <ul>
          <li><strong>Conocer:</strong> Saber qué datos tenemos y cómo los usamos.</li>
          <li><strong>Actualizar:</strong> Cambiar información incorrecta o desactualizada.</li>
          <li><strong>Rectificar:</strong> Corregir errores en su perfil.</li>
          <li><strong>Suprimir:</strong> Solicitar la eliminación de sus datos cuando no exista una obligación legal de conservarlos.</li>
          <li><strong>Revocar:</strong> Retirar el consentimiento para el tratamiento de datos.</li>
        </ul>
      </section>

      <section>
        <h2>5. SEGURIDAD DE LA INFORMACIÓN</h2>
        <p>
          Implementamos medidas técnicas, administrativas y humanas razonables para proteger sus datos contra el acceso no autorizado, el uso indebido o la pérdida accidental. No obstante, ningún sistema es infalible por completo en entornos digitales.
        </p>
      </section>

      <section>
        <h2>6. POLÍTICA DE COOKIES</h2>
        <p>
          Utilizamos cookies para personalizar su experiencia y analizar el tráfico. Al navegar en Habitta, usted acepta el uso de estas herramientas. Puede gestionar o desactivar las cookies desde la configuración de su navegador en cualquier momento.
        </p>
      </section>

      <section>
        <h2>7. CONTACTO</h2>
        <p>
          Para ejercer sus derechos de Habeas Data o realizar consultas sobre esta política, puede escribirnos a: <strong>soporte@habitta.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
