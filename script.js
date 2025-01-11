    const API_KEY = "4bc9ca5727df23e276660a9da6a8371c";
    const BASE_URL = "https://api.themoviedb.org/3";

    document.getElementById("buscarBtn").addEventListener("click", async () => {
      const sinopsis = document.getElementById("sinopsisInput").value.trim();
      const resultadosDiv = document.getElementById("resultados");
      resultadosDiv.innerHTML = ""; // Limpiar resultados previos

      if (!sinopsis) {
        resultadosDiv.innerHTML = "<p>Por favor, escribe una sinopsis.</p>";
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(sinopsis)}&language=es`);
        const data = await response.json();

        if (data.results.length === 0) {
          resultadosDiv.innerHTML = "<p>No se encontraron resultados. Intenta con otra sinopsis.</p>";
        } else {
          data.results.forEach(movie => {
            const poster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=Sin+Imagen";
            const resultadoHTML = `
              <div class="resultado">
                <img src="${poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
              </div>
            `;
            resultadosDiv.innerHTML += resultadoHTML;
          });
        }
      } catch (error) {
        resultadosDiv.innerHTML = "<p>Hubo un error al buscar películas. Intenta nuevamente más tarde.</p>";
        console.error(error);
      }
    });
