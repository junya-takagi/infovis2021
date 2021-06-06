let input_data;
let scatter_plot;
let bar_chart;
let map_data;
let japan_map;
let filter = [];
let prefecture;

function plot(){
    d3.csv("https://junya-takagi.github.io/infovis2021/FinalTask/plot_data.csv")
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
            parent:"#scatter_plot",
            width:800,
            height:600,
            margin:{top:35,right:10,bottom:50,left:70},
            label_space:10,
            title:"都道府県別GDPと高齢者割合の関係",
            xlabel:"GDP at current prices (1 trillion yen)",
            ylabel:"rate of aging (%)",
            cscale:color_scale
        },input_data);
        scatter_plot.update()

    }).catch(error=>{
        console.log(error)
    })
}

function draw(){
    d3.json("https://junya-takagi.github.io/infovis2021/FinalTask/geojapan.geojson")
    .then(data=>{
        map_data = data;
        const color_scale = d3.scaleOrdinal(d3.schemeCategory10)
        const areas = ["東北","関東","中部","近畿","中国","四国","九州"]
        color_scale.domain(areas)
        japan_map = new draw_map({
            parent:"#japan_map",
            width:600,
            height:600,
            margin:{top:150,right:10,bottom:20,left:0},
            scale:1200,
            cscale:color_scale,
            area:areas
        },map_data);
        japan_map.update();
    }).catch(error=>{
        console.log(error)
    })
}

function Filter(id){
    if(filter.length==0){
        scatter_plot.show(id);
        filter.push(id)
    }else{
        scatter_plot.close(filter[0]);
        if(id!==filter[0]){
            filter.pop();
            Filter(id);
        }else{
            filter.pop()
        }
    }
}
plot()
draw()

