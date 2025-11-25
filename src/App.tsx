import "./App.css";

function App() {
  return (
    <>
      <header>
        <div className="logo-container">
          <a href="">
            <img className="logo" src="/src/assets/logoSF.png" alt="no image" />
          </a>
        </div>
        <nav>
          <a href="" className="navLinks">
            Inicio
          </a>
          <a href="" className="navLinks">
            Propiedades
          </a>
          <a href="" className="navLinks">
            Herramientas
          </a>
          <a href="" className="navLinks">
            Favoritos
          </a>
          <a href="" className="navLinks">
            Mi panel
          </a>
          <a href="" className="navLinks">
            +Publicar
          </a>
        </nav>
        <a href="">
          <img src="/src/icons/avatar.png" alt="" />
        </a>
      </header>
    </>
  );
}

export default App;
