d3.csv("https://junya-takagi.github.io/infovis2021/report/plot_data.csv")
    .then(data=>{
        data.forEach(d=>{
            console.log(d.gdp)
            d.gdp = Number(d.gdp)
            d.aging_rate = Number(d.aging_rate)
        });
        var config = {
            parent:"#drawing_region",
            width:640,
            height:480,
            margin:{top:60,right:20,bottom:50,left:80},
            label_space:10,
            title:"“s“¹•{Œ§•ÊGDP‚Æ‚—îŽÒlŒûŠ„‡",
            xlabel:"–¼–ÚGDP (1’›‰~)",
            ylabel:"‚—îŽÒ‚ÌŠ„‡ (%)"
        };
        const scatter_plot = new Scatter_plot(config,data)
        scatter_plot.update()
        d3.selectAll("circle")
            .on("mouseover",(e,d)=>{
                d3.select("#tooltip")
                    .style("opacity",1)
                    .html(`<div class="tooltip-label">Position</div>(${d.x},${d.y})`);
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
