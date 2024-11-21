import { BrowserRouter, Routes, Route, NavLink, Link, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Applications() {
  const [data, setData] = useState({
    db: [
      { id: 1, Nsalle: "Salle 1", postes: [
        { id: 2, mat: "Lenovo", disc: "iCore5", img: "pc1.jpg" },
        { id: 3, mat: "HP", disc: "RAYZON", img: "pc1.jpg" },
        { id: 4, mat: "ACCESS", disc: "AMD", img: "pc1.jpg" }
      ] },
      { id: 2, Nsalle: "Salle 2", postes: [{ id: 5, mat: "Dell", disc: "iCore7", img: "pc1.jpg" }] },
    ],
  });
  // const [msg,setmsg]=({})

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/salles" element={<Salles data={data} setData={setData}  />} />
            <Route path="/salles/postes/:id" element={<Postes data={data} setData={setData} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{border: '1px solid #007bff', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Accueil</NavLink>
        <NavLink className="nav-link" to="/salles">Salles</NavLink>
      </div>
    </nav>
  );
}

function Accueil() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const AjouteClient = (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     alert("Tous les champs doivent être remplis");
  //   } else {
  //     navigate("/salles");
  //   }
  // };

  const Submit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Tous les champs doivent être remplis");
    } else {
      navigate("/salles");
    }
  };


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bienvenue sur la page d'accueil</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-light rounded">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Se connecter</h4>
              <form >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" onClick={(e)=>Submit(e)} className="btn btn-primary btn-lg">Se connecter</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Salles({ data, setData }) {
  const txtid = useRef();
  const txtnom = useRef();
  const btn = useRef();


  const ChargerSalle = (id) => {
    const salle = data.db.find((s) => s.id === id);
    if (salle) {
      txtid.current.value = salle.id;
      txtnom.current.value = salle.Nsalle;
      btn.current.textContent = "Modifier"; 
    }
};

const Ajouter = () => {
    const id = parseInt(txtid.current.value);
    const nom = txtnom.current.value;

    let Objct = {
        id: id,
        Nsalle: nom,
        postes: [],
    };

    if (btn.current.textContent === "Ajouter") {
        setData({
            ...data,
            db: [...data.db, Objct],
            
        });
        


        


        txtid.current.value = "";
        txtnom.current.value = "";
    } else {
        let pos = data.db.findIndex((x) => x.id === id);
        let t = [...data.db];
        t.splice(pos, 1, Objct);

        setData({
            ...data,
            db: t,
        });

        btn.current.textContent= "Ajouter";
        txtid.current.value = "";
        txtnom.current.value = "";
    }
};




  const SupprimeSalle = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette salle ?")) {
      setData({ ...data, db: data.db.filter((salle) => salle.id !== id) });
    }
  };

  const RechercherHandler = (e) => {
    const Nsalle = e.target.value;
    const filtered = data.db.filter(cl => cl.Nsalle.includes(Nsalle));
    console.log(filtered); // Affiche les salles filtrées dans la console pour le test
  };

  return (
    <>
      <h1>Gestion des Salles</h1>
      <label>Rechercher:</label>
      <input type="text" onInput={RechercherHandler} />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom Salle</th>
            <th>Actions</th>
            <th>Postes</th>
          </tr>
        </thead>
        <tbody>
          {data.db.map((salle) => (
            <tr key={salle.id}>
              <td>{salle.id}</td>
              <td>{salle.Nsalle}</td>
              <td>
                <button className="btn btn-primary" onClick={() => ChargerSalle(salle.id)} >Modifier</button>
                <button className="btn btn-danger" onClick={() => SupprimeSalle(salle.id)}>Supprimer</button>
              </td>
              <td>
                <Link to={`/salles/postes/${salle.id}`} className="btn btn-secondary">Voir Postes</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <input type="text" ref={txtid} placeholder="ID Salle" className="form-control mb-2" />
        <input type="text" ref={txtnom} placeholder="Nom Salle" className="form-control mb-2" />
        <button type="button" ref={btn} onClick={Ajouter} className="btn btn-success">Ajouter</button>
      </form>
    </>
  );
}
function Postes({ data, setData }) {
  const txtId = useRef();
  const txtMat = useRef();
  const txtDisc = useRef();
  const txtImg = useRef();
  const btn = useRef(); // Définir la référence du bouton pour le changement de texte
  const { id } = useParams();
  const salle = data.db.find((salle) => salle.id === parseInt(id));

  const SupprimePoste = (posteId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce poste ?")) {
      setData({
        ...data,
        db: data.db.map((salleItem) =>
          salleItem.id === salle.id
            ? { ...salleItem, postes: salleItem.postes.filter((poste) => poste.id !== posteId) }
            : salleItem
        ),
      });
    }
  };

  const ModifierPoste = (posteId) => {
    const Postex = salle.postes.find((poste) => poste.id === posteId); 
    if (Postex) {
      txtId.current.value = Postex.id;
      txtMat.current.value = Postex.mat;
      txtDisc.current.value = Postex.disc;
    
      btn.current.textContent = "Modifier";
    }
  };

  const AjouterPoste = () => {
    let file = txtImg.current.files[0];
    let imageUrl = file ? URL.createObjectURL(file) : "";

    const Ob = {
      id: txtId.current.value,
      mat: txtMat.current.value,
      disc: txtDisc.current.value,
      img: imageUrl,
    };

    setData({...data,db: data.db.map((salleItem) => salleItem.id === parseInt(id) ? { ...salleItem, postes: [...salleItem.postes, Ob] } : salleItem),
    });

    txtId.current.value = "";
    txtMat.current.value = "";
    txtDisc.current.value = "";
    txtImg.current.value = "";
    btn.current.textContent = "Ajouter"; 
  };

  return (
    <>
      <h1>Gestion des Postes</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Matériel</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salle.postes.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.mat}</td>
              <td>{p.disc}</td>
              <td><img src={p.img} alt={p.mat} width="50" /></td>
              <td>
                <button className="btn btn-danger" onClick={() => SupprimePoste(p.id)}>Supprimer</button> | 
                <button className="btn btn-primary" onClick={() => ModifierPoste(p.id)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <input type="text" ref={txtId} placeholder="ID Poste" className="form-control mb-2" />
        <input type="text" ref={txtMat} placeholder="Matériel" className="form-control mb-2" />
        <input type="text" ref={txtDisc} placeholder="Description" className="form-control mb-2" />
        <input type="file" ref={txtImg} className="form-control mb-2" />
        <button type="button" ref={btn} onClick={AjouterPoste} className="btn btn-success">Ajouter</button>
      </form>
    </>
  );
}

export default Applications;
