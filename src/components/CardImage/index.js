import { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

export default function CardImage ({ children }) {
  const [images, setImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(15);
  const [inicialItem, setInicialItem] = useState(0);

  useEffect(() => {
    async function loadNextPages() {
      const { data } =  await api.get('photos');

      const totalItems= [];
      
      const totalPages = Math.ceil(data.length / limit);
      let count = (currentPage * limit) - limit;
      const delimiter = count + limit;
      
      if (currentPage <= totalPages) {
        for (let i = count; i < delimiter; i++) {
          totalItems.push(data[i])
          count++
        }        
      }
    
      setInicialItem(inicialItem + limit);
      setImages(totalItems);
      setTotal(data.length);
    }
    loadNextPages();

  },[currentPage])

  return (
    <>
      <section>
        <img src={images[activeImageIndex].url} alt={images.title} className="image-active"/>
        
        <div id="content-card">
            {children}

            {images.map((image, index) => (
            <a 
              key={image.id}
              className={activeImageIndex === index ? 'active' : ''}
              onClick={() => setActiveImageIndex(index)}
            >
              <figure>
                <img src={image.url} alt="imagem"/>
                <figcaption>
                  <span>Figura {image.id}</span>
                  <p>"{image.title}"</p>
                </figcaption>
              </figure>
            </a>
          ))}
        </div>

        <div className="content-pagination">
          <span>Qtd: {total} fotos</span>

          <div className="pagination-item">
            <a onClick={() => setCurrentPage(currentPage - 1)}>Anterior</a>
           
            <a onClick={() => setCurrentPage(currentPage + 1)}>Próximo</a>
          </div>
        </div>
      </section>
    </>
  )
}