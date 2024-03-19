import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleCheck,
  faCircle,
  faPenToSquare,
  faTrash,
  faArrowUpAZ,
} from "@fortawesome/free-solid-svg-icons";

function movieList() {
  const [movies, setMovies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedYear, setEditedYear] = useState(0);
  const [editedGenre, setEditedGenre] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("All");

  // console.log("movies", movies);

  const addMovie = (newMovie) => {
    // Mengecek apakah item sudah ada dalam daftar belanjaan sebelumnya
    const isDuplicate = movies.some(
      (
        movie // Membandingkan judul movie dengan judul newMovie (yang mau ditambahkan)
      ) =>
        //trim --> untuk menghapus spasi sebelum dibandingkan
        movie.title.trim().toLowerCase() === newMovie.title.trim().toLowerCase()
    );
    if (isDuplicate) {
      alert("Movie ini sudah ada loh! Yuk masukkan yang lain");
      return;
    }

    if (newMovie.title.trim() === "") {
      alert("Anda belum mengisi judul, isi dulu yuk!");
      return;
    }

    if (newMovie.image && newMovie.title && newMovie.year && newMovie.genre) {
      setMovies([...movies, newMovie]);
      return alert("Berhasil menambahkan movie!");
    }
    alert("Mohon masukkan semua data!");
  };

  const editMovie = (index, updatedMovie) => {
    const updatedMovies = [...movies];
    // const isDuplicate = movies.some(
    //   (movie) =>
    //     movie.title.trim().toLowerCase() ===
    //     updatedMovie.title.trim().toLowerCase()
    // );
    // if (isDuplicate) {
    //   alert("Movie ini sudah ada loh! Yuk masukkan yang lain");
    //   return;
    // } else {
    setMovies(updatedMovies?.map((e) => (e.id === index ? updatedMovie : e)));
    alert("Berhasil mengubah movie!");
    // }
  };

  const editCheck = (index, updatedMovie) => {
    const updatedMovies = [...movies];
    setMovies(updatedMovies?.map((e) => (e.id === index ? updatedMovie : e)));
  };

  const removeMovie = (index) => {
    if (confirm("Apakah Anda ingin menghapusnya?")) {
      setEditIndex(null);
      setMovies(movies.filter((movie, i) => movie.id !== index));
      alert("Berhasil menghapus movie!");
    }
  };

  const removeAllMovie = () => {
    if (movies.length > 0) {
      if (confirm("Apakah Anda ingin menghapus semua movie?")) {
        setMovies([]);
        alert("Berhasil menghapus semua movie!");
      }
    } else {
      alert("Anda belum memasukkan movie apapun.");
    }
  };

  const removeWatchedMovies = () => {
    if (movies.filter((movie) => movie.watchedCheck).length > 0) {
      if (
        confirm("Apakah Anda ingin menghapus semua movie yang sudah ditonton?")
      ) {
        const updatedMovies = movies.filter((movie) => !movie.watchedCheck);
        setMovies(updatedMovies);
        alert("Berhasil menghapus semua movie yang sudah ditonton!");
      }
    } else {
      alert("Anda belum menonton movie apapun.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortMovies = (order) => {
    const sortedMovies = [...movies];
    if (order === "ascending") {
      sortedMovies.sort((a, b) => (a.title < b.title ? -1 : 1));
      // sortedMovies.sort((a, b) => a.title.localeCompare(b.title)); <-- cara lain
    } else if (order === "descending") {
      sortedMovies.sort((a, b) => (a.title > b.title ? -1 : 1));
    }
    setMovies(sortedMovies);
  };

  return (
    <div className="bg-[#000000] p-4 text-center">
      {/* HEADER */}
      <div className="flex flex-row justify-between max-sm:items-center">
        <div className="ml-8">
          <h1 className="text-4xl font-bold mt-2 text-[#db0000] items-end max-sm:text-2xl max-sm:mt-0">
            MOVIE LIST
          </h1>
        </div>
        <div className="flex mt-3 mr-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full mb-4 rounded-md py-2 pl-2 pr-10 max-sm:w-[150px]"
            />
            <div className="absolute top-0 bottom-0 right-0 flex">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-4 my-3" />
            </div>
          </div>
        </div>
      </div>

      {/* ADD MOVIE */}
      <form
        className="flex mt-3 mr-5 justify-center border-b-2 py-4"
        onSubmit={(e) => {
          e.preventDefault(); // Mencegah terjadinya refresh saat "Add Movie" di-klik

          const newMovieImage = e.target.movieImage.value; // Mendapatkan nilai dari input dengan atribut gambar movie
          const newMovieTitle = e.target.movieTitle.value; // Mendapatkan nilai dari input dengan atribut judul movie
          const newMovieYear = e.target.movieYear.value; // Mendapatkan nilai dari input dengan atribut tahun rilis
          const newMovieGenre = e.target.movieGenre.value; // Mendapatkan nilai dari input dengan atribut genre movie

          addMovie({
            id: Date.now(),
            image: newMovieImage,
            title: newMovieTitle,
            year: newMovieYear,
            genre: newMovieGenre,
            watchedCheck: false,
          });
          e.target.reset();
        }}
      >
        <div className="flex flex-row max-sm:flex-col">
          <input
            type="text"
            name="movieImage"
            placeholder="Movie Image"
            className="rounded-md p-2 mr-2 max-lg:w-[150px] max-sm:w-[300px]"
          />
          <input
            type="text"
            name="movieTitle"
            placeholder="Movie title"
            className="rounded-md p-2 mr-2 max-sm:my-2 max-lg:w-[150px] max-sm:w-[300px]"
          />
          <input
            type="number"
            name="movieYear"
            placeholder="Movie Year"
            className="rounded-md p-2 mr-2 max-lg:w-[150px] max-sm:w-[300px]"
          />
          <select name="movieGenre" className="rounded-md p-2 max-sm:my-2">
            <option value="Action">Action</option>
            <option value="Anime">Anime</option>
            <option value="Adventure">Adventure</option>
            <option value="Thriller">Thriller</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Drama">Drama</option>
          </select>
          <button
            type="submit"
            className="bg-[#db0000] text-white ml-2 rounded-md px-3 h-[40px] hover:bg-[#831010] max-sm:ml-0"
          >
            Add New Movie
          </button>
        </div>
      </form>

      {/* FILTERING BUTTON */}
      <div className="mt-7 mb-4 flex justify-evenly py-3">
        <button
          className={`p-2 px-3 rounded-md w-[120px] max-sm:w-[90px] ${
            filteredStatus === "All"
              ? "bg-[#db0000] text-white hover:bg-[#831010]"
              : "bg-[#564d4d] text-white hover:bg-gray-400"
          }`}
          onClick={() => {
            setFilteredStatus("All");
          }}
        >
          All
        </button>
        <button
          className={`p-2 px-3 rounded-md w-[120px] ${
            filteredStatus === "Unwatched"
              ? "bg-[#db0000] text-white hover:bg-[#831010]"
              : "bg-[#564d4d] text-white hover:bg-gray-400"
          }`}
          onClick={() => {
            setFilteredStatus("Unwatched");
          }}
        >
          Unwatched
        </button>
        <button
          className={`p-2 px-3 rounded-md w-[120px] max-sm:w-[100px] ${
            filteredStatus === "Watched"
              ? "bg-[#db0000] text-white hover:bg-[#831010]"
              : "bg-[#564d4d] text-white hover:bg-gray-400"
          }`}
          onClick={() => {
            setFilteredStatus("Watched");
          }}
        >
          Watched
        </button>
      </div>

      {/* REMOVE BUTTON */}
      <div className=" border rounded-md flex justify-evenly py-3 max-sm:flex-col items-center">
        <button
          className="bg-[#db0000] text-white p-2 px-3 rounded-md w-[350px] hover:bg-[#831010] max-sm:w-[300px] max-sm:mb-2"
          onClick={() => removeAllMovie()}
        >
          DELETE ALL MOVIES
        </button>
        <button
          className="bg-[#db0000] text-white p-2 px-3 rounded-md w-[350px] hover:bg-[#831010] max-sm:w-[300px]"
          onClick={() => removeWatchedMovies()}
        >
          DELETE ALL WATCHED MOVIES
        </button>
      </div>

      {/* SORT TITLE */}
      <div className="flex justify-end mr-9 items-center max-sm:mr-1">
        <p className="text-white mt-3 mr-2">
          <FontAwesomeIcon icon={faArrowUpAZ} className="mr-1" />
          Sort :{" "}
        </p>
        <select
          onChange={(e) => sortMovies(e.target.value)}
          className="rounded-md p-1 mt-3"
        >
          <option value="all" selected hidden>
            All
          </option>
          <option value="ascending">A - Z</option>
          <option value="descending">Z - A</option>
        </select>
      </div>

      {/* MOVIE LIST */}
      {movies.length > 0 ? (
        <div>
          <div className="grid grid-cols-4 gap-3 my-6 mx-5 max-sm:grid-cols-1 max-lg:grid-cols-3">
            {movies
              .filter((movie) =>
                movie.title
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              )
              .filter((movie) => {
                if (filteredStatus === "Watched") {
                  return movie?.watchedCheck === true;
                } else if (filteredStatus === "Unwatched") {
                  return movie?.watchedCheck === false;
                }
                return true;
              })
              .map((movie, index) => (
                <div key={movie.id}>
                  <div className="rounded-lg p-3 bg-[#dedede] text-end h-[500px] max-lg:h-[450px]">
                    {/* IMAGE */}
                    <div className="text-start">
                      {editIndex === movie.id ? (
                        <input
                          type="text"
                          placeholder="Movie Image"
                          value={editedImage}
                          onChange={(e) => setEditedImage(e.target.value)}
                          className="rounded-md p-2 w-[300px] max-lg:w-[200px] max-sm:w-[295px]"
                        />
                      ) : (
                        <div className="flex flex-row justify-between">
                          <img
                            src={movie.image}
                            className="w-[200px] flex m-auto max-lg:w-[180px]"
                          />
                          <button
                            onClick={() => {
                              editCheck(movie.id, {
                                ...movie,
                                watchedCheck: !movie?.watchedCheck,
                              });
                            }}
                            className="text-2xl flex "
                          >
                            <FontAwesomeIcon
                              icon={
                                movie.watchedCheck ? faCircleCheck : faCircle
                              }
                              className={`${
                                movie.watchedCheck
                                  ? "text-[#831010]"
                                  : "text-[#564d4d]"
                              } max-lg:ml-1`}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                    {/* TITLE */}
                    <div className="text-start">
                      {editIndex === movie.id ? (
                        <input
                          type="text"
                          placeholder="Movie Title"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="rounded-md p-2 w-[300px] my-2 max-lg:w-[200px] max-sm:w-[295px]"
                        />
                      ) : (
                        <div
                          className={`${
                            movie?.watchedCheck
                              ? "line-through text-red-600"
                              : ""
                          }  text-2xl font-bold mt-2 flex max-lg:text-lg`}
                        >
                          <span>{movie.title}</span>
                        </div>
                      )}
                    </div>
                    {/* YEAR */}
                    <div className="text-start">
                      {editIndex === movie.id ? (
                        <input
                          type="number"
                          placeholder="Movie Year"
                          value={editedYear}
                          onChange={(e) => setEditedYear(e.target.value)}
                          className="rounded-md p-2 w-[300px] mb-2 max-lg:w-[200px] max-sm:w-[295px]"
                        />
                      ) : (
                        <div
                          className={`${
                            movie?.watchedCheck
                              ? "line-through text-red-600"
                              : ""
                          } `}
                        >
                          <span>({movie.year})</span>
                        </div>
                      )}
                    </div>
                    {/* GENRE */}
                    <div className="text-start">
                      {editIndex === movie.id ? (
                        <select
                          value={editedGenre}
                          onChange={(e) => setEditedGenre(e.target.value)}
                          className="rounded-md p-2 w-[300px] max-lg:w-[200px] max-sm:w-[295px]"
                        >
                          <option value="Action">Action</option>
                          <option value="Anime">Anime</option>
                          <option value="Adventure">Adventure</option>
                          <option value="Thriller">Thriller</option>
                          <option value="Crime">Crime</option>
                          <option value="Fantasy">Fantasy</option>
                          <option value="Horror">Horror</option>
                          <option value="Drama">Drama</option>
                        </select>
                      ) : (
                        <div
                          className={`${
                            movie?.watchedCheck
                              ? "line-through text-red-600"
                              : ""
                          } `}
                        >
                          <span>{movie.genre}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      {/* BUTTON SAVE & CANCEL */}
                      {editIndex === movie.id ? (
                        <div className="my-4">
                          <button
                            onClick={() => {
                              editMovie(movie.id, {
                                ...movie,
                                image: editedImage,
                                title: editedTitle,
                                year: editedYear,
                                genre: editedGenre,
                              });
                              setEditIndex(null); // setEditIndex(null) untuk menghentikan mode edit setelah diedit
                              setEditedImage(""); // Mengosongkan setelah diedit
                              setEditedTitle("");
                              setEditedYear(0);
                              setEditedGenre("");
                            }}
                            className="bg-[#db0000] text-white p-2 rounded-md mr-3"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditIndex(null); // untuk menghentikan mode edit
                              setEditedImage("");
                              setEditedTitle("");
                              setEditedYear(0);
                              setEditedGenre("");
                            }}
                            className="bg-[#564d4d] text-white p-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          {/* BUTTON EDIT & REMOVE */}
                          <button
                            onClick={() => {
                              setEditIndex(movie.id);
                              setEditedImage(movie.image);
                              setEditedTitle(movie.title);
                              setEditedYear(movie.year);
                              setEditedGenre(movie.genre);
                            }}
                            className="mr-3 p-2 bg-[#831010] rounded-md text-white"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => removeMovie(movie.id)}
                            className="mr-3 p-2 bg-[#831010] rounded-md text-white"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p className="text-white my-5">No movies yet.</p>
      )}
      {/* MOVIES TOTAL */}
      <div className="mt-3 border-t-2 pt-2 text-white flex justify-evenly">
        <span>Total All Movies : {movies.length}</span>
        <span>
          Total Unwatched Movies :{" "}
          {movies.filter((movie) => !movie.watchedCheck).length}
        </span>
        <span>
          Total Watched Movies :{" "}
          {movies.filter((movie) => movie.watchedCheck).length}
        </span>
      </div>
    </div>
  );
}

export default movieList;
