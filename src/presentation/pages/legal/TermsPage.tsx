import "./Legal.css";

const TermsPage = () => {
  return (
    <div className="legal-container">
      <h1>Términos y Condiciones de Uso</h1>
      <p className="last-updated">Última actualización: 25 de marzo de 2026</p>

      <section>
        <h2>1. INFORMACIÓN GENERAL</h2>
        <p>
          Bienvenido a <strong>Habitta</strong>, una plataforma web diseñada para la gestión y publicación de anuncios inmobiliarios en Colombia. Al acceder o utilizar nuestro sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.
        </p>
      </section>

      <section>
        <h2>2. DEFINICIONES</h2>
        <ul>
          <li><strong>Portal:</strong> Se refiere a la plataforma Habitta, sus herramientas y servicios.</li>
          <li><strong>Usuario:</strong> Cualquier persona natural o jurídica que acceda al Portal, ya sea para buscar propiedades o para publicarlas.</li>
          <li><strong>Anunciante:</strong> Usuario que utiliza el Portal para publicar ofertas de venta, arriendo o permuta de inmuebles.</li>
          <li><strong>Servicios:</strong> Incluye la publicación de anuncios, herramientas de búsqueda, perfiles de usuario y planes de promoción.</li>
        </ul>
      </section>

      <section>
        <h2>3. ACEPTACIÓN DE LOS TÉRMINOS</h2>
        <p>
          El uso del Portal implica la aceptación plena de estos términos. Si no está de acuerdo con alguna de las disposiciones aquí contenidas, deberá abstenerse de utilizar los servicios de Habitta. Nos reservamos el derecho de modificar estos términos en cualquier momento.
        </p>
      </section>

      <section>
        <h2>4. REGISTRO Y SEGURIDAD</h2>
        <p>
          Para acceder a ciertas funcionalidades, como la publicación de inmuebles o la gestión de favoritos, el Usuario debe registrarse. El Usuario es responsable de mantener la confidencialidad de sus credenciales y de toda actividad realizada bajo su cuenta.
        </p>
      </section>

      <section>
        <h2>5. CONDICIONES DE PUBLICACIÓN</h2>
        <p>
          Los Anunciantes se comprometen a:
        </p>
        <ul>
          <li>Proporcionar información veraz, exacta y actualizada sobre los inmuebles.</li>
          <li>Contar con la autorización legal para ofrecer la propiedad.</li>
          <li>No publicar contenido ofensivo, discriminatorio, fraudulento o que infrinja derechos de terceros.</li>
          <li>Utilizar imágenes de alta calidad que representen fielmente el inmueble.</li>
        </ul>
        <p>
          Habitta se reserva el derecho de retirar cualquier anuncio que infrinja estas normas sin previo aviso.
        </p>
      </section>

      <section>
        <h2>6. PLANES DE SUSCRIPCIÓN Y PROMOCIÓN</h2>
        <p>
          Ofrecemos planes de promoción (Basic, Premium y Ultra) para destacar anuncios. Los pagos realizados por estos servicios se procesan de forma segura. Habitta no realiza reembolsos una vez que el servicio de promoción ha sido activado, salvo en casos excepcionales por fallas técnicas imputables al Portal.
        </p>
      </section>

      <section>
        <h2>7. LIMITACIÓN DE RESPONSABILIDAD</h2>
        <p>
          Habitta actúa exclusivamente como un punto de encuentro (Marketplace) entre interesados y oferentes. Por tanto:
        </p>
        <ul>
          <li>No somos responsables por la veracidad de la información suministrada por los Usuarios.</li>
          <li>No participamos en las negociaciones ni en los contratos civiles o comerciales generados entre las partes.</li>
          <li>No garantizamos la idoneidad técnica o legal de los inmuebles anunciados.</li>
          <li>No nos hacemos responsables por daños derivados del uso del portal o interrupciones en el servicio fuera de nuestro control.</li>
        </ul>
      </section>

      <section>
        <h2>8. PROPIEDAD INTELECTUAL</h2>
        <p>
          Todo el contenido del Portal, incluyendo logotipos, diseños, código fuente, bases de datos y textos, es propiedad exclusiva de Habitta o de sus respectivos licenciantes, protegidos por las leyes de propiedad intelectual en Colombia.
        </p>
      </section>

      <section>
        <h2>9. PROTECCIÓN DE DATOS PERSONALES (HABEAS DATA)</h2>
        <p>
          En cumplimiento de la <strong>Ley 1581 de 2012</strong>, Habitta garantiza el derecho de los usuarios a conocer, actualizar y rectificar la información recogida sobre ellos. Al registrarse, el Usuario autoriza el tratamiento de sus datos conforme a nuestra Política de Privacidad.
        </p>
      </section>

      <section>
        <h2>10. JURISDICCIÓN Y LEY APLICABLE</h2>
        <p>
          Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta ante los tribunales competentes de la ciudad de Bogotá, D.C.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
