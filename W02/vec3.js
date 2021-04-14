//constructer
Vec3 = function(x,y,z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.min = function()
{
    var min = this.x;
    if(min>=this.y)
    {   
        min = this.y;
    }
    if(min>=this.z)
    {    
        min = this.z;
    } 
    return min;
}

Vec3.prototype.max = function()
{
    var max = this.x;
    if(max<=this.y)
    {
        max = this.y
    }
    if(max<=this.z)
    {
        max = this.z
    } 
    return max;
}

Vec3.prototype.mid = function()
{
    var mid = this.z
    if(this.x<this.y)
    {
        if(mid<this.x)
        {
            mid = this.x
        }
        else
        {
            if(mid<this.y)
            {
                mid = this.z
            }
            else
            {
                mid = this.y
            }
        }
    }
    else
    {
        if(mid<this.y)
        {
            mid = this.y
        }
        else
        {
            if(mid<this.x)
            {
                mid = this.z
            }
            else
            {
                mid = this.x
            }
        }
    }
    return mid;
}


Vec3.prototype.dot = function(v0,v1,v2)
{
    var x1 = v1.x-v0.x
    var x2 = v2.x-v0.x
    var y1 = v1.y-v0.y
    var y2 = v2.y-v0.y
    var z1 = v1.z-v0.z
    var z2 = v2.z-v0.z
    var dot = x1*y1+x2*y2+z1*z2
    return dot
}

Vec3.prototype.abs1 = function(v0,v1)
{
    var x1 = v1.x-v0.x
    var y1 = v1.y-v0.y
    var z1 = v1.z-v0.z
    var abs1 = Math.sqrt(x1**2+y1**2+z1**2)
    return abs1
}

Vec3.prototype.abs2 = function(v0,v2)
{
    var x2 = v2.x-v0.x
    var y2 = v2.y-v0.y
    var z2 = v2.z-v0.z
    var abs2 = Math.sqrt(x2**2+y2**2+z2**2)
    return abs2
}

Vec3.prototype.AreaOfTriangle = function(v0,v1,v2)
{
    var a = abs1(v0,v1)*abs2(v0,v2)
    var b = dot(v0,v1,v2)
    var S = 0.5*Math.sqrt(a**2-b**2)
    return S
}
