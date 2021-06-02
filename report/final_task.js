d3.csv("https://junya-takagi.github.io/infovis2021/report/plot_data.csv")
    .then(data=>{
        data.forEach(d=>{
            d.gdp = Number(d.gdp)
            d.aging_rate = Number(d.aging_rate)
            d.region = Number(d.region)
        });
        const color_scale = d3.scaleOrdinal(d3.schemeCategory10)
        color_scale.domain(["東北","関東","中部","近畿","中国","四国","九州"])
        var config = {
            parent:"#drawing_region",
            width:640,
            height:480,
            margin:{top:60,right:20,bottom:50,left:80},
            label_space:10,
            title:"都道府県別GDPと高齢者割合の関係",
            xlabel:"GDP at current prices (1 trillion yen)",
            ylabel:"rate of aging (%)",
            cscale:color_scale
        };
        const scatter_plot = new Scatter_plot(config,data)
        scatter_plot.update()
        d3.selectAll("circle")
            .on("mouseover",(e,d)=>{
                d3.select("#tooltip")
                    .style("opacity",1)
                    .html(`<div class="tooltip-label"></div>(${d.prefecture},${d.gdp},${d.aging_rate})`);
            })
            .on("mousemove",(e)=>{
                const padding=10;
                d3.select("#tooltip")
                    .style("left",(e.pageX+padding)+"px")
                    .style("top",(e.pageY+padding)+"px")
            })
            .on("mouseout",()=>{
                d3.select("#tooltip")
                    .style("opacity",0)
            })
        
    }).catch(error=>{
        console.log(error)
    })
