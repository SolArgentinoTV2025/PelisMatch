document.getElementById("buscarBtn").addEventListener("click", async () => {
  const sinopsis = document.getElementById("sinopsisInput").value.trim();
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = ""; // Limpiar resultados previos

  if (!sinopsis) {
    resultadosDiv.innerHTML = "<p>Por favor, escribe una sinopsis.</p>";
    return;
  }

  // Realizar búsqueda en un motor público de la web, como DuckDuckGo, para encontrar páginas relacionadas
  try {
    const query = encodeURIComponent(sinopsis);
    const response = await fetch(`https://api.duckduckgo.com/?q=${query}&format=json`);
    const data = await response.json();

    if (data.RelatedTopics.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron resultados relacionados.</p>";
    } else {
      data.RelatedTopics.forEach(item => {
        if (item.Text) {
          const resultadoHTML = `
            <div class="resultado">
              <a href="${item.FirstURL}" target="_blank">
                <h3>${item.Text}</h3>
                <p>Ver más información</p>
              </a>
            </div>
          `;
          resultadosDiv.innerHTML += resultadoHTML;
        }
      });
    }
  } catch (error) {
    resultadosDiv.innerHTML = "<p>Hubo un error al realizar la búsqueda.</p>";
    console.error(error);
  }
});
