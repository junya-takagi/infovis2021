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
