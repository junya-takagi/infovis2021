let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

function plot(){
    d3.csv("https://junya-takagi.github.io/infovis2021/report/plot_data.csv")
    .then(data=>{
        input_data = data;
        input_data.forEach(d=>{
            d.gdp = Number(d.gdp)
            d.aging_rate = Number(d.aging_rate)
            d.region = Number(d.region)
        });
        const color_scale = d3.scaleOrdinal(d3.schemeCategory10)
        const areas = ["東北","関東","中部","近畿","中国","四国","九州"]
        color_scale.domain(areas)
        
        scatter_plot = new Scatter_plot({
            parent:"#drawing_region1",
            width:560,
            height:400,
            margin:{top:60,right:20,bottom:50,left:80},
            label_space:10,
            title:"都道府県別GDPと高齢者割合の関係",
            xlabel:"GDP at current prices (1 trillion yen)",
            ylabel:"rate of aging (%)",
            cscale:color_scale
        },input_data);
        scatter_plot.update()

        bar_chart = new Bar_chart({
            parent:"#drawing_region2",
            width:400,
            height:400,
            margin:{top:60,right:20,bottom:50,left:80},
            xlabel:"area",
            ylabel:"total gdp",
            cscale:color_scale,
            area:areas
        },input_data);
        bar_chart.update();
        
        d3.select("#clear")
            .on("click",d=>{
                filter = ["空"]
                Filter();
                scatter_plot.update()
            })
    }).catch(error=>{
        console.log(error)
    })
    d3.json("https://junya-takagi.github.io/infovis2021/report/geojapan.geojson")
    .then(data=>{
        map_data = data;
        japan_map = new draw_map({
            parent:"#japan_map",
            width:600,
            height:600,
            margin:{top:10,right:10,bottom:10,left:10},
            scale:1500,
            cscale:color_scale,
            area:areas
        },map_data);
        japan_map.update();
    })
}

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes(d.area) );
    }
    scatter_plot.update();
}

plot()

d3.select("#all")
.on("click",d=>{
    filter = []
    delete scatter_plot;
    delete bar_chart;
    d3.selectAll("g").remove()
    plot()
})

