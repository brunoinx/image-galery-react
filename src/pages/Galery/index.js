import { useState } from 'react';

import '../../global.css';
import './styles.css'

import CardImage from '../../components/CardImage';
import logoimg from '../../assets/logo.png';
import api from '../../services/api';

export default function Galery() {
  const [image, setImage] = useState([]);
  const [searchImage, setSearchImage] = useState('');
  const [inactiveImage, setInactiveImage] = useState(true);

  async function handleChageSearch (event) {
    event.preventDefault();

    const response = await api.get(`photos/${searchImage}`);

    setSearchImage('')
    setImage(response.data);
    setInactiveImage(false);
  }

  return (
    <>
      <header>
        <div className="content-header">
          <img src={logoimg} alt="imagem" className="img-logo"/>

          <nav>
            <ul>
              <li><a href="#">Favoritos</a></li>
            </ul>
            
            <div className="search-group">
              <input
                type="number"
                placeholder="Busque pelo ID"
                value={searchImage}
                onChange={({ target }) => setSearchImage(target.value)}
              />
              <button
                type="button"
                onClick={handleChageSearch}
              >
                Buscar
              </button>

            </div>
          </nav>
        </div>
      </header>

      <main>
        <CardImage>
          {image
          ? 
            <>
              <a 
                key={image.id}
                className={inactiveImage ? 'inactive-search-image' : ''}
              >
                <figure>
                  <p className="result">resultado da busca</p>

                  <img src={image.url} alt="imagem"/>
                  <figcaption>
                    <span>Figura {image.id}</span>
                    <p>"{image.title}"</p>
                  </figcaption>
                </figure>
              </a>
            </>
          : "" 
          }
        </CardImage>
      </main>
    </>
  );
}
