d3.csv("https://junya-takagi.github.io/infovis2021/W06/data.csv")
    .then(data =>{
        ShowScatterPlot(data);
    })
    .catch(error=>{
        console.log(error);
    });