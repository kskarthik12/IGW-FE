import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import ImageGrid from './ImageGrid';
import Header from './Header';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import LoadingOverlay from 'react-loading-overlay-ts';


function Home() {
  const [images, setImages] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [all, setAll] = useState([]);
  const [date, setDate] = useState(new Date());
  const [noImagesFound, setNoImagesFound] = useState(null);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilterType(value);
    filterImages(value);
  };

  const fetchImages = async (keyword) => {
    setIsLoading(true);
    try {
      let res = await AxiosService.get(ApiRoutes.IMAGE.path, {
        params: { tag: keyword },
        authenticate: ApiRoutes.IMAGE.authenticate
      });
      setNoImagesFound(false);
      setImages(res.data.data);
      setAll(res.data.data);
      setSearchInitiated(true);
      if (res.status === 200) {
        toast.success('Images fetched successfully');
      } else {
        toast.error('Error fetching images');
      }
    } catch (error) {
      toast.error(error.response.data?.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const filterImages = (filterType) => {
    let filteredImages = [...all];
    if (filterType === 'popularity') {
      filteredImages = filteredImages.filter(image => image.popularity > 0);
      filteredImages.sort((a, b) => b.popularity - a.popularity);
      if (filteredImages.length === 0) {
        setNoImagesFound(true);
      } else {
        setImages(filteredImages);
        setNoImagesFound(false);
      }
    } else if (filterType === 'All') {
      setImages(filteredImages);
      setNoImagesFound(false);
    }
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setDate(date);
    const filteredImages = all.filter(image => image.createdAt === formattedDate);
    if (filteredImages.length === 0) {
      setNoImagesFound(true);
    } else {
      setImages(filteredImages);
      setNoImagesFound(false);
    }
  };

  return (
    <>
     <LoadingOverlay active={isLoading} spinner text='Loading your content...'>
      <Header />
     
      {!searchInitiated && ( // Render before search initiated
        <div className="home-container">
          <div className="centered-content">
            <h1>Image Search App</h1>
          </div>
          <SearchBar onSearch={fetchImages} />
        </div>

      )}
  
      
      {searchInitiated && ( // Render after search initiated
        <>
          {noImagesFound ? (
            <div className='home'>
              <SearchBar onSearch={fetchImages} />
              <div className="filter-container">
                <div className="filter-select">
                  <label htmlFor="filterType">Filter By:</label>
                  <select id="filterType" value={filterType} onChange={handleFilterChange}>
                    <option value="date">Date</option>
                    <option value="popularity">Popularity</option>
                    <option value="All">All</option>
                  </select>
                </div>
                {filterType === 'date' && (
                  <div className="date-picker">
                    <label htmlFor="dateRange">Select Date:</label>
                    <DatePicker
                      selected={date}
                      onChange={handleDateChange}
                    />
                  </div>
                )}
              </div>
              <p className="no-images-message">No images found for the selected criteria.</p>
            </div>
          ) : (
            <div className='home'>
              <SearchBar onSearch={fetchImages} />
              <div className="filter-container">
                <div className="filter-select">
                  <label htmlFor="filterType">Filter By:</label>
                  <select id="filterType" value={filterType} onChange={handleFilterChange}>
                    <option value="date">Date</option>
                    <option value="popularity">Popularity</option>
                    <option value="All">All</option>
                  </select>
                </div>
                {filterType === 'date' && (
                  <div className="date-picker">
                    <label htmlFor="dateRange">Select Date:</label>
                    <DatePicker
                      selected={date}
                      onChange={handleDateChange}
                    />
                  </div>
                )}
              </div>
              {images.length > 0 && <ImageGrid images={images} />}
            </div>
          )}
        </>
      )}
      </LoadingOverlay>
    </>
  );
}

export default Home;
