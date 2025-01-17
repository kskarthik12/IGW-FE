
import React, { useState, useEffect } from 'react';

const ImageGrid = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;


  const totalPages = Math.ceil(images.length / imagesPerPage);
  

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [images]);

  return (
    <div>
      <div className="image-grid">
        {currentImages.map((images, index) => (
          <div key={index} className="image-item">
            <img src={images.imagebuffer ? `data:image/jpg;base64,${images.imagebuffer}`: images.imagePath} alt={images.text} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ImageGrid;