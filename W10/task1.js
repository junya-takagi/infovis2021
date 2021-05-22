d3.csv("https://junya-takagi.github.io/infovis2021/W10/data1.csv")
    .then(data=>{
        data.forEach(d=>{
            d.value = Number(d.value);
        });
        var config = {
            parent:"#drawing_region",
            width:512,
            height:256,
            margin:{top:20,right:30,bottom:20,left:40},
            padding:{bottom:20,left:20},
            title:"Bar Chart"
        };
        const bar_chart = new Bar_chart(config,data)
        bar_chart.update()
        
        d3.select("#reverse")
            .on("click",d=>{
            data.reverse()
            bar_chart.reverse(data)
        })

        d3.select("#acending")
            .on("click",d=>{
            bar_chart.sort(ascendingData(data))
        })

        d3.select("#descending")
            .on("click",d=>{
            bar_chart.sort(decendingData(data))
        })
    })
    .catch(error=>{
        console.log(error)
    })

function ascendingData(data){
    var s = data.sort(
        function(a,b){
            return a.value-b.value
        }
    )
    return s
}
function decendingData(data){
    var s = data.sort(
        function(a,b){
            return b.value-a.value
        }
    )
    return s
}
