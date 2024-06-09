// script.js
d3.csv("production.csv").then(data => {
    // Convertissez les valeurs en nombres
    data.forEach(d => {
        d.Production_centrales_hydrauliques = +d.Production_centrales_hydrauliques;
        d.Production_centrales_nucleaires = +d.Production_centrales_nucleaires;
        d.Production_centrale_thermiques_classiques = +d.Production_centrale_thermiques_classiques;
    });

    // Obtenez toutes les dates disponibles
    const dates = data.map(d => d.Date);

    // Ajoutez les options au menu déroulant
    const dropdown = d3.select("#dateDropdown");
    dropdown.selectAll("option")
        .data(dates)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);

    // Définissez les dimensions et le rayon du diagramme
    const width = 700, height = 500, radius = Math.min(width, height) / 2;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("transform", `translate(${(width -200) / 2}, ${height / 2})`);

    // Définissez une échelle de couleurs
    const customColors = ["#3498DB","#6C8083","#FF5733"];

    // Créez une fonction pour dessiner le diagramme
    const pie = d3.pie()
        .value(d => d.value);
    
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    function updateChart(selectedDate) {
        // Filtrez les données pour la date sélectionnée
        const filteredData = data.filter(d => d.Date === selectedDate)[0];
        const pieData = [
            { name: "Hydraulique", value: filteredData.Production_centrales_hydrauliques },
            { name: "Nucléaire", value: filteredData.Production_centrales_nucleaires },
            { name: "Thermique", value: filteredData.Production_centrale_thermiques_classiques }
        ];

        // Liez les données au diagramme
        const arcs = g.selectAll(".arc")
            .data(pie(pieData));

        // Générez les nouveaux arcs
        arcs.enter()
            .append("path")
            .attr("class", "arc")
            .attr("d", arc)
            //.attr("fill", d => color(d.data.name))
            .attr("fill", (d, i) => customColors[i % customColors.length])
            .each(function(d) { this._current = d; });

        // Mettez à jour les arcs existants
        arcs.attr("d", arc)
            .attr("fill", (d, i) => customColors[i % customColors.length]);

        // Supprimez les arcs qui ne sont plus nécessaires
        arcs.exit().remove();

        // Mettez à jour la légende
        updateLegend(pieData);


        // Ajoutez un écouteur d'événement "mouseover" à chaque segment du diagramme à secteurs
        g.selectAll(".arc").on("mousemove", function(event, d) {
            const percentage = (d.data.value / d3.sum(pieData, d => d.value) * 100).toFixed(2); // Calcul du pourcentage
            const name = d.data.name; // Nom de la source d'énergie
            const mouseX = event.pageX - 30; // Position horizontale du curseur corrigée pour être au bon endroit
            const mouseY = event.pageY - 120; // Position verticale du curseur corrigée pour être au bon endroit
            d3.select("#tooltip").remove();
        // Sélectionnez l'élément texte existant ou créez-en un nouveau s'il n'existe pas encore
        let tooltip = d3.select("#tooltip");
        if (tooltip.empty()) {
            tooltip = svg.append("text")
                .attr("id", "tooltip")
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("font-weight", "bold");
        }
        // Mettez à jour la position du texte
        tooltip.attr("x", mouseX)
            .attr("y", mouseY)
            .text(`${name} : ${percentage}%`);
          });
        // Ajoutez un événement "mouseout" pour supprimer le texte
        svg.on("mouseout", function() {
            d3.select("#tooltip").remove();
        });
    }

    // Créez un conteneur pour la légende
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 120}, 20)`); // Ajustez la position ici

    function updateLegend(data) {
        // Sélectionnez les entrées de la légende et liez les données
        const legendItems = legend.selectAll(".legendItem")
            .data(data);

        // Créez des groupes pour chaque entrée de la légende
        const legendEnter = legendItems.enter()
            .append("g")
            .attr("class", "legendItem")
            .attr("transform", (d, i) => `translate(0, ${i * 20})`);

        // Ajoutez des rectangles de couleur
        legendEnter.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", (d, i) => customColors[i % customColors.length]);

        // Ajoutez des textes
        legendEnter.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", "0.35em")
            .text(d => d.name)
            .style("font-family","Arial");

        // Mettez à jour les rectangles existants
        legendItems.select("rect")
            .attr("fill", (d, i) => customColors[i % customColors.length]);

        // Mettez à jour les textes existants
        legendItems.select("text")
            .text(d => d.name);

        // Supprimez les éléments de légende qui ne sont plus nécessaires
        legendItems.exit().remove();
    }

    // Ajoutez un écouteur d'événement pour le menu déroulant
    dropdown.on("change", function(event) {
        const selectedDate = event.target.value;
        updateChart(selectedDate);
    });

    // Initialisez le diagramme avec la première date
    updateChart(dates[0]);
});
