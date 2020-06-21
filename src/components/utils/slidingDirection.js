const UP ="up";
const DOWN ="down";
const RIGHT ="right";
const LEFT ="left";
const slidingDirection =(dX,dY)=>{
    //dX is delta left or right dY is delta up or down
    //in slide i chose the bigger delta to decide the type of slide
    const slide = Math.abs(dX) > Math.abs(dY) ? dX:dY;
    if(slide === dX){
        return slide < 0 ?LEFT:RIGHT;
    }
    if(slide === dY){
        return slide < 0 ? UP:DOWN;
    }
}
export {UP,DOWN,RIGHT,LEFT,slidingDirection};