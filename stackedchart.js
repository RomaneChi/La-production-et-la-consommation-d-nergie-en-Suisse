   // Dimensions et marges du graphique
   const margin = { top: 20, right: 80, bottom: 50, left: 80 },
         width = window.innerWidth - margin.left - margin.right,
         height = window.innerHeight - margin.top - margin.bottom -1000;

   // Création du SVG
   const svg = d3.select("#stackedchart").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", `translate(${margin.left},${margin.top})`);



// Couleurs pour les différentes catégories
const customColors = ["#3498DB","#6C8083","#FF5733"];

// Charger les données
d3.csv("data.csv").then(data => {
   // Préparer les données pour le graphique empilé
   const subgroups = ["Production_centrales_hydrauliques", "Production_centrales_nucleaires", "Production_centrale_thermiques_classiques"];
   const groups = data.map(d => d.Date);

   // Empiler les données
   const stackedData = d3.stack()
       .keys(subgroups)
       (data);

   // Échelles
   const x = d3.scaleBand()
       .domain(groups)
       .range([0, width])
       .padding([.2]);

   const y = d3.scaleLinear()
       .domain([0, d3.max(data, d => +d.Production_centrales_hydrauliques + +d.Production_centrales_nucleaires + +d.Production_centrale_thermiques_classiques)])
       .nice()
       .range([height, 0]);
    
    

   // Axes
   svg.append("g")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x).tickSize(0)
           .tickValues(x.domain().filter((d, i) => i % 6 === 0)) // Sélectionne une date sur six // chatgpt
       )
       .selectAll("text")
       .attr("transform", "rotate(-45)")
       .style("text-anchor", "end");

   svg.append("g")
       .call(d3.axisLeft(y));


   // Création des barres
   const bars = svg.append("g")
       .selectAll("g")
       .data(stackedData)
       .enter().append("g")
       //.attr("fill", (d, i) => colors(i))
       .style("fill", (d, i) => customColors[i % customColors.length])
       .selectAll("rect")
       .data(d => d)
       .enter().append("rect")
       .attr("x", d => x(d.data.Date))
       .attr("y", d => y(d[1]))
       .attr("height", d => y(d[0]) - y(d[1]))
       .attr("width", x.bandwidth())

       //    // Événement de survol
       .on("mouseover", function(event, d) {
           var date = d.data.Date;

           var mouseX = event.pageX - 30; // Position horizontale du curseur corrigée pour etre au bon endroit
           var mouseY = event.pageY - 120; // Position verticale du curseur corrigée pour etre au bon endroit

           // Afficher le texte et le positionner sous le curseur
           svg.append("text")
               .attr("id", "tooltip")
               .attr("x", mouseX)
               .attr("y", mouseY) // Position verticale pour la date
               .attr("text-anchor", "middle")
               .attr("font-family", "sans-serif")
               .attr("font-size", "15px")
               .attr("font-weight", "bold")
               .text(date);

       })
       // Ajout de l'événement mouseout pour supprimer le texte
       .on("mouseout", function() {
           d3.select("#tooltip").remove();
       })

       // Ajouter des événements de clic sur les barres
       .on("click", function(event, d) {

           // Ajuster l'opacité des barres
           svg.selectAll("rect")
               .style("opacity", 0.5); // Réduire l'opacité de toutes les barres
           d3.select(this)
               .style("opacity", 1); // Rétablir l'opacité de la barre cliquée
               d3.select("#blabla1").remove();
               d3.select("#blabla2").remove();

               const date = d.data.Date;
               const value = d[1] - d[0]; // Calculer la valeur de la barre

               const xPosition = x(date) + x.bandwidth() / 2;
               const yPosition = y(d[1]);                    
               // Affichage de la date
               svg.append("text")
                   .attr("id", "blabla1")
                   .attr("x", xPosition)
                   .attr("y", yPosition - 20) // Position verticale pour la date
                   .attr("text-anchor", "middle")
                   .attr("font-family", "sans-serif")
                   .attr("font-size", "15px")
                   .attr("font-weight", "bold")
                   .text(`Date: ${date}`);

               // Affichage de la valeur
               svg.append("text")
                   .attr("id", "blabla2")
                   .attr("x", xPosition)
                   .attr("y", yPosition - 5) // Position verticale pour la valeur
                   .attr("text-anchor", "middle")
                   .attr("font-family", "sans-serif")
                   .attr("font-size", "15px")
                   .attr("font-weight", "bold")
                   .text(`Valeur: ${value}`);
               });

   // Légende
   const legendLabels = ["Hydraulique", "Nucléaire", "Thermique"];

   const legend = svg.selectAll(".legend")
       .data(legendLabels)
       .enter().append("g")
       .attr("class", "legend")
       .attr("transform", (d, i) => `translate(0,${i * 20})`);

   legend.append("rect")
       .attr("x", width - 18)
       .attr("width", 18)
       .attr("height", 18)
       //.style("fill", (d, i) => colors(i));
       .style("fill", (d, i) => customColors[i % customColors.length]);

   legend.append("text")
       .attr("x", width - 24)
       .attr("y", 9)
       .attr("dy", ".35em")
       .style("text-anchor", "end")
       .text(d => d);

}).catch(error => {
   console.error('Erreur lors du chargement des données:', error);
});